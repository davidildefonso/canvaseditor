let editor = new Editor("", ".bg_producto", [])
let productoFoto
let logo 

if(isSvg()){
	crearPaleta()
	productoFoto = new SvgObject("",editor, ".producto","../VD5062.svg","svg",0,0,"producto", null, "../VD5062.svg")
	logo = new ImagenEditable("", editor, ".logo", "../rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")
}else{
	productoFoto = new ImagenRedimensionable("", editor, ".producto", "jpg", "producto", "rg/img/20/102012111004.jpg")
	logo = new ImagenEditable("", editor, ".logo", "rg/img/iconos/isotipo_ithaliano.png", "png", 0, 1, "logo")
}

editor.addImage(logo)

function download(){	
	if(editor.estado === ""){
		editor.downloadImagesOnCanvas();
	}	
}

function crearPaleta(){
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
}


function isSvg(){
	const loc = window.location.href.split("/") 
	return loc[loc.length -2 ] === "svg" 
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

