const $ = require('jquery');

var curClass = JSON.parse(window.localStorage.getItem("curClass"));
var curStudents = curClass.students;
var dic = {};
var studentPane = $("#studentListPane");
curStudents.forEach((student) => {
    studentPane.append(`<button id="${student}" onclick="toggleClass('${student}')" class="btn btn-danger">${student}</button>`);
    dic[`${student}`] = 0;
});

var count = 0;
document.getElementById("rollno").innerHTML = curStudents[count];

document.getElementById("heading").innerHTML = `${curClass.name}-${curClass.cid}-${curClass.bno}`;

$("body").on('keydown', (e) => {
    if (count < curStudents.length) {
        if (e.keyCode == 13) {
            $("#" + curStudents[count]).removeClass('btn-danger');
            $("#" + curStudents[count]).addClass('btn-success');
            dic[`${curStudents[count]}`] = 1;
            count += 1;
            if(count< curStudents.length)
                document.getElementById("rollno").innerHTML = curStudents[count];
        }
        else if(e.keyCode == 8)
        {
            count += 1;
            if(count< curStudents.length)
                document.getElementById("rollno").innerHTML = curStudents[count];
        }
    }
});

function toggleClass(id)
{
    var student = $("#"+id);
    if(student.hasClass("btn-success"))
    {
        student.removeClass('btn-success');
        student.addClass('btn-danger');
        dic[`${id}`] = 0;
    }
    else if(student.hasClass("btn-danger"))
    {
        student.removeClass('btn-danger');
        student.addClass('btn-success');
        dic[`${id}`] = 1;
    }
}

$("#submit").on('click',(e)=>{
    var data = {
        user: JSON.parse(window.localStorage.getItem("user_details")),
        attendance:dic,
        time:[new Date().getHours(),new Date().getMinutes()]
    }
    setTimeout(()=>{
        $.post('http://localhost:9000/submitAtt',{data:data},(res,stat)=>{
            console.log(res);
        });
    },1000*60*5);
});



$("#back").on('click',(e)=>{
    window.location.href = "../pages/index.html";
});