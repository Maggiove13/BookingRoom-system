// --------------------------------------- REGISTER FRONT ----------------------------------------------------------------------

const messageError = document.getElementsByClassName("error")[0];

const registerForm = document.getElementById("register-form"); 

registerForm.addEventListener("submit", async (e) =>{ 
    e.preventDefault();
    console.log(e.target.children.user.value); 


    const resp = await fetch("http://localhost:4000/api/register", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },


        body: JSON.stringify({
            user: e.target.children.user.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value
        }),
    }); 

    
    if (!resp.ok) return messageError.classList.toggle("hidden", false);
    const resJson = await resp.json();
    if (resJson.redirect){
        window.location.href = resJson.redirect;
    }
    console.log(resJson); 
});