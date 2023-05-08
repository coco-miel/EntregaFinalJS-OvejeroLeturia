class Producto {
  constructor(id, nombre, imagen, precio, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.precio = precio;
    this.categoria = categoria;
  }
}

const remera1 = new Producto(
  "remera-01",
  "REMERA 1",
  "./img/productos/remera-1.jpg",
  1500,
  "Remeras"
);
const remera2 = new Producto(
  "remera-02",
  "REMERA 2",
  "./img/productos/remera-2.jpg",
  1500,
  "Remeras"
);
const remera3 = new Producto(
  "remera-03",
  "REMERA 3",
  "./img/productos/remera-3.jpg",
  1500,
  "Remeras"
);
const remera4 = new Producto(
  "remera-04",
  "REMERA 4",
  "./img/productos/remera-4.jpg",
  1500,
  "Remeras"
);
const remera5 = new Producto(
  "remera-05",
  "REMERA 5",
  "./img/productos/remera-5.jpg",
  1500,
  "Remeras"
);
const buzo1 = new Producto(
  "buzo-01",
  "BUZO 1",
  "./img/productos/buzo-1.jpg",
  2500,
  "Buzos"
);
const buzo2 = new Producto(
  "buzo-02",
  "BUZO 2",
  "./img/productos/buzo-2.jpg",
  2500,
  "Buzos"
);
const jeans1 = new Producto(
  "jeans-01",
  "JEANS 1",
  "./img/productos/jean-1.jpg",
  5000,
  "Jeans"
);
const jeans2 = new Producto(
  "jeans-02",
  "JEANS 2",
  "./img/productos/jean-2.jpg",
  5000,
  "Jeans"
);

const productos = [
  remera1,
  remera2,
  remera3,
  remera4,
  remera5,
  buzo1,
  buzo2,
  jeans1,
  jeans2,
];

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
  console.log(botonesAgregar);
}
cargarProductos(productos);

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