document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("box-form");
  
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
  
        const username = document.getElementById("txt-user").value;
        const password = document.getElementById("txt-password").value;
  
        if (username && password) {
            const authToken = "some_random_token"; 
            
            localStorage.setItem("authToken", authToken);
            window.location.href = "index.html";
        } else {
            alert("Por favor, ingrese un nombre de usuario y contraseña");
        }
    });
  });
  