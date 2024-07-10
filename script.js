document.addEventListener('DOMContentLoaded', () => {
    const productosGrid = document.getElementById('productos-grid');
    const nuevoProductoForm = document.getElementById('nuevoProductoForm');
    const borrarCamposBtn = document.getElementById('borrarCampos');
   
    window.eliminarProducto = (index) => {
        let productosList = JSON.parse(localStorage.getItem('productos')) || [];
        productosList.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productosList));
        renderProductos();
        toggle(productosList);
    };

        const renderProductos = () => {
        productosGrid.innerHTML = '';

        let productosList = JSON.parse(localStorage.getItem('productos')) || [];

        productosList.forEach((producto, index) => {
            const precio = parseFloat(producto.precio);

            const productoCard = document.createElement('div');
            productoCard.classList.add('card');
            productoCard.innerHTML = `
                <img src="${producto.imagenUrl}" alt="${producto.nombre}">
                <div class="card-container--info">
                    <p>${producto.nombre}</p>
                    <div class="card-container--value">
                        <p>$${precio.toFixed(2)}</p>
                        <img src="./imagenes/trashIcon.svg" alt="Eliminar" onclick="eliminarProducto(${index})">
                    </div>
                </div>
            `;
            productosGrid.appendChild(productoCard);
        });
        toggle(productosList);
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
        toggle(productosList);

        nuevoProductoForm.reset();
    });

    borrarCamposBtn.addEventListener('click', () => {
        nuevoProductoForm.reset();
    });

    renderProductos();
    toggle(JSON.parse(localStorage.getItem('productos')) || []);
});
