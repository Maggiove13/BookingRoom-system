// --------------------------------------- LOGIN FRONT ----------------------------------------------------------------------
const messageError = document.getElementsByClassName("error")[0]; 

const loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = e.target.children.user.value;
    const password = e.target.children.password.value;
    const res = await fetch("http://localhost:4000/api/login",
    {
        method: "POST",
        // Los headers son objetos
        headers:
        {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({user, password})
    });
    
    //Ahora verificamos si la respuesta no esta ok
    if (!res.ok) {
        return messageError.classList.toggle("hidden", false);
    }
    const resJson = await res.json();

    console.log("Respuesta del servidor:", resJson); // Agrega esto para ver lo que devuelve el servidor

    if (resJson.redirect){
        window.location.href= resJson.redirect;
    }
})