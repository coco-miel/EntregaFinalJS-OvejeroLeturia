let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector(
  "#contenedor-carrito"
);
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

function cargarProductosCarrito() {
  if (productosEnCarrito && productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("producto-carrito");
      div.innerHTML = `
              <div class="card-body p-3 my-3 grey-bg">
                  <div class="row d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                          <img src="${
                            producto.imagen
                          }" class="img-fluid rounded-3" alt="${
        producto.nombre
      }" />
                      </div>
                      <div class="col">
                          <p class="small">Producto</p>
                          <p><span>${producto.nombre}</span></p>
                      </div>
                      <div class="col">
                          <p class="small">Cantidad</p>
                          <p><span>${producto.cantidad} </span></p>
                      </div>
                      <div class="col">
                          <p class="small">Precio</p>
                          <p><span>$${producto.precio} </span></p>
                      </div>
                      <div class="col">
                          <p class="small">Subtotal</p>
                          <p><span>$${
                            producto.precio * producto.cantidad
                          } </span></p>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                          <button class="carrito-producto-eliminar     btn-trash" id="${
                            producto.id
                          }"><i class="bi bi-trash3"></i></button>
                      </div>
                  </div>
              </div>`;
      contenedorCarritoProductos.append(div);
    });
  } else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
  }
  actualizarBotonesEliminar();
  actualizarTotal();
}

let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;
  const index = productosEnCarrito.findIndex(
    (producto) => producto.id === idBoton
  );
  productosEnCarrito.splice(index, 1);
  cargarProductosCarrito();
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

const botonVaciar = document.querySelector("#carrito-vaciar");
cargarProductosCarrito();

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
  cargarProductosCarrito();
}

const contenedorTotal = document.querySelector("#total");

function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `$${totalCalculado}`;
}

const botonComprar = document.querySelector("#carrito-pagar");

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");
}