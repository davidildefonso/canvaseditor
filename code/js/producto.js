

let producto

window.addEventListener("load", () => {
		producto = new ImagenRedimensionable("unselected",	editor,	document.querySelector(".producto"),	"jpg",	"producto")		
		

})

window.addEventListener("click", selectProducto)

function selectProducto(e){

		if(e.target.id === "producto"){

			producto.select()
		}else{
	
			const btn_ids = ["btn_resetear", "btn_borrar", "btn_recortar", "btn_menos_transparencia",
				"btn_mas_transparencia", "btn_rotar_izquierda", "btn_rotar_derecha", "btn_reducir", "btn_agrandar"]
			
			if(producto.estado === "selected"){		
				
					if(!btn_ids.includes(e.target.id)){
							producto.unselect()
					}	
			}
			
		}
		
}


function aumentar(){
	if(producto.estado === "selected"){
		producto.aumentar()
	}
}



function reducir(){
	if(producto.estado === "selected"){
		producto.reducir()
	}
}

function rotar(){
	if(producto.estado === "selected"){
		producto.rotar()
	}
}

function rotarm(){
	if(producto.estado === "selected"){
		producto.rotarm()
	}
}

function recortar(){
	if(producto.estado === "selected"){
	console.log(producto)
		producto.recortar()
	}
}


function cambiarColor(){
	document.getElementById("favcolor").click()
	console.log(producto)
	//producto.changeColor()

}

document.getElementById("favcolor").addEventListener("change", (e) =>{
	
	producto.changeColor(e.target.value)

})





function borrar(){
	if(producto.estado === "selected"){
		console.log(producto)
		producto.borrar()
	}else if(producto.estado === "borrando"){
		console.log(producto)
		producto.guardarImagen()
	}
}


function resetear(){
	if(producto.estado === "selected"){
		resetearEditor()
	}
}



function resetearEditor(){
	document.querySelector(".producto").innerHTML = ""
	document.querySelector(".logo").innerHTML = ""
	console.log("aqui")
	editor = new Editor("", ".bg_producto", [])
	productoFoto = new ImagenEditable("",editor, ".producto","rg/img/20/102012111004.jpg","jpg",0,0,"producto")
	logo = new ImagenEditable("", editor, ".logo", "rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")

	editor.addImage(productoFoto)
	editor.addImage(logo)

	editor.images.forEach(img => {	
		if(img)	editor.insertImage(img)
	});

	console.log(editor)

	setTimeout(() => {
			producto = new ImagenRedimensionable("unselected",	editor,	document.querySelector(".producto"),	"jpg",	"producto")	
	console.log(producto)
	}, 1000)

	

}


function masTransparencia(){

	if(producto.estado === "selected"){
			producto.masTransparencia()
	}

}

function menosTransparencia(){
	if(producto.estado === "selected"){
			producto.menosTransparencia()
	}
	
}