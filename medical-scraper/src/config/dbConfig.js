const mongoose = require('mongoose')

const url = "mongodb+srv://nkMichel:Viande2@cluster0.2h7ebpu.mongodb.net/medical-scrapper";

async function dbConnection(){
    try{
        await mongoose.connect(url)
        console.log('running on mongodb sucessfully')
    }catch(err){
        console.log(err)
    }
}

module.exports = {dbConnection}