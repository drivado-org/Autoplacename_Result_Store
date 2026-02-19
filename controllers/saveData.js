const { backupData, clickValue, countValue } = require("../models/schema");
const {z}= require("zod")
const { TOPICS } = require("../kafka/topics");

const backupDataValid = z.object({
      searchQuery: z.string(),
      timestamp: z.string(),
      place: z.object(),
      source: z.string()
})

const clickResultValid = z.object({
      searchQuery: z.string(),
      timestamp: z.string(),
      placeId: z.string()
})

async function saveData(topic, messages) {
  if (topic == TOPICS.CLICKED_VALUE) {
    const result = clickResultValid.safeParse(messages)
    if(!result.success){
      console.log(result.error)
    } else {
      await clickValue.create({
        searchQuery: messages.searchQuery,  
        placeId: messages.placeId,  
        timestamp: messages.timestamp
     });
    
     const valueExists =  countValue.findOne({placeId: messages.placeId})
     const record = await valueExists.exec()
     console.log(record)
     if(record == null){
      await countValue.create({
        placeId: messages.placeId,
        count: 1
       })
     } else {
      await countValue.updateOne({placeId: messages.placeId},{$inc: {count: 1}})
     }
     console.log("Saved click data to MongoDB", messages);
    }
  } else if (topic == TOPICS.BACKUP_DATA) {
    const result = backupDataValid.safeParse(messages)
    if(!result.success){
      console.log(result.error)
    } else {
      await backupData.create({
      searchQuery: messages.searchQuery,    
      timestamp: messages.timestamp,
      place: messages.place,
      source: messages.source,
     });

     console.log("Saved backup data to MongoDB");
    }
  }
}

module.exports = { saveData };

