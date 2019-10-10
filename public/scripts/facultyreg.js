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

$("#ufi").on('click',(e)=>{
    e.preventDefault();
    var data = {
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        mob:document.getElementById("mob").value,
        dept:document.getElementById("dept").value,
        courses:courses,
        password:document.getElementById("password").value,
        rid:document.getElementById("rid").value
    };
    $.post("/facregister",{data:JSON.stringify(data)},(data,stat)=>{
        if(stat == "success")
        {
            if(data.trim() != "wrong rid" && data.trim() != "error")
            {
                document.getElementById("ufitext").innerHTML = data;
                $("#ufi").remove();
            }
            else
            {
                document.getElementById("ufitext").innerHTML = "Error occured 1)Check your FRP 2)Or your mail is already registered";
            }
        }
    });
});
