//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please check your data entry. No name specified!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
    // name: 'Apple',
    rating: 10,
    review: 'Pretty solid as a fruit.'
});

// fruit.save();


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
})

const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
    name: 'Pineapple',
    score: 9,
    review: 'Great pineapple'
});

// pineapple.save();

const person = new Person({
    name: 'John',
    age: 37,
    favouriteFruit: pineapple
});


// person.save();


const cherry = new Fruit({
    name: 'Cherry',
    score: 7,
    review: 'Good cherry'
});

cherry.save();

Person.updateOne({
    _id: '5e9f003feef53d1440d59034'
}, {
    favouriteFruit: cherry
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Success');
    }
});


// Fruit.find((err, fruits) => {
//     if (err) {
//         console.log(err);
//     } else {
//         mongoose.connection.close();

//         fruits.forEach(item => {
//             console.log(item.name);
//         });
//     }
// });

// Fruit.updateOne({
//     _id: '5e9ef9804e32df2ee87caf30'
// }, {
//     name: 'Peach'
// }, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Successfully updated the document.');
//     }
// })

// Person.deleteOne({
//     // name: "Peach"
//     _id: '5e9f00a61499b5250c4d6c79'
// }, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Successfully deleted.');
//     }
// });

// Person.deleteMany({
//     name: /Jonnel/
// }, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Delete many');
//     }
// });


const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits)
        callback(fruits);
    });
}



// const kiwi = new Fruit({
//     name: "Kiwi",
//     score: 10,
//     review: "The best fruit!"
// });

// const orange = new Fruit({
//     name: "Orange",
//     score: 4,
//     review: "Too sour for me"
// });

// const banana = new Fruit({
//     name: "Banana",
//     score: 3,
//     review: "Weird texture"
// });

// Fruit.insertMany([kiwi, orange, banana], (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Successfully saved all fruits to fruitsDB');
//     }
// });