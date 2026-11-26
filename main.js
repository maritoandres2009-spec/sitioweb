
let carrito = [];

// Elementos del DOM
const botonesAgregar = document.querySelectorAll('.add-to-cart');
const iconoCarrito = document.getElementById('cart-icon');
const panelCarrito = document.getElementById('carrito');
const botonCerrarCarrito = document.getElementById('cerrar-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const contadorCarrito = document.getElementById('cart-count');
const precioTotal = document.getElementById('total-precio');
const botonCheckout = document.getElementById('checkout');

// Listeners
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const nombre = e.target.getAttribute('data-name');
        const precio = parseFloat(e.target.getAttribute('data-price'));
        
        agregarAlCarrito(id, nombre, precio);
    });
});

iconoCarrito.addEventListener('click', () => {
    panelCarrito.classList.add('abierto');
});

botonCerrarCarrito.addEventListener('click', () => {
    panelCarrito.classList.remove('abierto');
});

botonCheckout.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos de Motos antes de comprar.");
    } else {
        alert("¡Gracias por tu compra! Brum, brum.");
        carrito = [];
        actualizarUI();
        panelCarrito.classList.remove('abierto');
    }
});

// Lógica del Carrito
function agregarAlCarrito(id, nombre, precio) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    actualizarUI();
    panelCarrito.classList.add('abierto'); // Despliega el carrito al agregar
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarUI();
}

function actualizarUI() {
    listaCarrito.innerHTML = '';
    let total = 0;
    let cantidadProductos = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        cantidadProductos += item.cantidad;

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-info">
                <span class="item-nombre">${item.nombre} (x${item.cantidad})</span>
                <span class="item-precio">$${subtotal.toFixed(2)}</span>
            </div>
            <button class="btn-eliminar" data-id="${item.id}" title="Eliminar">✕</button>
        `;
        listaCarrito.appendChild(li);
    });

    // Agregar eventos a los nuevos botones de eliminar
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            eliminarDelCarrito(id);
        });
    });

    precioTotal.textContent = total.toFixed(2);
    contadorCarrito.textContent = cantidadProductos;
}