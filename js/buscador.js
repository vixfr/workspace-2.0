
document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector('.dropdownn');
    const searchInput = dropdown.querySelector('.search-input');
    const dropdownMenu = dropdown.querySelector('.dropdownn-menu');
    const datosProductos = "https://japceibal.github.io/emercado-api/cats_products/101.json";

    searchInput.addEventListener('input', function () {
        dropdownMenu.classList.add('show');
        if (searchInput.value === "") {
            dropdownMenu.classList.remove('show');
        }
        for (i = 1; i < 10; i++){
            
        }

    });
})