const mongoose = require('mongoose')

const url = process.env.URL_DB_CONNECTION;

async function dbConnection(){
    try{
        await mongoose.connect(url)
        console.log('running on mongodb sucessfully')
    }catch(err){
        console.log(err)
    }
}

module.exports = {dbConnection}