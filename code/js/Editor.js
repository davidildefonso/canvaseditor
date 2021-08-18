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
		this.tools = []
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
		editorCanvas.style.display = "none";
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
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);



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
								//images[i].position.x, images[i].position.y,  currentRects.width, currentRects.height
								0, 0,  currentRects.width, currentRects.height
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


		

	}


	drawFondoOnCanvas(){
			this.createCanvas();
			this.showCanvas()
			this.drawCropImage(this.canvas, this.images[0],this.tools[0])
			let dataUrl =   this.convertDrawToDataUrl()
			console.log(dataUrl)	
	}

	drawCropImage(canvas, img, cropbox){
		
		let ctx = canvas.getContext("2d")
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		let imgX = cropbox.position.x
		let imgY = cropbox.position.y
		let imgWidth = cropbox.size.width
		let imgHeight = cropbox.size.height

		console.log(img.image)
		console.log(imgX, imgY, imgWidth, imgHeight)
		console.log(canvas.width, canvas.height)
		ctx.drawImage(
			img.image,
			imgX, imgY, imgWidth, imgHeight,
			0, 0,  canvas.width, canvas.height
		)		

		
	
	}


	downloadImagesOnCanvas(){
		this.createCanvas();
		this.showCanvas()
		this.drawImages(this.canvas, this.images)
		let dataUrl =   this.convertDrawToDataUrl()
		this.download(dataUrl)

	}

	download(dataUrl){
		const anchor = document.createElement("a");
		document.body.appendChild(anchor)
		anchor.style.display = "none"
		anchor.setAttribute("href", dataUrl);
		anchor.setAttribute("download", "img.png");
		anchor.setAttribute("id", "downloadanchor");
		anchor.innerText = "download"
		anchor.click()
		anchor.remove()
	}


	convertDrawToDataUrl(){
			return  this.canvas.toDataURL("image/png");	
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

	addTool(object){
		this.tools.push(object)
	}

	createCropBox(){
		const cb = new ResizeableObject("unselected", this, { width: 100, height: 100})
		this.addTool(cb)
		console.log(cb)
		this.container.appendChild(this.tools[0].element)
		console.log(cb)
		console.log(editor)
	}

	showCropBox(){
		this.createCropBox()
		

	}


	sendFondoToFront(){
		console.log("fondo !")
		document.getElementById("fondo").style.zIndex = 17;
		document.getElementById("producto").style.display = "none";
	}

}



