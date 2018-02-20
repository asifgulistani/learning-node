var mongoose = require('mongoose');

// person model schema

var personSchema = mongoose.Schema({
    balance: {type:String},
    age: {type:Number},
    name: {type:String},
    gender: {type:String},
    company: {type:String},
    email: {type:String},
    phone: {type:String},
    address: {type:String},
    registered: {type:Date},
    tags: [String]
});

var Person = module.exports = mongoose.model('persons',personSchema);

//Get Person
module.exports.getPersons = function(callback, limit){
    Person.find(callback).limit(limit); 
}

//Get person byId
module.exports.getPersonById = function(id,callback){
    console.log('Id id id:' + id);
    Person.findById(id, callback); 
}
