const { backupData, clickValue, countValue, orsData } = require("../models/schema");
const {z}= require("zod")
const { TOPICS } = require("../kafka/topics");

const backupDataValid = z.object({
      placeId: z.string(),
      timestamp: z.string(),
      lat: z.float32(),
      lng: z.float32(),
      
      postcode: z.string(),
      address: z.string(),
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
      console.log("Saved click data to MongoDB", messages);
      await clickValue.create({
        searchQuery: messages.searchQuery,  
        placeId: messages.placeId,  
        timestamp: messages.timestamp
     });
    //  console.log("Saved click data to MongoDB", messages);
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
    //  console.log("Saved click data to MongoDB", messages);
    }
  } else if (topic == TOPICS.BACKUP_DATA) {
    const result = backupDataValid.safeParse(messages)
    if(!result.success){
      console.log(result.error)
    } else {
      // console.log("Backup Data Received")
      await backupData.create({
      placeId: messages.placeId,
      timestamp: messages.timestamp,
      lat: messages.lat,
      lng: messages.lng,
      placenameEN: messages.placenameEN,
      placenameAR: messages.placenameAR,
      placenameES: messages.placenameES,
      type:messages.type,
      iata:messages.iata,
      postcode: messages.postcode,
      address: messages.address,
      source: messages.source
     });


     console.log("Saved backup data to MongoDB");
    }
  } else if (topic == TOPICS.ORS_RESPONSE){
      await orsData.create({
        sourceLat: messages.sourceLat,
        sourceLng: messages.sourceLng,
        destinationLat: messages.destinationLat,
        destinationLng: messages.destinationLng,
        distance:messages.destination,
        duration:messages.duration,
     });

     console.log("Saved ors response to MongoDB")

  }
}

module.exports = { saveData };






    //  await clickValue.create({
    //     searchQuery: messages.searchQuery,  
    //     placeId: messages.placeId,  
    //     timestamp: messages.timestamp
    //  })
     
    //  const valueExists =  countValue.findOne({placeId: messages.placeId})
    //  const record = await valueExists.exec()
    //  console.log(record)
    //  if(record == null){
    //   await countValue.create({
    //     placeId: messages.placeId,
    //     count: 1
    //    })
    //  } else {
    //   await countValue.updateOne({placeId: messages.placeId},{$inc: {count: 1}})
    //  }