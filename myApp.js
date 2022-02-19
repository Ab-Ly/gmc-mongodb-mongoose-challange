require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var personSchema = new Schema({
  name: { type: String, required: true, default: "John Woo" },
  age: { type: Number, required: true, default: 20 },
  favoriteFoods: [{ type: String, required: true, default: "chips" }],
});

let Person = mongoose.model("Person", personSchema);

// const createAndSavePerson = (done) => {
//   done(null /*, data*/);
// };
var createAndSavePerson = function (done) {
  let person = new Person({
    name: "Andrew",
    age: 23,
    favoriteFoods: ["beans", "meat"],
  });

  person.save((err, data) => {
    if (err) throw err;
    console.log(data);
    done(null, data);
  });
};

// const createManyPeople = (arrayOfPeople, done) => {
//   done(null /*, data*/);
// };
var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

// const findPeopleByName = (personName, done) => {
//   done(null /*, data*/);
// };

var findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// const findOneByFood = (food, done) => {
//   done(null /*, data*/);
// };
var findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: [food] }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// const findPersonById = (personId, done) => {
//   done(null /*, data*/);
// };

const findPersonById = function (personId, done) {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// const findEditThenSave = (personId, done) => {
//   const foodToAdd = "hamburger";

//   done(null /*, data*/);
// };
var findEditThenSave = function (personId, done) {
  var foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, person) => {
      if (err) return done(err);
      done(null, person);
    });
  });
};

// const findAndUpdate = (personName, done) => {
//   const ageToSet = 20;

//   done(null /*, data*/);
// };
var findAndUpdate = function (personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, person) => {
      if (err) return done(err);
      done(null, person);
    }
  );
};

// const removeById = (personId, done) => {
//   done(null /*, data*/);
// };

var removeById = function (personId, done) {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// const removeManyPeople = (done) => {
//   const nameToRemove = "Mary";

//   done(null /*, data*/);
// };

var removeManyPeople = function (done) {
  var nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    done(null, data);
  });
};

// const queryChain = (done) => {
//   const foodToSearch = "burrito";

//   done(null /*, data*/);
// };

var queryChain = function (done) {
  var foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) throw err;
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
