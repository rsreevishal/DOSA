var courses = [];
$("#add").on('click',(e)=>{
    e.preventDefault();
    var container = $("#course");
    var cid = document.getElementById("cid").value;
    container.append(`<button onclick='remove("${cid}")' id="${cid}" class="form-control">${cid}</button>`);
    courses.push(cid);
});

function remove(ptr)
{
    var i = courses.indexOf(ptr);
    courses.splice(i,1);
    $("#"+ptr).remove();
}

$("#register").on('click',(e)=>{
    e.preventDefault();
    var data = {
        regno:document.getElementById("regno").value,
        name:document.getElementById("name").value,
        password:document.getElementById("password").value,
        mob:document.getElementById("mob").value,
        dept:document.getElementById("dept").value,
        courses:courses,
        facid:document.getElementById("facid").value
    };
    $.post("/register",{data:JSON.stringify(data)},(data,stat)=>{
        if(stat == "success")
            console.log(data);
    });
});

