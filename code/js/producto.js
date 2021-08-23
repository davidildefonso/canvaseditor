

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


function resetear(){
	if(producto.estado === "selected"){
		producto.resetear()
	}
}