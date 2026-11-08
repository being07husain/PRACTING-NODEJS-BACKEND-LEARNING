const mongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://shubbuhusain2007_db_user:rBA4JDdeWisWoadu@being07husain.qn7fjaq.mongodb.net/?appName=being07husain";;

let db;

const mongoConnect = (callback) => {

    mongoClient.connect(url)
        .then(client => {

            console.log("Connected to MongoDB");

            db = client.db("minimart");

            callback(client);

        })
        .catch(err => {

            console.log(err);

        });

};

const getDB = () => {

    if (!db) {
        throw new Error("Not connected to database");
    }

    return db;

};

module.exports = {
    mongoConnect,
    getDB
};