let leyenda = document.createElement("h3");
leyenda.innerHTML = "<h3> Estos son los sectores que te podemos ofrecer</h3>";
document.body.prepend(leyenda);

let titulo = document.createElement("p");
titulo.innerHTML = "<h1>Venta de entradas</h1>"; 
document.body.prepend(titulo);


const baseDeDatos = [{ id: 1,  nombre: "Campo", precio: 1000, stock:100 },
                  {  id: 2,  nombre: "Popular", precio: 1500, stock: 80 },
                  {  id: 3,  nombre: "Platea"  , precio: 2000, stock: 60}];



let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
/*const DOMcuotas = documntent.querySelector('#boton-comprar');*/


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
       
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
     
        const miNodoTitle = document.createElement('h3');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = 'agregar';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
       
    
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}


function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();

}


function renderizarCarrito() {
    
    DOMcarrito.textContent = '';
    
    const carritoSinDuplicados = [...new Set(carrito)];
    
    carritoSinDuplicados.forEach((item) => {
        
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
           
            return itemBaseDatos.id === parseInt(item);
        });
       
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
           
            return itemId === item ? total += 1 : total;
        }, 0);
        
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
       
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

       
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    
    DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
   
    const id = evento.target.dataset.item;
  
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
  
    renderizarCarrito();
}


function calcularTotal() {
    
    return carrito.reduce((total, item) => {
      
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
       
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/*function cuotas(){

}*/


function vaciarCarrito() {
 
    carrito = [];
  
    renderizarCarrito();
}


DOMbotonVaciar.addEventListener('click', vaciarCarrito);


renderizarProductos();
renderizarCarrito();




