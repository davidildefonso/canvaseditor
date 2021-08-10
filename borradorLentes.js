let btnBorradorLentes = document.getElementById("eraseGlasses");
btnBorradorLentes.addEventListener("click", borrarLentes);

var glassesCanvas = document.getElementById('glassesCanvas');
glassesCanvas.style.display = "none";

circularCursor = document.getElementById("circularcursor")
circularCursor.style.display = "none"

function borrarLentes(){

	if($('.img-fluid').css("display")!="none"){
			alert("debe subir una imagen primero")
			return;
	}





	if(GLASSES_STATUS !== "loaded") return;
	if(FONDO_STATUS === "borrando") return

	//if(localStorage.getItem("fondoStatus") !== "loaded") return

	GLASSES_STATUS = "borrando"
	//localStorage.setItem("glassesStatus", "borrando")
	document.getElementById("mi_imagen").style.display = "none"

	btnBorradorLentes.firstChild.src = "img/iconos/ok-mark.png"
	btnBorradorLentes.style.background = "#17a2b8"

	glassesCanvas.style.display = "block";
	glassesCanvas.style.position = "absolute";
	glassesCanvas.style.top = "5%";
	glassesCanvas.style.left = "20%" ;
	glassesCanvas.style.border = "2px solid #fff"

	var url = document.querySelector(".component").style
		.backgroundImage.slice(4, -1).replace(/["']/g, ""); 	document.querySelector(".component").style.backgroundImage =
	'linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(' + url + ')';
	document.querySelector(".component").style.
	backgroundPosition = "center"
	document.querySelector(".component").style.
	backgroundRepeat = "no-repeat"
	document.querySelector(".component").style.
	backgroundSize = "cover"
	glassesCanvas.style.background = "transparent"
	glassesCanvas.style.zIndex = 10	
	src = GLASSES_SRC
	var ctx = glassesCanvas.getContext('2d');
		ctx.fillStyle = "#FF0000";
	var img = new Image();
	img.src = src;
	img.onload = function () {
		var width = img.width
		var height = img.height 
		glassesCanvas.width = width;
		glassesCanvas.height = height;
		ctx.drawImage(img, 0, 0, width, height);
	};

	var isPress = false;
	var old = null;
	

	glassesCanvas.addEventListener("mouseenter", () => {
		circularCursor.style.display = "block"
	})

	glassesCanvas.addEventListener("mouseleave", () => {
		circularCursor.style.display = "none"
	})


	glassesCanvas.addEventListener('mousedown', function (e){
		isPress = true;
		old = {x: e.offsetX, y: e.offsetY};
		
	});
	glassesCanvas.addEventListener('mousemove', function (e){
		if (isPress) {
			var x = e.offsetX;
			var y = e.offsetY;
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();		
			ctx.arc(x, y, 10, 0, 2 * Math.PI);
			ctx.fill();
			ctx.lineWidth = 20;
			ctx.beginPath();
			ctx.moveTo(old.x, old.y);
			ctx.lineTo(x, y);
			ctx.stroke();
			old = {x: x, y: y};
		}
		const circularCursor = document.getElementById("circularcursor")
		circularCursor.style.zIndex = 1;

		circularCursor.style.left =  e.pageX
		+"px";
		circularCursor.style.top = e.pageY  +"px";
		glassesCanvas.classList.add("hide-cursor")


	});
	glassesCanvas.addEventListener('mouseup', function (e){
		isPress = false;
		
	});




	btnBorradorLentes.addEventListener("click", guardarImagenLentes)
	btnBorradorLentes.removeEventListener("click", borrarLentes)
}


function guardarImagenLentes(){
	var image = glassesCanvas.toDataURL("image/png");
 	glassesCanvas.style.display ="none"
	glassesCanvas.style.zIndex = 1;
	btnBorradorLentes.firstChild.src = "img/iconos/borrar_producto.svg"
	btnBorradorLentes.style.background = "transparent";	
	GLASSES_SRC = image
	document.querySelector(".component").style.backgroundImage =
 	'url(' + FONDO_SRC + ')';

	document.querySelector(".component").style.
	backgroundPosition = "center"

	document.querySelector(".component").style.
	backgroundRepeat = "no-repeat"

	document.querySelector(".component").style.
	backgroundSize = "cover"

	
	const imgElm = document.createElement("img")
	imgElm.setAttribute("id", "imgtest")
	document.body.appendChild(imgElm)
	document.querySelector("#imgtest").src = GLASSES_SRC
	document.getElementById("mi_imagen").src =  document.querySelector("#imgtest").src 
	GLASSES_STATUS = "loaded"
	document.querySelector("#imgtest").remove()
	btnBorradorLentes.addEventListener("click", borrarLentes)
	btnBorradorLentes.removeEventListener("click", guardarImagenLentes )
	document.getElementById("mi_imagen").style.display = "block"
}







