const fotoFile = document.getElementById("fotoHiddenInputBtn")
fotoFile.addEventListener('change', archivo, true)

function subirFondo(){  
	document.getElementById("subir_fondo").style.backgroundColor = "#cdd"
	editor.images[1].unselect()
	if(!editor.images[0])	
			fotoFile.click()	
			setTimeout(() => {
				document.getElementById("subir_fondo").style.backgroundColor = ""
			}, 4000);
}  


function archivo(e) {
	const foto = e.target.files[0]
	
	if (!foto.type.match('image.*')) return
	const reader = new FileReader();
	reader.readAsDataURL(foto);	
	
	reader.onload = (function (){
		return function (e) {									
				const fondo1 = new ImagenEditable("",editor,"." + editor.container.className, e.target.result , "jpg",0, 1, "fondo" ,null,e.target.result )		
				editor.addImage(fondo1)	
				document.getElementById("subir_fondo").style.backgroundColor = ""	
		}	
	})(foto);	
}

function eliminarFondo(){
	if(editor.images[0] && editor.estado === ""){
		document.getElementById("recortar_fondo").style.backgroundColor = "#cdd"
		editor.removeImage("fondo")
		document.getElementById("recortar_fondo").style.backgroundColor = ""
	}
}

function recortarFondo(){	
	if(editor.images[0]){
		if(editor.estado === ""){	
			document.getElementById("recortar_fondo").style.backgroundColor = "#cdd"
			editor.estado = "editando fondo"
			editor.showCropBox()
			editor.sendFondoToFront()		
		}else if(editor.estado === "editando fondo"){
			editor.drawFondoOnCanvas()
			document.getElementById("recortar_fondo").style.backgroundColor = ""
		}	
	}
}
