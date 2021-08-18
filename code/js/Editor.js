class Editor{
  constructor(
		estado,
		contenedor,
		images,   	
		canvas) 
	{
    this.estado = estado;
		this.container = this.getContainerElement(contenedor);    
		this.images = images;
		this.position = this.getPosition();
		this.currentSize = this.getCurrentSize();
		this.canvas = canvas;
  }


	getContainerElement(elm){
		return document.querySelector(elm)
	}

	
	getContainerRects(){
		return this.container.getBoundingClientRect()
	}


	getPosition(){
	
			return {
				x: this.getContainerRects().x,
				y: this.getContainerRects().y,
				z: 10
			}
	}

	
	getCurrentSize(){
			return {
				width: this.getContainerRects().width,
				height: this.getContainerRects().height
			}
	}


	createCanvas(){
		const editorCanvas = document.createElement("canvas")
		editorCanvas.width = this.currentSize.width
		editorCanvas.height = this.currentSize.height
		editorCanvas.style.position = "absolute";
		editorCanvas.style.left = this.position.x + "px";
		this.canvas = editorCanvas
	}


	showCanvas(){
		document.body.appendChild(this.canvas)
	}

	showElement(){
	
	}

	drawImages(canvas, images){
		let ctx = canvas.getContext("2d")
		// images.forEach(img => {
		// 	ctx.drawImage(img.image,0,0,img.currentSize.width,img.currentSize.height)
		// });

//		ctx.drawImage(images[2].image,0,0,images[2].image.naturalWidth,images[2].image.naturalHeight,0,0,canvas.width, canvas.height)
		
		for(let i = 0; i< images.length; i++){
			if(images[i]){

					let currentRole = images[i].role
					let currentImg = images[i].image;
					let currentContainer = images[i].container;
					let currentRects = currentContainer.getBoundingClientRect()
		
					if(currentRole === "producto"){
							var hRatio = canvas.width / currentImg.naturalWidth    
							var vRatio = canvas.height / currentImg.naturalHeight  
							var ratio  = Math.min(vRatio, hRatio)

							var centerShift_x = ( canvas.width - currentImg.naturalWidth*ratio ) / 2;
							var centerShift_y = ( canvas.height - currentImg.naturalHeight *ratio ) / 2;
							
							console.log(images[i])

							ctx.drawImage(
								currentImg,
							 	0, 0, currentImg.naturalWidth, currentImg.naturalHeight ,
								centerShift_x, centerShift_y, currentImg.naturalWidth * ratio , currentImg.naturalHeight * ratio
							);

					
					}else if(currentRole === "fondo") {
					console.log(images[i])

							ctx.drawImage(
								currentImg,
								0, 0, currentImg.naturalWidth, currentImg.naturalHeight,
								images[i].position.x, images[i].position.y,  currentRects.width, currentRects.height
							)

					}else if(currentRole === "logo") {
							console.log(images[i])

							ctx.drawImage(
								currentImg,
								0, 0, currentImg.naturalWidth, currentImg.naturalHeight,
								images[i].position.x - currentImg.naturalWidth, images[i].position.y,  currentRects.width, currentRects.height
							)

					}


					
			}
		}


		// let fondoImg = images[0].image;
		// let fondoContainer = images[0].container;
		// let fondoRects = fondoContainer.getBoundingClientRect()
		
		// ctx.drawImage(fondoImg,0,0,fondoImg.naturalWidth,fondoImg.naturalHeight,0,0,fondoRects.width, fondoRects.height)



		// let productoImg = images[1].image;
		// let productoContainer = images[1].container;
		// let productoRects = productoContainer.getBoundingClientRect()
		
		// ctx.drawImage(productoImg,0,0,productoImg.naturalWidth,productoImg.naturalHeight,0,0,productoRects.width, productoRects.height)

		

		// let logoImg = images[2].image;
		// let logoContainer = images[2].container;
		// let logoRects = logoContainer.getBoundingClientRect()
		
		// ctx.drawImage(logoImg,0,0,logoImg.naturalWidth,logoImg.naturalHeight,0,0,logoRects.width, logoRects.height)



//console.log(images[0].image, 0, 0, images[0].currentSize.width,    images[0].currentSize.height,     // source rectangle
  //                 0, 0, canvas.width, canvas.height
		//							 )


//ctx.drawImage(images[0].image, 0, 0, images[0].currentSize.width,    images[0].currentSize.height,     // source rectangle
  //                 0, 0, canvas.width, canvas.height)

		//ctx.drawImage(images[2].image,0,0,images[2].currentSize.width,images[2].currentSize.height,
			// 0,0,canvas.width, canvas.height)
		//ctx.drawImage(images[1].image,0,0,images[0].currentSize.width,images[0].currentSize.height)
		//ctx.drawImage(images[2].image,0,0,images[0].currentSize.width,images[0].currentSize.height)
		

	}


//context.drawImage(newImg, 0,0, newImg.width, newImg.height ,
// 						// centerShift_x,centerShift_y,newImg.width, newImg.height);




	downloadImagesOnCanvas(){
		this.createCanvas();
		this.showCanvas()
		this.drawImages(this.canvas, this.images)
	}


	addImage(imagen_editable){
		if(imagen_editable.role === "fondo"){
			this.images[0] = imagen_editable
		}else if(imagen_editable.role === "producto"){
			this.images[1] = imagen_editable
		}else if(imagen_editable.role === "logo"){
			this.images[2] = imagen_editable
		}
	}

	generateImage(imagen_editable){

		const img = new Image;
		img.src = imagen_editable.source;
		img.id = imagen_editable.role
		img.width = imagen_editable.currentSize.width;
		img.height = imagen_editable.currentSize.height;
		return img
	
	}


	insertImage(img){
		console.log(this)
		img.container.appendChild(this.generateImage(img));
		img.estado= "loaded"
	}


	removeImage(role){	
	//	console.log(this.image.id)
		if(role === "fondo"){
			let fondo = this.images[0]
			fondo.empty()
			this.images[0] = ""
			document.getElementById("fondo").remove()

		}
		
	
	}

	loadImage(role,img){
		if(role === "fondo"){
			this.insertImage(img)
		}
			
	
	}


	empty(){
    this.estado = "";
		this.container = ""    
		this.images = "";
		this.position = ""
		this.currentSize = ""
		this.canvas = ""	
	}




	loadToEditor() {

  }

	eraseFromEditor(){
	
	}

	changeTransparency(){
	
	}


}



function loadImages(sources, callback){


}