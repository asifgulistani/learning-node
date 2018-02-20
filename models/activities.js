var mongoose = require('mongoose');

// person model schema

var activitiesSchema = mongoose.Schema({
    _id: false,
    title: String,
    description: String,
    start_date: Date,
    end_date: Date,
    completed: Boolean
},{
    versionKey: false // You should be aware of the outcome after set to false
});

var Activity = module.exports = mongoose.model('activities',activitiesSchema);

//Get Person
//module.exports.getActivities = function(callback, limit){
//    Activity.find(callback).limit(limit); 
//}

//Get person byId
//module.exports.getPersonById = function(id,callback){
//    console.log('Id id id:' + id);
//    Person.findById(id, callback); 
//}

//module.exports.getActivityById = function(id, callback){
//    Activity.findById(id);
//}