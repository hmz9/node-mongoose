const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const dbUrl = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(dbUrl);

connect.then((db) => {

    console.log('Connected correctly to the Database');

    var dishObj = new Dishes({
        name: "Alu ki bhujiya",
        description: "A famous Indian Dish"
    });

    dishObj.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.deleteMany({}).exec();
        })
        .then(() => {
            console.log('Dishes removed');
            mongoose.connection.close();
        })
        .then(() => {
            console.log('Connection Closed');
        })
        .catch((error) => {
            console.log(error);
        });

});