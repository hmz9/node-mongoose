const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const dbUrl = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(dbUrl);

connect.then((db) => {

    console.log('Connected correctly to the Database');

    var dishObj = new Dishes({
        name: "Dam Alu",
        description: "A famous Indian Dish"
    });

    dishObj.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.findByIdAndUpdate(dish._id, {
                $set: {
                    description: "Now a famous Pakistani dish as well"
                }
            }).exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push(
                {
                    rating: 4,
                    comment: 'I love Alu ki bhujiya',
                    author: 'Nadeem Naniwala'
                }
            )

            return dish.save();
        })
        .then((dish) => {

            console.log(dish);

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