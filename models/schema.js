const mongoose = require('mongoose')
// const z = require('zod')

const backupDataSchema = new mongoose.Schema({

    placeId: {
        type: String,
        required: false,
        unique: false
    },
    timestamp: {
        type: String,
        required: false,
        unique: false
    },
    placenameEN: {
        type: String,
        required: false,
        unique: false
    },
    
    placenameAR: {
        type: String,
        required: false,
        unique: false
    },
    
    placenameES: {
        type: String,
        required: false,
        unique: false
    },
    
    lat: {
        type: Number,
        required: false,
        unique: false
    },
          
    lng: {
        type: Number,
        required: false,
        unique: false
    },
    
    type: {
        type: String,
        required: false,
        unique: false
    },
    
    iata: {
        type: String,
        required: false,
        unique: false
    },
    
    postcode: {
        type: String,
        required: false,
        unique: false
    },
    
    address: {
        type: String,
        required: false,
        unique: false
    },
    
    source: {
        type: String,
        required: false,
        unique: false
    }
    
   
})

const clickResultSchema = new mongoose.Schema({
    
    searchQuery: {
        type: String,
        required: false,
        unique: false
    },
    
    timestamp: {
        type: String,
        required: false,
        unique: false
    },
    placeId : {
        type: String,
        required: false,
        unique: false
    }

    }
    
)

const countSchema = new mongoose.Schema({
    
    placeId : {
        type: String,
        required: false,
        unique: false
    },

    count : {
        type: Number,
        required: false,
        unique: false
    },

    timestamp: {
        type: String,
        required: false,
        unique: false
    }
    

    }
    
)

const orsDataSchema = new mongoose.Schema({

    sourceLat: {
        type: Number,
        required: false,
        unique: false
    },
    sourceLng: {
        type: Number,
        required: false,
        unique: false
    },
    destinationLat: {
        type: Number,
        required: false,
        unique: false
    },
          
    destinationLng: {
        type: Number,
        required: false,
        unique: false
    },
    
    distance: {
        type: Number,
        required: false,
        unique: false
    },
    
    duration: {
        type: Number,
        required: false,
        unique: false
    }
    
     
})

const backupData = mongoose.model("backup_data", backupDataSchema)
const clickValue = mongoose.model("click_result", clickResultSchema)
const countValue = mongoose.model("count_value", countSchema)
const orsData = mongoose.model("ors_response", orsDataSchema)

module.exports = {backupData, clickValue, countValue, orsData}











 // searchQuery: {
    //     type: String,
    //     required: false,
    //     unique: false
    // },
    
    // timestamp: {
    //     type: String,
    //     required: false,
    //     unique: false
    // },
    // place : {
    //     type: Map,
    //     of: mongoose.Schema.Types.Mixed,
    //     required: false,
    //     unique: false
    // },
    // source : {
    //     type: String,
    //     required: false,
    //     unique:false

    // }