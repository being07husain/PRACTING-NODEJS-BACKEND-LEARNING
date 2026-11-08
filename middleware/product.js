const { getDB } = require('../utils/database');
const { ObjectId } = require('mongodb');
module.exports = class Product {
    constructor(name, category, price, quantity, description) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
    save() {
        const db = getDB();

        return db.collection('products').insertOne(this)
            .then(() => {
                console.log("Product saved");
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
    static fetchAll() {
        const db = getDB();
        return db.collection('products').find().toArray().then((products) => {
            console.log(products);
            return products;
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    }
   static findById(id) {
    const db = getDB();

    return db.collection('products').findOne({
        _id: new ObjectId(id)
    });
}
    static deleteById(id) {
        const db = getDB();

        return db.collection('products').deleteOne({
            _id: new ObjectId(id)
        });
    }
   static updateById(id, updatedData) {
    const db = getDB();

    return db.collection('products').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
    );
}
}