window.addEventListener( 'touchmove', function() {})


	let loc = window.location.href.split("/") 

	if(loc[loc.length -2 ] === "svg"){
	
			coloresdiv = document.getElementById("colores")

			let coloreslist = ["#5B3D7A","#fc2531" , "#9b111e", "#a15f8c", "#f94d00", "#ffdf00", "#ff7f50", "#f6a90f", "#FFFF00",
						"#FF00FF", "#738276", "#3f000f", "#348C31", "#FFD700", "#8DB600", "#228b22", "#50C878", "#30D5C8",
						"#000080", "#800020", "#FF2400", "#054d95", "#218db1", "#FF00FF", "#658c88", "#0071D4", "#87CEFF"
			  ]


			let style = `
				position: absolute;
				display: grid;
				grid-template-columns: auto auto auto;
				width: 80px;
				height: 200px;
				background: #fff;
				z-index: 50;
				display : none
			
			`

			coloresdiv.setAttribute("style", style)



			for(let i= 0; i< coloreslist.length; i++){
				let btn = document.createElement("div")
				btn.style.backgroundColor = coloreslist[i]
				btn.setAttribute("id", coloreslist[i])	
				btn.addEventListener("click", cambiarColor)

				coloresdiv.appendChild(btn)
			
			
			}


			console.log(coloresdiv)

	}


let editor = new Editor("", ".bg_producto", [])

//let productoFoto = new ImagenEditable("",editor, ".producto","rg/img/20/102012111004.jpg","jpg",0,0,"producto")

let arr = window.location.href.split("/") 



let productoFoto
let logo 

if(arr[arr.length -2 ] === "svg"){


//	productoFoto = new ImagenEditable("",editor, ".producto","../VD5062.svg","svg",0,0,"producto", null, "../VD5062.svg")
	productoFoto = new SvgObject("",editor, ".producto","../VD5062.svg","svg",0,0,"producto", null, "../VD5062.svg")
	logo = new ImagenEditable("", editor, ".logo", "../rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")

	
	
	// document.getElementById("favcolor").addEventListener("change", (e) =>{

	// 	if(productoFoto.estado === "selected"){
	// 		productoFoto.changeColor(e.target.value)
	// 	}	
	// })

	// fetch("../VD5062.svg")
  // .then(response => {
  //   return response.text()
  // })
  // .then(data => {
	// 	console.log(data)
	// 	let container = document.querySelector(".producto")
	// 	console.log(container)
	// 	container.innerHTML += `<div id="producto_wrap" ></div>`
	// 	document.getElementById("producto_wrap").innerHTML = data
	// 	let svgColorContainer = document.querySelector("defs style")
	// 	let colorText = svgColorContainer.textContent
	// 	console.log(colorText.trim())
	// 	let originalColor = /#.{6}/.exec(colorText.trim())[0]
	// 	console.log(originalColor)
	// 	console.log(productoFoto)
		
	
  // });




}else{
	productoFoto = new ImagenRedimensionable("", editor, ".producto", "jpg", "producto", "rg/img/20/102012111004.jpg")
//	productoFoto = new ImagenEditable("",editor, ".producto","plop.jpg","jpg",0,0,"producto", null, "VD5062.svg")
	logo = new ImagenEditable("", editor, ".logo", "rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")


}

//let productoFoto = new ImagenEditable("",editor, ".producto","VD5062.svg","jpg",0,0,"producto", null, "VD5062.svg")



//let logo = new ImagenEditable("", editor, ".logo", "rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")

//editor.addImage(productoFoto)

editor.addImage(logo)

// editor.images.forEach(img => {	
// 	if(img)	editor.insertImage(img)
// });

// console.log(editor)


const fotoFile = document.getElementById("fotoHiddenInputBtn")

fotoFile.addEventListener('change', archivo, true)

function subirFondo(){  

	if(editor.estado === ""){
	
		if(!editor.images[0])
	
				fotoFile.click()
		}                       
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
						
		}
	})(foto);	
}


function eliminarFondo(){
	if(editor.images[0] && editor.estado === ""){
		editor.removeImage("fondo")
	}
}

function recortarFondo(){

	if(editor.images[0]){
		if(editor.estado === ""){	
		
			editor.estado = "editando fondo"
			editor.showCropBox()
			editor.sendFondoToFront()		
			
		}else if(editor.estado === "editando fondo"){
	
			editor.drawFondoOnCanvas()
		}	
	}

}





function cambiarColor(){
	editor.images[1].changeColor(this.id)
	
	
}


function toggleColores(){
	if(document.getElementById("colores").style.display === "none"){
		document.getElementById("colores").style.display = "grid"
	}else{
		document.getElementById("colores").style.display = "none"
	}
	
}
