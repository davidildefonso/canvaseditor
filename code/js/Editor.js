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
		editorCanvas.width = this.currentSize.width / this.images[0].drawRatio.ratio
		editorCanvas.height = this.currentSize.height / this.images[0].drawRatio.ratio
		editorCanvas.style.position = "absolute";
		editorCanvas.style.display = "";
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
					

							ctx.drawImage(
								currentImg,
							 	0, 0, currentImg.naturalWidth, currentImg.naturalHeight ,
								centerShift_x, centerShift_y, currentImg.naturalWidth * ratio , currentImg.naturalHeight * ratio
							);

					
					}else if(currentRole === "fondo") {	
							ctx.drawImage(
								currentImg,
								0, 0, currentImg.naturalWidth, currentImg.naturalHeight,
								//images[i].position.x, images[i].position.y,  currentRects.width, currentRects.height
								0, 0,  currentRects.width, currentRects.height
							)

					}else if(currentRole === "logo") {		

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
		
	}

	drawCropImage(canvas, img, cropbox){			
		let ctx = canvas.getContext("2d")
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		var centerShift_x = ( canvas.width - img.image.naturalWidth ) / 2;
		var centerShift_y = ( canvas.height - img.image.naturalHeight ) / 2;						
					
	
		let imgX = cropbox.position.x / img.drawRatio.ratio
		let imgY = cropbox.position.y / img.drawRatio.ratio
		let imgWidth = cropbox.size.width / img.drawRatio.ratio
		let imgHeight = cropbox.size.height / img.drawRatio.ratio	

		let editorCanvasRatio = this.currentSize.width / this.currentSize.height
		let scaleWidth, scaleHeight	

		if(img.drawRatio.side === "height"){
				scaleHeight = canvas.height
				scaleWidth = canvas.height * editorCanvasRatio
				
		}else if(img.drawRatio.side === "width"){
				scaleWidth = canvas.width
				scaleHeight = canvas.width / editorCanvasRatio		
		}	
	
		canvas.width = imgWidth
		canvas.height = imgHeight

		ctx.drawImage(
			img.image,
			(cropbox.position.x - img.centerShift_x )/ img.drawRatio.ratio, (cropbox.position.y - img.centerShift_y )/ img.drawRatio.ratio, imgWidth,  imgHeight,
			0,0,canvas.width, canvas.height	)	

	/* ESTO NO ESCALA LA IMAGEN AL EDITOR SINO QUE SE MANTIENE EN EL TAMAÑO CORTADO */
		// ctx.drawImage(
		// img.image,
		// (cropbox.position.x - img.centerShift_x )/ img.drawRatio.ratio, (cropbox.position.y - img.centerShift_y )/ img.drawRatio.ratio, imgWidth,  imgHeight,
		// centerShift_x + (cropbox.position.x )/ img.drawRatio.ratio, centerShift_y +  (cropbox.position.y )/ img.drawRatio.ratio, imgWidth, imgHeight)		
		
		let dataUrl = this.convertDrawToDataUrl(canvas)
		this.updateFondo(dataUrl, this.images[0].originalsource)
		this.removeCropBox()
		
		
	}

	removeCropBox(){
	
		this.sendFondoToBack()		
		this.removeHandles(this.tools[0].tools)		
		this.tools[0].element.remove()
		this.tools = [] 
		this.estado = ""	
			console.log(editor)
	}	

	removeHandles(arr){
		arr.forEach(element => {
			element.remove()
		});
	}


	downloadImagesOnCanvas(){
		this.createCanvas();
		this.showCanvas()
		this.drawImages(this.canvas, this.images)
		let dataUrl =   this.convertDrawToDataUrl(this.canvas)
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


	convertDrawToDataUrl(canvas){
			return canvas.toDataURL("image/png");			
	}

	updateFondo(dataurl, originalsource){			
			const newfondo = new ImagenEditable("",editor,"." + editor.container.className, dataurl , "jpg",0, 1, "fondo" ,null, originalsource )
			editor.removeImage("fondo")			
			editor.addImage(newfondo)
	}


	addImage(imagen_editable){
		if(imagen_editable.role === "fondo"){
			this.estado	= "loading fondo"
			this.generateFondoElement(imagen_editable)
		}else if(imagen_editable.role === "producto"){
			this.images[1] = imagen_editable
		}else if(imagen_editable.role === "logo"){
			this.images[2] = imagen_editable
		}
	}

	generateImage(imagen_editable){	
		const img = new Image;
		img.src = imagen_editable.source
		img.id = imagen_editable.role	
		img.width = imagen_editable.currentSize.width;
		img.height =  imagen_editable.currentSize.height;
		return img	
	}

	generateFondoElement(imagen_editable){		
		const img = new Image;	
		img.onload = () => {		
				let ratioWidth = this.currentSize.width / imagen_editable.image.naturalWidth
				let ratioHeight = this.currentSize.height / imagen_editable.image.naturalHeight

				if(ratioWidth < ratioHeight){				
					imagen_editable.drawRatio.ratio = ratioWidth
					imagen_editable.drawRatio.side = "height"
				}else{
					imagen_editable.drawRatio.ratio = ratioHeight
					imagen_editable.drawRatio.side = "width"
				}

				let ratio = Math.min(ratioWidth, ratioHeight)
				img.width = imagen_editable.image.naturalWidth * ratio;
				img.height = imagen_editable.image.naturalHeight * ratio;
				
				let centerShift_x = ( this.currentSize.width - imagen_editable.image.naturalWidth * ratio ) / 2;
				let  centerShift_y = (this.currentSize.height - imagen_editable.image.naturalHeight * ratio ) / 2;

				imagen_editable.centerShift_x = centerShift_x
				imagen_editable.centerShift_y = centerShift_y

				img.width = imagen_editable.image.naturalWidth * ratio;
				img.height = imagen_editable.image.naturalHeight * ratio;
				
				imagen_editable.position.x = centerShift_x
				imagen_editable.position.y = centerShift_y

				img.style.position = "absolute";
				img.style.top = centerShift_y + "px"
				img.style.left = centerShift_x + "px"

				imagen_editable.element = img;

				this.images[0]  = imagen_editable
				this.insertFondo()
				this.estado = ""
				this.images[0].estado = "loaded"		
		};

		img.src = imagen_editable.source;
		img.id = imagen_editable.role
		
	}


	insertFondo(){
			this.container.appendChild(this.images[0].element);
	}


	insertImage(img){	
		if(img.role === "fondo"){
			img.container.appendChild(this.generateFondo(img));
		}else{
			img.container.appendChild(this.generateImage(img));
		}
		img.estado= "loaded"
	}


	removeImage(role){
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
		const cb = new ResizeableObject("unselected", this, { width: 200, height: 200})
		this.addTool(cb)	
		this.container.appendChild(this.tools[0].element)	
		this.tools[0].generateTools()
			console.log(this)
	}

	showCropBox(){
		this.createCropBox()
	}

	sendFondoToFront(){
		document.getElementById("fondo").style.zIndex = 17;
		document.getElementById("producto").style.display = "none";
	}

	sendFondoToBack(){
		
		document.getElementById("producto").style.display = "";
		this.estado = ""
	
	}

}



