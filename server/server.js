const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');


var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'DOSA'
});

con.connect((err)=>{
    if(err)throw err;
    console.log("mysql connected");
});

const app = express();
app.use('/static',express.static(path.join(__dirname,"..","public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.end("Main Page");
});


app.get('/registerPage',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","pages","register.html"));
});

app.get('/fregisterPage',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","public","pages","facultyreg.html"));
});


app.post('/register',(req,res)=>{
    var data = JSON.parse(req.body.data);
    var courses = data.courses;
    var q = `insert into user_details values("${data.regno}","${data.name}","${data.password}","${data.mob}","${data.dept}","${data.facid}")`;
    var q2 = "insert into user_course_details values";
    var q3 = `create table user_${data.regno}(day date primary key,p1 int,p2 int,p3 int,p4 int,p5 int,p6 int,p7 int)`;
    courses.forEach((e)=>{
        q2 += `("${data.regno}","${e}"),`;
    });
    q2 = q2.substr(0,q2.length-1);
    con.query(q,(err,res1)=>{
        if(err)
            res.send("error");
        else
        {
            con.query(q2,(err2,res2)=>{
                if(err2)
                    res.send("error");
                else{
                   con.query(q3,(err3,res3)=>{
                       if(err3)
                            console.log(err3);
                        else
                        {
                            console.log("created successfully");
                            res.send("success");
                        }
                   });
                }
            });
        }
    });
});

var rid = ["dosa@fac007","dosa@fac111","dosa@fac001"];
var irid = 0;
app.post('/facregister',(req,res)=>{
    var data = JSON.parse(req.body.data);
    var courses = data.courses;
    if(data.rid == rid[irid])
    {
        var timestamp = new Date().valueOf();
        q = `insert into faculty_details values("${data.name}","${data.email}","${data.mob}","${data.dept}","${data.password}","${timestamp}")`;
        var q2 = "insert into faculty_course_details values";
        courses.forEach((e)=>{
            q2 += `("${timestamp}","${e}"),`;
        });
        q2 = q2.substr(0,q2.length - 1);
        con.query(q,(err1,res1)=>{
            if(err1)
                res.send("error");
            else
            {
                con.query(q2,(err2,res2)=>{
                    if(err2)
                        res.send("error");
                    else
                        res.send(timestamp+"");
                });
            }
        });
    }
    else
        res.send("wrong rid");    
});

app.post('/flogin',(req,response)=>{
    var email = req.body.data.email;
    var password = req.body.data.password;
    var q = `select * from faculty_details where email = "${email}"`;
    con.query(q,(err,res)=>{
        if(err)throw err;
        else
        {
            if(res[0].password.trim() == password.trim())
                response.send(JSON.stringify(res[0]));
            else
                response.send("error");
        }
    });
});

app.post('/submitAtt',(req,res)=>{
    console.log(req.body.data);
    res.send("received");
});

app.listen(9000,()=>{
    console.log('listening');
});