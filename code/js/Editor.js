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
		let conte = images[2].container;
		let rectss = conte.getBoundingClientRect()
		console.log(rectss.width, rectss.height)
ctx.drawImage(images[2].image,0,0,images[2].image.naturalWidth,images[2].image.naturalHeight,0,0,rectss.width, rectss.height)

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