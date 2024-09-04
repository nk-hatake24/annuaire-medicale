const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://nkMichel:Viande2@cluster0.2h7ebpu.mongodb.net"; // Remplace par ton URI MongoDB
const client = new MongoClient(uri);

 async function main() {
  try {
    // Connexion au client MongoDB
    await client.connect();
    console.log("Connecté à MongoDB!");

    const database = client.db('medical-scrapper'); // Remplace par le nom de ta base de données
    const collection = database.collection('doctors'); // Remplace par le nom de ta collection

    // Récupérer des données
    const documents = await collection.find({}).toArray();
    return documents
  } catch (err) {
    console.error("Erreur de connexion à MongoDB", err);
  } finally {
    await client.close();
  }
}

module.exports ={main}