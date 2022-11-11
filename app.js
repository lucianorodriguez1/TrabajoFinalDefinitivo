//productos
const stockProductos = [
    {
        id: 1, 
        nombre: "PC Home Office / Micro Intel pentium G6405 - H410 - 8GB - 240GB SSD", 
        cantidad: 1, 
        desc: "Una PC que re va con vos", 
        precio: 56312.12,
        img: './img/pc-1.jpg'
    },


    {
        id: 2, 
        nombre: "PC Oficina Intel - I3 10105 - H410 - 8GB RAM - 240SSD", 
        cantidad: 1, 
        desc: "Una PC que re va con vos", 
        precio: 70232.62,  
        img: './img/pc-2.jpg'
    },



    {
        id: 3, 
        nombre: "PC OFICINA INTEL I3 10105F - GT1030 2GB - H410 - 8GB - 240GB SSD", 
        cantidad: 1, 
        desc: "Una PC que re va con vos", 
        precio: 83275.38, 
        img: './img/pc-3.jpg'
    },


    {
        id: 4, 
        nombre: "PC HOME OFFICE / MICRO INTEL I5 10400 - H410 - 8GB - 240GB SSD", 
        cantidad: 1, 
        desc: "Una PC que re va con vos", 
        precio: 83563.91, 
        img: './img/pc-4.jpg'
    },



    {
        id: 5, 
        nombre: "PC OFICINA INTEL I5 10400 - B460 - 16GB - 480 SSD",  
        cantidad: 1, 
        desc: "Una PC que re va con vos", 
        precio: 93793.72, 
        img: './img/pc-5.jpg'
    },



    {
        id: 6, 
        nombre: "PC STREAMING RYZEN 7 4750G PRO - B450 - 16GB - 240GB", 
        cantidad: 1, 
        desc: "Una PC que re va con vos", 
        precio: 112143.69, 
        img: './img/pc-6.jpg'
    },


    {
        id: 7, 
        nombre: "PC INTEL GAMER I3 12100F - H610 - 16GB -240GB SSD - RX6400 ", 
        cantidad: 1, 
        desc: "Una PC que re va con vos", 
        precio: 153866.56,  
        img: './img/pc-7.jpg'
    },



    {
        id: 8, 
        nombre: "PC GAMER - Intel Core I7 10700KF - Z490 - 32GB - 3070 8gb - 480GB SSD", 
        cantidad: 1, 
        desc: "Una PC que re va con vos", 
        precio: 502086.41, 
        img: './img/pc-8.jpg'
    },


]































// veriables
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []



document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

//INYECTO HTML
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})


//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId) 

    if (existe){ 
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito() 
}


//ELIMINAR DEL CARRITO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)
    
    carrito.splice(indice, 1) 

    actualizarCarrito() 

    console.log(carrito)
}

//ACTUALIZAR CARRITO
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p> Precio:$${prod.precio}</p>
        <p> Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contadorCarrito.innerText = carrito.length 
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
  

}




fetch("./data.json")
.then(response=>response.json())
.then(data=>{
    console.log(data);
})


// fetch("./data.json")
// .then(function(res){
//     return res.json();
// })
// .then(function(data){
//     let html = "";
//     data.forEach(function(dato){
//         html=+`
//         <img src=${dato.img} alt= "">
//         <h3>${dato.nombre}</h3>
//         <p>${dato.desc}</p>
//         <p class="precioProducto">Precio:$ ${dato.precio}</p>
//         <button id="agregar${dato.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
//         `
//     })
// })







// modal del html


const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})












