const $ = require('jquery');

$("#login").on('click',(e)=>{
    e.preventDefault();
    var data = {
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    }
    $.post('http://localhost:9000/flogin',{data:data},(res,stat)=>{
        if(res.trim() == "error")
            alert("Wrong email or password");
        else
        {
            window.localStorage.setItem("user_details",res);
            window.location.href = "../pages/index.html";
        }
    });
});