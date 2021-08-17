

// document.querySelector(".subir_foto")
// 	.addEventListener("click", subirFoto)



document.querySelector(".recortar_foto").
	addEventListener('click', showCropbox)


function showCropbox(e){
		if(FONDO_STATUS === ""){
			alert("debe subir una imagen primero")	
			return
		}else{	
				
			var canvas = document.getElementById("canvasCrop");
			var context = canvas.getContext('2d');
			const producto = document.querySelector(".producto")
			
			let componentRect = document.querySelector(".producto")
					.getBoundingClientRect()
			
			canvas.width = componentRect.width;
			canvas.height = componentRect.height;
			canvas.classList.remove("hidden")
			canvas.style.position = "absolute"
			canvas.style.zIndex = 10
			
			drawImage(canvas, ORIGINAL_SRC)
    	
			producto.classList.add("hidden")
			resizeableBox();
			document.querySelector(".recortar_foto").addEventListener("click", cropImage)
			document.querySelector(".recortar_foto").removeEventListener("click", showCropbox)

		
		
		}
}

function drawImage(canvas, src){
	const img = new Image;
	var context = canvas.getContext('2d')
	img.src = src
	img.onload = function() {
		
		
		var hRatio = canvas.width / img.width    
		var vRatio = canvas.height / img.height  
		var ratio  = Math.min(vRatio, hRatio)
		var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
		var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
		context.drawImage(img, 0,0, img.width, img.height,
		centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
		
	}
}

function cropImage(){
	console.log("crop!")
	const canvas = document.getElementById("canvasCrop");
	const ctx = canvas.getContext('2d');
	let cw,ch;
  cw=canvas.width;
  ch=canvas.height;
 
  
	drawImage(canvas, ORIGINAL_SRC)

	const canvasRects = canvas.getBoundingClientRect()
	console.log(canvasRects)
	

	const rects = document.getElementById("cropboxContainer")
	.getBoundingClientRect()
	console.log(rects)
	
	
	ctx.globalCompositeOperation='destination-in';
  ctx.beginPath();
  ctx.rect(rects.x - canvasRects.x, rects.y - canvasRects.y, rects.width, rects.height);
  ctx.closePath();
  ctx.fill();

	const dataUrl = canvas.toDataURL("image/png");
//	console.log(dataUrl)
	//console.log(ORIGINAL_SRC)






}



document.querySelector(".descargar_foto").addEventListener("click", downloadImg)


function downloadImg(){
	console.log("download")
	console.log(ORIGINAL_SRC)

	const canvas = document.createElement("canvas")	
	let componentRect = document.querySelector(".bg_producto")
			.getBoundingClientRect()	
	canvas.width = componentRect.width;
	canvas.height = componentRect.height;
	
	const img = new Image;
	var context = canvas.getContext('2d')
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);

	
	var url = document.querySelector(".bg_producto").style
		.backgroundImage.slice(4, -1).replace(/["']/g, ""); 

	img.src = url
	img.onload = function() {
		
		
		var hRatio = canvas.width / img.width    
		var vRatio = canvas.height / img.height  
		var ratio  = Math.min(vRatio, hRatio)
		var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
		var centerShift_y = ( canvas.height - img.height*ratio ) / 2;
		context.drawImage(img, 0,0, img.width, img.height,
		centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
// 		const dataUrl = canvas.toDataURL("image/png");
// console.log(dataUrl)
// 		const anchor = document.createElement("a");
// 		document.body.appendChild(anchor)
// 		anchor.setAttribute("href", dataUrl);
// 		anchor.setAttribute("download", "img.png");
// 		anchor.setAttribute("id", "downloadanchor");
// 		anchor.innerText = "download"
		
// 		anchor.click()
// 		anchor.remove()

			  let producto = document.getElementById("mi_imagen")
						//.getBoundingClientRect()	
				let prodWidth = producto.getBoundingClientRect().width
						let prodHeigth = producto.getBoundingClientRect().height
						let prodX = producto.getBoundingClientRect().y
						let prodY = producto.getBoundingClientRect().y
				console.log(producto.getBoundingClientRect())
				console.log(prodWidth, prodHeigth)
				console.log(producto.width)
				console.log(producto.height)

				const newImg = new Image()
				newImg.src = producto.src
				newImg.width = producto.width
				newImg.height = producto.height
				

				console.log(newImg)
				
 var scale = Math.min(canvas.width / newImg.width, canvas.height / newImg.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (newImg.width / 2) * scale;
    var y = (canvas.height / 2) - (newImg.height / 2) * scale;
    //context.drawImage(newImg, x, y, newImg.width * scale, newImg.height * scale);
context.drawImage(newImg, prodX, prodY, newImg.width , newImg.height );

						// console.log("booo")
						// var hRatio = canvas.width / prodWidth    
						// var vRatio = canvas.height / prodHeigth  
						// var ratio  = Math.min(vRatio, hRatio)

						// console.log(prodWidth * ratio, prodHeigth * ratio)
						// var centerShift_x = ( canvas.width - prodWidth*ratio ) / 2;
						// var centerShift_y = ( canvas.height - prodHeigth*ratio ) / 2;
						// context.drawImage(newImg, 0,0, newImg.width, newImg.height ,
						// centerShift_x,centerShift_y,newImg.width, newImg.height);

					 const link = document.createElement('a');
						link.download = 'download.png';
						link.href = canvas.toDataURL();
						link.click();
						link.delete;



				


					console.log("aquiii")

	}	

	
}




/////////////////////////////////////////////////////

const fotoFile = document.getElementById("fotoHiddenInputBtn")

fotoFile.addEventListener('change', archivo, true)

function subirFondo(){  
	if(FONDO_STATUS === "" ||FONDO_STATUS === "loaded"){
		fotoFile.click()
	}                       
}

let fondo1

function archivo(e) {
	const foto = e.target.files[0]
	if (!foto.type.match('image.*')) return
	const reader = new FileReader();
	reader.readAsDataURL(foto);	
	reader.onload = (function (){
		return function (e) {
				FONDO_SRC = e.target.result
				ORIGINAL_SRC = FONDO_SRC							
				FONDO_STATUS = "loaded"										
	//			producto.src = FONDO_SRC
				fondo1 = new ImagenEditable("",".bg_producto", FONDO_SRC , "jpg",0, 1, "fondo"  )
				fondo1.insertImage()
				fondo1.estado = "loaded"
			console.log(fondo1)
		}
	})(foto);	
}







function eliminarFondo(){
	if(FONDO_STATUS !== "loaded") return
	//producto.src = ""
	FONDO_STATUS = ""
	FONDO_SRC = ""
	ORIGINAL_SRC = ""
	console.log(fondo1)
	fondo1.removeImage()
	fondo1.empty()
	


}





//const fondo1 = new ImagenEditable("",".bg_producto", "plop.jpg", "jpg",0, 1, "fondo"  )



console.log(fondo1)

//fondo1.insertImage();