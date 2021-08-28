window.addEventListener("click", selectProducto)


function selectProducto(e){
	if(e.target.id === "producto"){
		if(editor.images[1].estado !== "selected"){
			if(editor.estado !== "editando producto"){
				editor.images[1].select()			
			}	
		}	
	}else{
			const btn_ids = ["btn_resetear", "btn_borrar", "btn_recortar", "btn_menos_transparencia", "cropbox", "editor_canvas",
				"btn_mas_transparencia", "btn_rotar_izquierda", "btn_rotar_derecha", "btn_reducir", "btn_agrandar", "favcolor",
				"handle_1", "handle_2", "handle_3", "handle_0",  "eliminar_fondo",  "recortar_fondo" 
				  ] 

			if(!btn_ids.includes(e.target.id)){
					if(editor.estado !== "editando fondo" && editor.images[1].estado === "selected" ){
						editor.images[1].unselect()
					}
			}					
		}
}


function aumentar(){
console.log(editor.estado)
	if(editor.estado === "" || editor.estado === "editando producto" ){
		editor.images[1].unselect()
		editor.images[1].aumentar()
		editor.images[1].select()	
	}



}



function reducir(){
	if(editor.estado === "" || editor.estado === "editando producto" ){
		editor.images[1].unselect()
		editor.images[1].reducir()
		editor.images[1].select()	
	}

}

function rotar(){
	if(editor.estado === "" || editor.estado === "editando producto" ){
			editor.images[1].unselect()
			editor.images[1].rotar()
	
	}



}

function rotarm(){
	if(editor.estado === "" || editor.estado === "editando producto" ){		
		editor.images[1].unselect()
		editor.images[1].rotarm()
	}
}

function recortar(){
	if(editor.images[1].estado === "selected" || editor.images[1].estado === "crop"){
		editor.images[1].recortar()
	}
}






function borrar(){
	if(editor.images[1].estado === "selected"){
		editor.images[1].borrar()
	}else if(editor.images[1].estado === "borrando"){
		editor.images[1].guardarImagen(editor.images[1].canvasPosition, editor.images[1].canvasSize)
	}
}


function resetear(){

	if(editor.estado === "" || editor.estado === "editando producto" ){
			editor.images[1].unselect()
			resetearEditor()
			
		
	}

}



function resetearEditor(){
	document.querySelector(".producto").innerHTML = ""
	document.querySelector(".logo").innerHTML = ""

	let nuevo_fondo
	if(document.getElementById("fondo")){
		nuevo_fondo = editor.images[0]
		document.getElementById("fondo").remove()
	}


	editor = new Editor("", ".bg_producto", [])

//	editor.images = []

	let arr = window.location.href.split("/") 

	if(arr[arr.length -2 ] === "svg"){
		
	//	productoFoto = new ImagenEditable("",editor, ".producto","../VD5062.svg","jpg",0,0,"producto", null, "../VD5062.svg")
		productoFoto = new SvgObject("",editor, ".producto","../VD5062.svg","svg",0,0,"producto", null, "../VD5062.svg")
		logo = new ImagenEditable("", editor, ".logo", "../rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")





	}else{
		//productoFoto = new ImagenEditable("",editor, ".producto","rg/img/20/102012111004.jpg","jpg",0,0,"producto")
			productoFoto = new ImagenRedimensionable("", editor, ".producto", "jpg", "producto", "rg/img/20/102012111004.jpg")
		//	productoFoto = new ImagenEditable("",editor, ".producto","rg/img/20/102012111004.jpg","jpg",0,0,"producto")
			logo = new ImagenEditable("", editor, ".logo", "rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")
	}

console.log(editor)	
	editor.addImage(productoFoto)
 	editor.addImage(logo)

	if(nuevo_fondo){
		editor.addImage(nuevo_fondo)
	}

//	editor.insertImage(editor.images[1])
	//editor.insertImage(editor.images[2])



	// editor.images.forEach(img => {	
	// 	if(img)	editor.insertImage(img)
	// });


	setTimeout(() => {
		//	productoFoto = new ImagenRedimensionable("", editor, ".producto", "jpg", "producto", "rg/img/20/102012111004.jpg")

	}, 1000)

	

}


function masTransparencia(){
	if(editor.estado === ""  || editor.estado === "editando producto" ){
		editor.images[1].unselect()
		editor.images[1].masTransparencia()
		editor.images[1].select()

	}
	
}

function menosTransparencia(){
	console.log(editor.estado)
	if(editor.estado === "" || editor.estado === "editando producto" ){
		editor.images[1].unselect()
		editor.images[1].menosTransparencia()
		editor.images[1].select()
	
	}
	
}