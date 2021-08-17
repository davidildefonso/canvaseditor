//let btnBorrador = document.getElementById("borrador");
//btnBorrador.addEventListener("click", dibujarCanvas);
var canvas = document.getElementById('canvas');
//canvas.style.display = "none";
let pointer = document.getElementById("circularcursor2")
pointer.style.display = "none"


function dibujarCanvas(){
	if($('.img-fluid').css("display")!="none"){
			alert("debe subir una imagen primero")
			return;
	}

	if(GLASSES_STATUS === "borrando") return
	
	FONDO_STATUS = "borrando"
	btnBorrador.firstChild.src = "img/iconos/ok-mark.png"
	btnBorrador.style.background = "#17a2b8"
	canvas.style.display = "block";
	canvas.style.position = "absolute";
	canvas.style.background = "#9999ff"
	canvas.style.top = 0;
	canvas.style.left = 125;
	canvas.style.zIndex = 10;

	var url = document.querySelector(".bg_producto").style
		.backgroundImage.slice(4, -1).replace(/["']/g, ""); 
	document.querySelector(".component").style.backgroundImage =
	'linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(' + url + ')';

	var ctx = canvas.getContext('2d');
	ctx.fillStyle = "#FF0000";
	var img = new Image();
	img.src = url;
	img.onload = function () {
		let componentRect = document.querySelector("#contimgall")
			.getBoundingClientRect()
		canvas.width = componentRect.width * 0.9
		canvas.height = componentRect.height * 0.9
		var hRatio = canvas.width / img.width    ;
		var vRatio = canvas.height / img.height  ;
		var ratio  = Math.max(vRatio, hRatio)
		var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
		var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
		ctx.drawImage(img, 0,0, img.width, img.height,
		centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
	};

	var isPress = false;
	var old = null;
	canvas.addEventListener('mousedown', function (e){
		isPress = true;
		old = {x: e.offsetX, y: e.offsetY};
	});
	canvas.addEventListener('mousemove', function (e){
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
	});
	canvas.addEventListener('mouseup', function (e){
		isPress = false;
	});
	btnBorrador.addEventListener("click", guardarImagen)
	btnBorrador.removeEventListener("click", dibujarCanvas)
}

function guardarImagen(){	
	var can = document.getElementById('canvas');
	var image = can.toDataURL("image/png");
 	can.style.display ="none"
	btnBorrador.firstChild.src = "img/iconos/subir_imagen.svg"
	btnBorrador.style.background = "transparent"
	FONDO_SRC = image	
	const imgElm = document.createElement("img")
	imgElm.setAttribute("id", "imgtest")
	document.body.appendChild(imgElm)
	document.querySelector("#imgtest").src = FONDO_SRC
	document.querySelector(".component").style.backgroundImage = 
		"url("+ document.querySelector("#imgtest").src + ")"	
	FONDO_STATUS = "loaded"
	canvas.style.zIndex = 1;
	btnBorrador.addEventListener("click", dibujarCanvas)
	btnBorrador.removeEventListener("click", guardarImagen)	
	imgElm.remove()
}


