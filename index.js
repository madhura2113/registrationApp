var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var con = require('./public/db/db.js');
var bodyParser = require('body-parser')

app.use(bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json()); 

app.use(express.urlencoded());

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL Database!");
   });

   app.get('/', function(req, res){
    res.sendfile('index.html', {'root': __dirname+'/'})
})

app.use(express.static('public'));

// Get existing users from database
var sql = 'select user_name, DATE_FORMAT(date, "%d %M %Y") as date, in_time, out_time,reason from registration.registered_users';
app.get('/getUsers', function(req, res) {
  con.query(sql, function(err,result){
    if (err) throw err;
    console.log("selectResult: ");
    for(var i=0;i<result.length;i++){
      console.log(result[i]);
    }
    res.json(result);
  });

});

// Save new users to database
var SaveSql = "INSERT IGNORE INTO registration.registered_users (user_name, in_time, out_time, reason) VALUES ?";
app.post('/saveUsers', function(req, res) {
  var values = [
    [req.body.name, req.body.inTime, req.body.outTime, req.body.reason]
  ];
  console.log("Values : ", values);
  con.query(SaveSql, [values], function(err,result){
    if (err) throw err;
    for(var i=0;i<result.length;i++){
      // console.log(result[i]);
    }
    res.json(result);
  });

});

// Binding express app to port 3000
app.listen(3000,function(){
    console.log('Node server running @ http://localhost:3000')
});

 module.exports = app;