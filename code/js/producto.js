

let producto

window.addEventListener("load", () => {
		producto = new ImagenRedimensionable("unselected",	editor,	document.querySelector(".producto"),	"jpg",	"producto")

})

window.addEventListener("click", selectProducto)

function selectProducto(e){
		if(e.target.id === "producto"){
			producto.select()
		}else{
	
			if(producto.estado === "selected"){			
					producto.unselect()
			}
			
		}
		
}