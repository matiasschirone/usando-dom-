let leyenda = document.createElement("h3");
leyenda.innerHTML = "<h3> Estos son los sectores que te podemos ofrecer</h3>";
document.body.prepend(leyenda);

let titulo = document.createElement("p");
titulo.innerHTML = "<h1>Venta de entradas</h1>";
document.body.prepend(titulo);

const baseDeDatos = [{ id: 1, nombre: "Campo", precio: 1000, stock: 100},
{ id: 2, nombre: "Popular", precio: 80, stock: 80 },
{ id: 3, nombre: "Platea", precio: 2000, stock: 60 }];

let carrito = [];
const divisa = '$';
const domItems = document.querySelector('#items');
const domCarrito = document.querySelector('#carrito');
const domTotal = document.querySelector('#total');
const domBotonVaciar = document.querySelector('#boton-vaciar');
const domCuotas = document.querySelector('#boton-comprar');
const domSelectCuotas = document.querySelector('#selectCuotas');

function renderProductos() {
    baseDeDatos.forEach((info) => {

        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-3', 'mx-2', 'my-2');

        const nodoCardBody = document.createElement('div');
        nodoCardBody.classList.add('card-body');

        const nodoTitle = document.createElement('h3');
        nodoTitle.classList.add('card-title');
        nodoTitle.textContent = info.nombre;

        const nodoPrecio = document.createElement('p');
        nodoPrecio.classList.add('card-text');
        nodoPrecio.textContent = `${divisa}${info.precio}`;

        const nodoBoton = document.createElement('button');
        nodoBoton.classList.add('btn', 'btn-primary');
        nodoBoton.textContent = 'agregar';
        nodoBoton.setAttribute('marcador', info.id);
        nodoBoton.addEventListener('click', addProductsCart);

        nodoCardBody.appendChild(nodoTitle);
        nodoCardBody.appendChild(nodoPrecio);
        nodoCardBody.appendChild(nodoBoton);
        miNodo.appendChild(nodoCardBody);
        domItems.appendChild(miNodo);
    });
}

function addProductsCart(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderCarrito();
    domBotonVaciar.disabled = false;
    domCuotas.disabled = false;

}

function renderCarrito() {

    if (carrito.length === 0) {
        domCarrito.textContent = 'No hay productos en el carrito';

    } else {
        domCarrito.textContent = '';

        const opcion = document.createElement('option');

        //opcion.value = 1;
        //opcion.textContent = '1 cuota de ${total / 1 }'

        opcion.value = 2;
        opcion.textContent = '3 cuota de ${total / 3 }'

        opcion.value = 3;
        opcion.textContent = '6 cuota de ${total / 6 }'

        opcion.value = 4;
        opcion.textContent = '12 cuota de ${total / 12 }'

        domSelectCuotas.appendChild(opcion);

    }

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {

            return itemBaseDatos.id === parseInt(item);
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {

            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger',);
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);


        miNodo.appendChild(miBoton);
        domCarrito.appendChild(miNodo);
    });

    domTotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderCarrito();

    if (carrito.length === 0) {
        domBotonVaciar.disabled = true;
        domCuotas.disabled = true;
    }
}

function calcularTotal() {

    return carrito.reduce((total, item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });

        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {

    carrito = [];

    domBotonVaciar.disabled = true;
    domCuotas.disabled = true;

    renderCarrito();
}

domBotonVaciar.addEventListener('click', vaciarCarrito);


renderProductos();
renderCarrito();

