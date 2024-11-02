const { MongoClient } = require('mongodb');

// Chaîne de connexion MongoDB (remplace par l'URL correcte)
const uri = 'mongodb+srv://nkMichel:Viande2@cluster0.2h7ebpu.mongodb.net';
const client = new MongoClient(uri);

module.exports = async function replaceAccentInDatabase() {
    try {
        await client.connect();
        const database = client.db('annuaire-medicale'); // Remplace par le nom de ta base 
        const collection = database.collection('doctors'); // Remplace par le nom de ta collection

        // Parcours des documents
        const cursor = collection.find({});
        while (await cursor.hasNext()) {
            console.log('...')
            const doc = await cursor.next();
            
            // Créer une copie de `doc` sans l'attribut `_id`
            const { _id, ...docWithoutId } = doc;
            const updatedDoc = JSON.parse(JSON.stringify(docWithoutId).replace(/é/g, 'e'));

            // Mise à jour du document sans inclure `_id`
            await collection.updateOne(
                { _id },
                { $set: updatedDoc }
            );
        }
        console.log("Remplacem ent des accents 'é' terminé.");
    } finally {
        await client.close();
    }
};
