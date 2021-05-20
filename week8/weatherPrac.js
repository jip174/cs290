var express= require('express');
var app = express();
var handlebars = require ('express-handlebars').create({defaultLayout:'main'});
var request = require('request');
var bodyParser= require('body-parser');
var session= require('express-session');

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:'SuperSecretPassWord'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',2020);
app.use(express.static('public'));

app.get('/', function(req, res, next){
    var context ={};
   
    if(!req.session.name){
        res.render('newSess', context);
        console.log(req.session.city);
        console.log(req.session.name);
        return;
    }
    context.city = req.session.name.city || "reno";
    console.log(context.city);
    context.name = req.session.name;
    context.toDoCount = req.session.toDo.length || 0;
    context.toDo = req.session.toDo || [];
    console.log(context.toDo);
   // console.log(context.city);
    //var url = 'http://api.openweathermap.org/data/2.5/weather?q=' +context.city+ '&APPID=553f955f4bd2528d289367661f1a6c7d';
   // res.render('toDo', context);
    request('http://api.openweathermap.org/data/2.5/weather?q='+context.city+'&APPID=553f955f4bd2528d289367661f1a6c7d', function(err, response, body){
       request(url, function(err,response, body){
        if(!err && response.statusCode < 400){
            context.owm = body;
            request({
                "url": "http://httpbin.org/post",
                "method": "POST",
                "headers":{"Content-Type":"application/json"},
                "body":'{"foo":"bar","number":1}'},
                function(err,response,body){
                    if(!err && response.statusCode < 400){
                        context.httpbin = body;
                        res.render('toDo',context);
                    }else{
                        console.log(err);
                        if(response){
                            console.log(response.statusCode);
                        }
                        next(err);
                    }
                });
        }else{
            console.log(err);
            if(response){
                console.log(response.statusCode);
            }
            next(err);
        }
    });
    });
});
app.post('/', function(req,res){
    var context= {};

    if(req.body['New List']){
        req.session.name = req.body.name;
        req.session.toDo = [];
        req.session.curId = 0;
    }

    if(!req.session.name){
        res.render('newSess', context);
        return;
    }

    if(req.body['Add Item']){
        req.session.toDo.push({"name": req.body.name, "id": req.session.curId});
        req.session.curId++;
    }

    if(req.body['Done']){
        req.session.toDo = req.session.toDo.filter(function(e){
            return e.id != req.body.id;
        })
    }
    context.name= req.session.name;
    context.toDoCount= req.session.toDo.length;
    context.toDo = req.session.toDo;
    console.log(context.toDo);
    res.render('toDo', context);
});

/*app.get('/', function(req,res,next){
    var context = {};
    var api = "553f955f4bd2528d289367661f1a6c7d";
    request('http://api.openweathermap.org/data/2.5/weather?q=corvallis&APPID=553f955f4bd2528d289367661f1a6c7d', function(err, response, body){
        if(!err && response.statusCode < 400){
            context.owm = body;
            request({
                "url": "http://httpbin.org/post",
                "method": "POST",
                "headers":{"Content-Type":"application/json"},
                "body":'{"foo":"bar","number":1}'},
                function(err,response,body){
                    if(!err && response.statusCode < 400){
                        context.httpbin = body;
                        res.render('home',context);
                    }else{
                        console.log(err);
                        if(response){
                            console.log(response.statusCode);
                        }
                        next(err);
                    }
                });
        }else{
            console.log(err);
            if(response){
                console.log(response.statusCode);
            }
            next(err);
        }
    });
});*/

app.get('/get-ex', function(req, res,next){
    var context = {};
    var api = "553f955f4bd2528d289367661f1a6c7d";
    request('http://api.openweathermap.org/data/2.5/weather?q=corvallis&APPID=553f955f4bd2528d289367661f1a6c7d', function(err, response, body){
       if(!err && response.statusCode < 400){
           context.owm = body;
           res.render('home', context);
       }else {
           console.log(err)
           if(response){
               console.log(response.statusCode);
           }
           next(err);
        }
       });
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req,res,next){
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://' + app.get('port') + '; press ctrl-c to exit');
});