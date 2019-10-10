const fs = require('fs');
const path = require('path');
const $ = require('jquery');

var students = []
var classes = null;
readClasses();
$("#addStudent").on('click', (e) => {
    e.preventDefault();
    var rollno = document.getElementById("rollno").value;
    if (students.indexOf(rollno) < 0) {
        students.push(rollno);
        updateStudentList();
    }
});


function updateStudentList() {
    var studentList = $("#studentList");
    studentList.empty();
    students.forEach((e) => {
        studentList.append(`<button id="${e}" onclick='removeStudent(this)'class="btn btn-default">${e}</button>`);
    });
}

function removeStudent(ptr) {
    var ind = students.indexOf(ptr.id);
    students.splice(ind, 1);
    updateStudentList();
}

$("#createNewClass").on('click', (e) => {
    e.preventDefault();
    var classData = {
        name: document.getElementById("name").value,
        cid: document.getElementById("cid").value,
        bno: document.getElementById("bno").value,
        students: students
    }
    classes.push(classData);
    fs.writeFile(path.join(__dirname,".." ,"data", "class.json"), JSON.stringify(classes), (err) => {
        if (err) throw err;
        else
            window.location.href = "./index.html";
    });
});

$("#createClass").on('click', (e) => {
    e.preventDefault();
    window.location.href = "./createClass.html";
});

function readClasses() {
    fs.readFile(path.join(__dirname,".." ,"data", "class.json"), (err, data) => {
        if (err) throw err;
        else {
            classes = JSON.parse(data.toString());
            classes.forEach((Class,index)=>{
                var li = $(`<button onclick="openClass(${index})" class="btn btn-default">${Class.name}-${Class.cid}-${Class.bno}</button>`);
                $("#class-list").prepend(li);
            });
        }
    });
}

function openClass(index)
{
    var curClass = classes[index];
    window.localStorage.setItem("curClass",JSON.stringify(curClass));
    window.location.href = "./markingPage.html";
}