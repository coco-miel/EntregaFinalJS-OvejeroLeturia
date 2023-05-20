let productos = [];
fetch("./js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    cargarProductos(productos);
  });

const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".boton-agregar");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";
  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "mb-5");
    div.innerHTML = `
        <div class="card h-100">
            <img class="card-img-top" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-body p-4">
                <div class="text-center">
                    <h3>${producto.nombre}</h3>
                    $${producto.precio}
                    <div class="text-center">
                        <button type="button" id="${producto.id}" class="btn btn-primary boton-agregar m-2 ">
                        Añadir al carrito
                        </button>
                    </div >
                </div>
            </div>
        </div>
        `;
    contenedorProductos.append(div);
  });
  actualizarBotonesAgregar();
}

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".boton-agregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
const carritoNumero = document.querySelector("#carrito-numero");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumeroCarrito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#0b41a1",
      borderRadius: "1rem",
    },
    offset: {
      y: "3rem",
    },
    onClick: function () {},
  }).showToast();
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );
  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  actualizarNumeroCarrito();
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumeroCarrito() {
  let nuevoNumero = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  carritoNumero.innerText = nuevoNumero;
}

const botonesCategorias = document.querySelectorAll(".botones-categorias");

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    if (e.currentTarget.id != "Todos") {
      const productosBoton = productos.filter(
        (producto) => producto.categoria === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      cargarProductos(productos);
    }
  });
});
