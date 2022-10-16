const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login");

const URL = "http://localhost:4500/";

loginBtn.addEventListener("click",()=>{

    const data = {
        email: emailInput.value,
        password: passwordInput.value
    };

    fetch(`${URL}users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(resp => resp.json() ) 
    .then(data =>{
        console.log(data);
    })
    .catch((err)=>{
        console.log("error", err);
    });
})