
// Datos JSON de productos de iluminación
const productos = [
  {
    id: 1,
    nombre: 'Araña A-1',
    tipo:'arana',
    precio: 144000,
    imagen: 'araña.1.jpg'
  },
  {
    id: 2,
    nombre: 'Araña A-2',
    tipo:'arana',
    precio: 91400,
    imagen: 'araña.2.jpg'
  },
  {
    id: 3,
    nombre: 'Araña A-3',
    tipo:'arana',
    precio: 76100,
    imagen: 'araña.3.jpg'
  },
  {
    id: 4,
    nombre: 'Araña A-4',
    tipo:'arana',
    precio: 135000,
    imagen: 'araña.4.jpg'
  },
  {
    id: 5,
    nombre: 'Araña A-5',
    tipo:'arana',
    precio: 86300,
    imagen: 'araña.5.jpg'
  },
  {
    id: 6,
    nombre: 'Araña A-6',
    tipo:'arana',
    precio: 66100,
    imagen: 'araña.6.jpg'
  },
  {
    id: 7,
    nombre: 'Aplique AP-1',
    tipo:'aplique',
    precio: 17500,
    imagen: 'aplique.1.jpg'
  },
  {
    id: 8,
    nombre: 'Aplique AP-2',
    tipo:'aplique',
    precio: 21100,
    imagen: 'aplique.2.jpg'
  },
  {
    id: 9,
    nombre: 'Aplique AP-3',
    tipo:'aplique',
    precio: 21300,
    imagen: 'aplique.3.jpg'
  },
  {
    id: 10,
    nombre: 'Aplique AP-4',
    tipo:'aplique',
    precio: 19800,
    imagen: 'aplique.4.jpg'
  },
  {
    id: 11,
    nombre: 'Aplique AP-5',
    tipo:'aplique',
    precio: 24000,
    imagen: 'aplique.5.jpg'
  },
  {
    id: 12,
    nombre: 'Aplique AP-6',
    tipo:'aplique',
    precio: 21700,
    imagen: 'aplique.6.jpg'
  },
  {
    id: 13,
    nombre: 'Lampara LM-1',
    tipo:'lampara',
    precio: 25600,
    imagen: 'LM.1.jpg'
  },
  {
    id: 14,
    nombre: 'Lampara LM-2',
    tipo:'lampara',
    precio: 25600,
    imagen: 'LM.2.jpg'
  },
  {
    id: 15,
    nombre: 'Lampara LM-3',
    tipo:'lampara',
    precio: 24700,
    imagen: 'LM.3.jpg'
  },
  {
    id: 16,
    nombre: 'Lampara LM-4',
    tipo:'lampara',
    precio: 25200,
    imagen: 'LM.4.jpg'
  },
  {
    id: 17,
    nombre: 'Lampara LM-5',
    tipo:'lampara',
    precio: 27400,
    imagen: 'LM.5.jpg'
  },
  {
    id: 18,
    nombre: 'Lampara LM-6',
    tipo:'lampara',
    precio: 24000,
    imagen: 'LM6.jpg'
  },

];

//Mostrar los productos en la página
function mostrarProductos() {
  const productosDiv = document.getElementById('productos');
  productosDiv.innerHTML = '';

  productos.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');
    productoDiv.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="./imagenes/productos/${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button class="button" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
    `;
    productosDiv.appendChild(productoDiv);
  });
}


// Filtrar productos por tipo
function filtrarPorTipo() {
  const tipoSelect = document.getElementById('tipo');
  const tipoSeleccionado = tipoSelect.value;

  const productosFiltrados = tipoSeleccionado === 'todos' ? productos : productos.filter(producto => producto.tipo === tipoSeleccionado);

  const productosDiv = document.getElementById('productos');
  productosDiv.innerHTML = '';

  productosFiltrados.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');
    productoDiv.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button class="button" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
    `;
    productosDiv.appendChild(productoDiv);
  });
}

// Agregar un producto al carrito
function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const producto = productos.find(item => item.id === id);
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

// Vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem('carrito');
  actualizarCarrito();
}

// Mostrar el carrito en la página
function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoItems = document.getElementById('carrito-items');
  const carritoTotal = document.getElementById('carrito-total');
  carritoItems.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="../imagenes/productos/${producto.imagen}" alt="${producto.nombre}">
      ${producto.nombre} - $${producto.precio}
    `;
    const eliminarBtn = document.createElement('button');
    eliminarBtn.innerHTML = 'Eliminar';
    eliminarBtn.addEventListener('click', () => eliminarDelCarrito(index));
    li.appendChild(eliminarBtn);
    carritoItems.appendChild(li);
    total += producto.precio;
  });

  carritoTotal.innerHTML = `Total: $${total}`;
}

// Actualizar el carrito y los productos
function actualizarCarrito() {
  mostrarProductos();
  mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarCarrito();
  const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
});
