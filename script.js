document.addEventListener('DOMContentLoaded', () => {
    const productosGrid = document.getElementById('productos-grid');
    const nuevoProductoForm = document.getElementById('nuevoProductoForm');
    const borrarCamposBtn = document.getElementById('borrarCampos');

    fetch('database/db.json')
  .then(response => response.json()) 
  .then(data => {
    localStorage.setItem('productos', JSON.stringify(data));
  })
  .catch(error => console.error('Error al obtener el archivo JSON:', error));

   
    window.eliminarProducto = (index) => {
        console.log(index);
        let productosList = JSON.parse(localStorage.getItem('productos')) || [];
        productosList.productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productosList));
        renderProductos();
    };

        const renderProductos = () => {
        productosGrid.innerHTML = '';

        let productosList = JSON.parse(localStorage.getItem('productos')) || [];
            console.log(productosList);

            productosList.productos.forEach((producto, index) => {
            const precio = parseFloat(producto.price);

            const productoCard = document.createElement('div');
            productoCard.classList.add('card');
            productoCard.innerHTML = `
                <img src="${producto.image}" alt="${producto.name}">
                <div class="card-container--info">
                    <p>${producto.name}</p>
                    <div class="card-container--value">
                        <p>$${precio.toFixed(2)}</p>
                        <img src="./imagenes/trashIcon.svg" alt="Eliminar" onclick="eliminarProducto(${index})">
                    </div>
                </div>
            `;
            productosGrid.appendChild(productoCard);
        });
    };

    nuevoProductoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const imagenUrl = document.getElementById('imagenUrl').value;

                if (isNaN(precio) || precio <= 0) {
            alert('Ingrese el costo correcto.');
            return;
        }

        const nuevoProducto = { nombre, precio, imagenUrl };

        let productosList = JSON.parse(localStorage.getItem('productos')) || [];
        productosList.push(nuevoProducto);
        localStorage.setItem('productos', JSON.stringify(productosList));

        renderProductos();
        nuevoProductoForm.reset();
    });

    borrarCamposBtn.addEventListener('click', () => {
        nuevoProductoForm.reset();
    });

    renderProductos();
});
