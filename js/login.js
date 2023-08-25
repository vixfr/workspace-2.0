document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("box-form");
    
    
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("txt-user").value;
        const password = document.getElementById("txt-password").value;
        
        localStorage.setItem('usuario', username);
  
        if (username && password) {
            const user = username;
            
            localStorage.setItem("user", user);
            window.location.href = "index.html";
            
        } else {
            alert("Por favor, ingrese un nombre de usuario y contraseña");
        }
    });
  });
  