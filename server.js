var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

// connet to mongodb
mongoose.connect('mongodb://localhost/learn-mongo');
var db = mongoose.connection;

//var Person = require('./models/person.js');
var Activity = require('./models/activities.js');

var PORT = process.env.PORT || 3000;

var middlewares = {
    logger: function(req, res, next){
        fs.appendFile('logs.txt', new Date().toString() +' | '+ req.method + ' | ' + req.connection.remoteAddress + ' | ' + req.originalUrl + '\n', (err) => {  
            // throws an error, you could also catch it here
            if (err) throw err;
        });
        next();
    }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies

//app.use(express.static(__dirname + '/public'));

// root level route
app.get('/', function(req, res){
    res.send('welcome to my api');
});

// get all the activities
app.get('/api/activity', function(req, res){
     Activity.find({},function(err, activities){
        if(err){
            throw err;
        } 
        res.json(activities);
    }).limit(200); 
    
});

// get the single activity
app.get('/api/activity/:id', function(req, res){
    Activity.findById(new mongoose.Types.ObjectId(req.params.id),function(err, activity){
        if(err){
            throw err;
        } 
        res.json(activity);
    }); 
});

// create activity
app.post('/api/activity', (req, res)=>{
    req.body._id = mongoose.Types.ObjectId;
    Activity.create(req.body,function(err, newActivity){
        if(err){
            throw err;
        }    
        res.json(newActivity);
    });
})

// update activity
app.put('/api/activity/:id', function(req, res){
    Activity.findOneAndUpdate(new mongoose.Types.ObjectId(req.params.id), req.body,function(err, activity){
        if(err){
            throw err;
        } 
        res.json(activity);
    }); 
});

// delete item
app.delete('/api/activity/:id', function(req, res){
    Activity.remove({_id : new mongoose.Types.ObjectId(req.params.id)},function(err, activity){
        if(err){
            throw err;
        } 
        res.json('The item was deleted!');
    }); 
});

app.listen(PORT, function(){
    console.log('Node is running on port ' + PORT);
});