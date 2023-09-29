document.addEventListener("DOMContentLoaded", () => {
    //obtenemos el body y la opción de cambiar tema en el dropdown del nav
    const opcionTema = document.getElementById("opcionTema");
    const body = document.body;

    //Cuando hacemos click en la opción..
    opcionTema.addEventListener("click", () => {
        // Obtenemos el valor actual de "tema" desde localStorage
        const temaActual = localStorage.getItem("tema");

    //En este condicional nos fijamos el tema almacenado en el localstorage, en función de eso, asignamos o removemos la clase "temaOscuro", que funciona como un interruptor, cuando está presente en el body, se activan los selectores en css, por eso, todos la mayoría de los selectores empiezan con la clase "fondoOscuro".
        if (temaActual === "oscuro") {
            localStorage.setItem("tema", "dia");
            body.classList.remove("temaOscuro")
            //modificamos el contenido de la opción para que muestre "modo noche" si está en modo día.
            opcionTema.innerHTML = `Modo noche <i class="fa-regular fa-moon"></i>`
        } else {
            localStorage.setItem("tema", "oscuro");
            body.classList.add("temaOscuro");
            //modificamos el contenido de la opción para que muestre "modo día" si está en modo noche.
            opcionTema.innerHTML = `Modo día <i class="fa-regular fa-sun"></i>`

        }
    });

    // Configura el tema inicial si no está definido en localStorage
    if (!localStorage.getItem("tema")) {
        localStorage.setItem("tema", "dia");
    }

    // Aplica los estilos iniciales basados en el tema actual
    const temaActual = localStorage.getItem("tema");
    if (temaActual === "oscuro") {
        body.classList.add("temaOscuro");
        opcionTema.innerHTML = `Modo día <i class="fa-regular fa-sun"></i>`
    }
});