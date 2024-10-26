const adminForm = document.getElementsByTagName("button")[0];

adminForm.addEventListener("click", () => {
    document.cookie = 'jwt=; Path=/; Expires= Thu, 01 Jan 1970 00:00:01 GMT;'; // Para borrar cookie
    document.location.href= "/";
})