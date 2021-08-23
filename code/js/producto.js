

let producto

window.addEventListener("load", () => {
//onsole.log(document.getElementById("producto"))
	if(document.getElementById("producto")){

			if(productoFoto.tipe !== "svg"	){
				producto = new ImagenRedimensionable("unselected",	editor,	document.querySelector(".producto"),	"jpg",	"producto")
			}
				
	}
		
		

})

window.addEventListener("click", selectProducto)

function selectProducto(e){

		if(e.target.id === "producto"){
			if(producto){
				if(producto.tipe !== "svg"){
				console.log("aqui")
					producto.select()
				}else{
					productoFoto.select()
				}
				
			}else if(productoFoto){
				if(productoFoto.tipe === "svg"){
					productoFoto.select()
				}else{
					producto.select()
				}
			}

			
		}else{
	
			const btn_ids = ["btn_resetear", "btn_borrar", "btn_recortar", "btn_menos_transparencia",
				"btn_mas_transparencia", "btn_rotar_izquierda", "btn_rotar_derecha", "btn_reducir", "btn_agrandar", "favcolor"]
			if(producto){
				if(producto.tipe !== "svg"){
					if(producto.estado === "selected"){		
						
							if(!btn_ids.includes(e.target.id)){
									producto.unselect()
							}	
					}
				}else{
					
				}
				
			}else if(productoFoto){
				if(productoFoto.estado === "selected"){		
						
							if(!btn_ids.includes(e.target.id)){
									productoFoto.unselect()
							}	
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
		
	

	
	
}






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
	
	editor = new Editor("", ".bg_producto", [])

	
	let arr = window.location.href.split("/") 

	if(arr[arr.length -2 ] === "svg"){
		
	//	productoFoto = new ImagenEditable("",editor, ".producto","../VD5062.svg","jpg",0,0,"producto", null, "../VD5062.svg")
		productoFoto = new SvgObject("",editor, ".producto","../VD5062.svg","svg",0,0,"producto", null, "../VD5062.svg")
		logo = new ImagenEditable("", editor, ".logo", "../rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")





	}else{
		productoFoto = new ImagenEditable("",editor, ".producto","rg/img/20/102012111004.jpg","jpg",0,0,"producto")
		logo = new ImagenEditable("", editor, ".logo", "rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")
	}


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