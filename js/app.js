// Cargar los productos desde el archivo JSON externo
async function cargarProductos() {
  try {
    const response = await fetch('../datosjson/productos.json');
    if (!response.ok) {
      throw new Error('Error al cargar los productos.');
    }
    const data = await response.json();
    productos = data.productos;
    return productos;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//Mostrar los productos en la página
async function mostrarProductos() {
  const productos = await cargarProductos();
  const productosDiv = document.getElementById('productos');
  productosDiv.innerHTML = '';

  productos.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');
    productoDiv.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="../imagenes/productos/${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button class="button" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
    `;
    productosDiv.appendChild(productoDiv);
  });
}

// Filtrar productos por tipo
function filtrarPorTipo(productos) {
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
      <img src="../imagenes/productos/${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button class="button" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
    `;
    productosDiv.appendChild(productoDiv);
  });
}

// Agregar un producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(item => item.id === id);
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();

  // Mostrar el modal de SweetAlert
  Swal.fire({
    icon: 'success',
    title: '¡Producto agregado al carrito!',
    text: `${producto.nombre} ha sido agregado al carrito.`,
    showConfirmButton: false,
    timer: 1000
  });
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

// Finalizar la compra
function comprar() {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Carrito Vacío',
      text: 'No puedes finalizar la compra porque el carrito está vacío.',
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: '¡Compra Exitosa!',
      text: '¡Gracias por tu compra! Tu pedido ha sido procesado.',
    }).then(() => {
      vaciarCarrito();
    });
  }
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
  const comprarBtn = document.getElementById('comprar-btn');
  comprarBtn.addEventListener('click', comprar);
});