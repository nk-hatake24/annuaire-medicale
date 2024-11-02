const mongoose = require('mongoose')
// const replaceAccentInDatabase =  require('./removeSpecialCharacters')
// const {copyAllDoctors} = require('./copy')

const url = process.env.URL_DB_CONNECTION;

async function dbConnection(){
    try{
        await mongoose.connect(url)
        // await replaceAccentInDatabase().catch(console.error)
    
        // await copyAllDoctors()
        console.log('running on mongodb sucessfully')
    }catch(err){
        console.log(err)
    }
}

module.exports = {dbConnection}