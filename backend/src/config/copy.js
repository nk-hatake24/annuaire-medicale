const {main} = require('./scrapped')
const Doctor = require('../models/userCollection/doctorModel');


const copyAllDoctors = async()=>{
    try{
        users= main()
        await Doctor.insertMany(users)
        console.log('Documents insérés avec succès:', docs);

    }
    catch{(err) => {
    console.error('Erreur lors de l\'insertion des documents:', err);
  }};

}
module.exports = {copyAllDoctors}