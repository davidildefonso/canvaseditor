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
		this.productos = []
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
		if(editor.estado === ""){
				editorCanvas.width = this.currentSize.width
				editorCanvas.height = this.currentSize.height
				editorCanvas.style.display = "";
			//	editorCanvas.style.display = "none";
		}else if(editor.estado === "crop"){
	
				if(this.tools.length === 1){
					editorCanvas.width = this.currentSize.width / this.images[0].drawRatio.ratio
					editorCanvas.height = this.currentSize.height / this.images[0].drawRatio.ratio
					editorCanvas.style.display = "";
				}else if(this.tools.length === 2){
						this.getDrawRatio(this.tools[0])
							console.log(this)
						editorCanvas.width = this.currentSize.width / this.tools[0].drawRatio.ratio
						editorCanvas.height = this.currentSize.height / this.tools[0].drawRatio.ratio
						editorCanvas.style.background = "red"
						editorCanvas.style.display = "";
						console.log(editorCanvas)
				
				}
	
		}	else if(editor.estado === "borrando producto"){
		console.log("auqi")
		console.log(this.tools[0])
				editorCanvas.width = this.tools[0].size.width
				editorCanvas.height = this.tools[0].size.height
				editorCanvas.style.zIndex = 16
				editorCanvas.style.display = "";
				editorCanvas.style.background ="transparent"
		}			
		editorCanvas.style.position = "absolute";		

		if(editor.estado === "borrando producto"){
				editorCanvas.style.left = 0 + "px";
		}else{
				editorCanvas.style.left = this.position.x + "px";
		}

	
		this.canvas = editorCanvas
	}


	showCanvas(){
		if(editor.estado === "borrando producto"){
			this.container.appendChild(this.canvas)
		
		}else{
			document.body.appendChild(this.canvas)
		}
		
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

					let hRatio   
					let vRatio 
					let ratio  
					let centerShift_x
					let centerShift_y
		
					if(currentRole === "producto"){

						if(!images[i].modified){
							 hRatio = canvas.width / currentImg.naturalWidth    
							 vRatio = canvas.height / currentImg.naturalHeight  
							 ratio  = Math.min(vRatio, hRatio)

							 centerShift_x = ( canvas.width - currentImg.naturalWidth*ratio ) / 2;
							 centerShift_y = ( canvas.height - currentImg.naturalHeight *ratio ) / 2;						
					

							ctx.drawImage(
								currentImg,
							 	0, 0, currentImg.naturalWidth, currentImg.naturalHeight ,
								centerShift_x, centerShift_y, currentImg.naturalWidth * ratio , currentImg.naturalHeight * ratio
							);
						
						
						}else{
							
								let imgScaledPositionX = images[i].position.x
								let imgScaledPositionY = images[i].position.y
								let imgScaledWidth = images[i].size.width
								let imgScaledHeight = images[i].size.height
								
								let imgRealWidth= images[i].image.naturalWidth
								let imgRealHeight= images[i].image.naturalHeight		

								let imgPortionWidth
								let imgPortionHeight			

								let realPortionWidth  
								let realPortionHeight 

								let canvasXstart
								let canvasYstart	
								let realXstart
								let realYstart

								hRatio = imgScaledWidth / currentImg.naturalWidth    
							 	vRatio = imgScaledHeight / currentImg.naturalHeight  
							 	ratio  = Math.min(vRatio, hRatio)

								if(imgScaledPositionY >= 0 && imgScaledPositionX < 0){

									if(imgScaledPositionY + imgScaledHeight <= canvas.height){
										imgPortionHeight = imgScaledHeight
										imgPortionWidth = imgScaledWidth + imgScaledPositionX
										canvasXstart = 0
										canvasYstart = imgScaledPositionY
										realPortionWidth = imgRealWidth * imgPortionWidth / imgScaledWidth
										realPortionHeight = imgRealHeight * imgPortionHeight / imgScaledHeight
										realXstart = imgRealWidth - realPortionWidth
										realYstart = imgRealHeight -	realPortionHeight

									}else if(imgScaledPositionY + imgScaledHeight > canvas.height){
										imgPortionHeight = canvas.height-   imgScaledPositionY 
										imgPortionWidth = imgScaledWidth + imgScaledPositionX
										canvasXstart = 0
										canvasYstart = imgScaledPositionY
										realPortionWidth = imgRealWidth * imgPortionWidth / imgScaledWidth
										realPortionHeight = imgRealHeight * imgPortionHeight / imgScaledHeight
										realXstart = -1 * imgScaledPositionX / ratio 
										realYstart = 0


									}

								}else if(imgScaledPositionY < 0 && imgScaledPositionX < 0){
										imgPortionHeight = imgScaledWidth +    imgScaledPositionY 
										imgPortionWidth = imgScaledWidth + imgScaledPositionX
										canvasXstart = 0
										canvasYstart = 0
										realPortionWidth = imgRealWidth * imgPortionWidth / imgScaledWidth
										realPortionHeight = imgRealHeight * imgPortionHeight / imgScaledHeight
										realXstart = -1 * imgScaledPositionX / ratio 
										realYstart = -1 * imgScaledPositionY / ratio 
								
								}else if(imgScaledPositionY < 0 && imgScaledPositionX >= 0){

										if(imgScaledPositionX + imgScaledWidth <= canvas.width){
												imgPortionHeight = imgScaledHeight + imgScaledPositionY
												imgPortionWidth = imgScaledWidth 
												canvasXstart = imgScaledPositionX
												canvasYstart = 0
												realPortionWidth = imgRealWidth * imgPortionWidth / imgScaledWidth
												realPortionHeight = imgRealHeight * imgPortionHeight / imgScaledHeight
												realXstart = 0
												realYstart = imgRealHeight -imgPortionHeight	/ ratio 

										}else if(imgScaledPositionX + imgScaledWidth  > canvas.height){
											imgPortionHeight = imgScaledHeight + imgScaledPositionY
											imgPortionWidth = imgScaledWidth - imgScaledPositionX
											canvasXstart = imgScaledPositionX
											canvasYstart = 0
											realPortionWidth = imgRealWidth * imgPortionWidth / imgScaledWidth
											realPortionHeight = imgRealHeight * imgPortionHeight / imgScaledHeight
											realXstart = 0
											realYstart = imgRealHeight -imgPortionHeight	/ ratio 


										}

								}else if(imgScaledPositionY >= 0 && imgScaledPositionX >= 0){

										if(imgScaledPositionX + imgScaledWidth > canvas.width										
											&& imgScaledPositionY + imgScaledHeight <= canvas.height){
												imgPortionHeight = imgScaledHeight 
												imgPortionWidth = canvas.width - imgScaledPositionX 
												canvasXstart = imgScaledPositionX
												canvasYstart = imgScaledPositionY
												realPortionWidth = imgRealWidth * imgPortionWidth / imgScaledWidth
												realPortionHeight = imgRealHeight * imgPortionHeight / imgScaledHeight
												realXstart = 0
												realYstart = 0

										}else if(imgScaledPositionX + imgScaledWidth > canvas.width										
											&& imgScaledPositionY + imgScaledHeight > canvas.height){
											imgPortionHeight = canvas.height -  imgScaledPositionY
											imgPortionWidth = canvas.width - imgScaledPositionX 
											canvasXstart = imgScaledPositionX
											canvasYstart = imgScaledPositionY
											realPortionWidth = imgRealWidth * imgPortionWidth / imgScaledWidth
											realPortionHeight = imgRealHeight * imgPortionHeight / imgScaledHeight
											realXstart = 0
											realYstart = 0


										}else if(imgScaledPositionX + imgScaledWidth <= canvas.width										
											&& imgScaledPositionY + imgScaledHeight > canvas.height){
											imgPortionHeight = canvas.height -  imgScaledPositionY
											imgPortionWidth = imgScaledWidth 
											canvasXstart = imgScaledPositionX
											canvasYstart = imgScaledPositionY
											realPortionWidth = imgRealWidth * imgPortionWidth / imgScaledWidth
											realPortionHeight = imgRealHeight * imgPortionHeight / imgScaledHeight
											realXstart = 0
											realYstart = 0


										}else if(imgScaledPositionX + imgScaledWidth <= canvas.width										
											&& imgScaledPositionY + imgScaledHeight <= canvas.height){
											imgPortionHeight = imgScaledHeight
											imgPortionWidth = imgScaledWidth 
											canvasXstart = imgScaledPositionX
											canvasYstart = imgScaledPositionY
											realPortionWidth = imgRealWidth * imgPortionWidth / imgScaledWidth
											realPortionHeight = imgRealHeight * imgPortionHeight / imgScaledHeight
											realXstart = 0
											realYstart = 0


										}

								}
				

								ctx.drawImage(
										images[i].element,
										realXstart,
										realYstart, 
										realPortionWidth ,
										realPortionHeight,
										canvasXstart, 
										canvasYstart,
										imgPortionWidth, 
										imgPortionHeight
								);
						
						}						

			

					
					}else if(currentRole === "fondo") {	

							 hRatio = canvas.width / currentImg.naturalWidth    
							 vRatio = canvas.height / currentImg.naturalHeight  
							 ratio  = Math.min(vRatio, hRatio)

							 centerShift_x = ( canvas.width - currentImg.naturalWidth*ratio ) / 2;
							 centerShift_y = ( canvas.height - currentImg.naturalHeight *ratio ) / 2;

							canvas.width = this.currentSize.width
							canvas.height = this.currentSize.height
							ctx.fillStyle = "black";
							ctx.fillRect(0, 0, canvas.width, canvas.height);
							ctx.drawImage(
								images[i].element,
								centerShift_x, centerShift_y, images[i].element.width, images[i].element.height	 )


					}else if(currentRole === "logo") {	


					  currentContainer = images[i].container;
					  currentRects = currentContainer.getBoundingClientRect()

				
			
							ctx.drawImage(
								currentImg,
								0, 0, currentImg.naturalWidth, currentImg.naturalHeight,
							currentRects.x - this.position.x,	 currentRects.y - this.position.y,	 currentRects.width, 	 currentRects.height
							)
					}					
			}
		}	

	}


	drawImageBorrar(img){
	
		let context = this.canvas.getContext('2d')	
		context.drawImage(img.element, 0,0, img.element.naturalWidth, img.element.naturalHeight,
			0,0,this.canvas.width, this.canvas.height);
}




	drawFondoOnCanvas(){
			this.createCanvas();
			this.showCanvas()
			this.drawCropImage(this.canvas, this.images[0],this.tools[0])
		
	}

	drawProductoOnCanvas(){
			this.createCanvas();
			this.showCanvas()
			console.log(this)
			this.drawCropProducto(this.canvas, this.tools[0],this.tools[1])
		
	}

		drawCropProducto(canvas, img, cropbox){			
		 	console.log(canvas, img, cropbox)
		 	let ctx = canvas.getContext("2d")
		 	ctx.fillStyle = "black";
		 	ctx.fillRect(0, 0, canvas.width, canvas.height);

		 	var centerShift_x = ( canvas.width - img.image.naturalWidth ) /2 //* img.drawRatio.ratio / 2;
		 	var centerShift_y = ( canvas.height - img.image.naturalHeight ) /2 //* img.drawRatio.ratio / 2;						
						
		
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

		 	// ctx.drawImage(
		 	// 	img.image,
		 	// 	Math.abs(cropbox.position.x - img.centerShift_x )/ img.drawRatio.ratio, Math.abs(cropbox.position.y - img.centerShift_y )/ img.drawRatio.ratio, imgWidth,  imgHeight,
		 	// 	0,0,canvas.width, canvas.height	)	

				 
		 	ctx.drawImage(
		 		img.image,
				imgX,
				imgY,
				imgWidth, 
				Math.abs(centerShift_y - (cropbox.position.y + cropbox.size.height) / img.drawRatio.ratio),						
				centerShift_x,
				centerShift_y,
				imgWidth,
				Math.abs(centerShift_y - (cropbox.position.y + cropbox.size.height) / img.drawRatio.ratio)
			)	

console.log(cropbox.position)
console.log( centerShift_x )
console.log(centerShift_y )
console.log(img.drawRatio)
console.log(Math.abs(centerShift_y - (cropbox.position.y + cropbox.size.height) / img.drawRatio.ratio))

		console.log(
		 		img.image,
		 		Math.abs(cropbox.position.x - centerShift_x )/ img.drawRatio.ratio, 
				 Math.abs(cropbox.position.y - centerShift_y )/ img.drawRatio.ratio,
				  imgWidth,  
					centerShift_y - cropbox.position.y / img.drawRatio.ratio,
		 		0,0,canvas.width, canvas.height	)	


		// /* ESTO NO ESCALA LA IMAGEN AL EDITOR SINO QUE SE MANTIENE EN EL TAMAÑO CORTADO */
		// 	// ctx.drawImage(
		// 	// img.image,
		// 	// (cropbox.position.x - img.centerShift_x )/ img.drawRatio.ratio, (cropbox.position.y - img.centerShift_y )/ img.drawRatio.ratio, imgWidth,  imgHeight,
		// 	// centerShift_x + (cropbox.position.x )/ img.drawRatio.ratio, centerShift_y +  (cropbox.position.y )/ img.drawRatio.ratio, imgWidth, imgHeight)		
			console.log(canvas)
			console.log(this)
			this.generateDataImage()
		 

		// 	this.updateFondo(dataUrl, this.images[0].originalsource)
		// 	this.removeCropBox()
		 	this.canvas.remove()
		 	this.canvas = null	
		
	}


	generateDataImage(){
		console.log(this)
		
		this.updateProducto(this.canvas.toDataURL(), this.images[1].originalsource)
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

		console.log(this)

		this.updateFondo(dataUrl, this.images[0].originalsource)
		this.removeCropBox()
		this.canvas.remove()
		this.canvas = null	
		
	}

	removeCropBox(){
	
		this.sendFondoToBack()		
		this.removeHandles(this.tools[0].tools)		
		this.tools[0].element.remove()
		this.tools = [] 
		this.estado = ""	
		
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
		
		this.canvas.remove()
		this.canvas = null
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

	updateProducto(dataurl, originalSource){			
			console.log(dataurl)
			console.log(this)
		//	this.images[1].element.src = dataurl
			const newprod = new ImagenEditable("",editor,"." + editor.container.className, dataurl , "jpg",0, 0, "producto" ,null, originalSource )
			this.removeImage("producto")			
			this.addImage(newprod)
	}


	addImage(imagen_editable){
console.log(imagen_editable)
		if(imagen_editable.role === "fondo"){
			this.estado	= "loading fondo"
			this.generateFondoElement(imagen_editable)
		}else if(imagen_editable.role === "producto"){
		
			this.images[1] = imagen_editable
			this.insertImage(imagen_editable)

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

	getDrawRatio(imgRes){
		let ratioWidth = this.currentSize.width / imgRes.image.naturalWidth
		let ratioHeight = this.currentSize.height / imgRes.image.naturalHeight

		if(ratioWidth < ratioHeight){				
			imgRes.drawRatio.ratio = ratioWidth
			imgRes.drawRatio.side = "height"
		}else{
			imgRes.drawRatio.ratio = ratioHeight
			imgRes.drawRatio.side = "width"
		}
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
		}else if(img.role === "producto"){
			img.container.appendChild(img.generateElement());
		}	
		else{
		
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
		}	else if(role === "producto"){
			console.log("remove")
			this.images[1].empty
			this.images[1] = ""
			document.getElementById("producto").remove()
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
		this.images = [];
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
		console.log(this)

		this.addTool(cb)	
		if(this.tools.length === 1){
			this.container.appendChild(this.tools[0].element)	
			this.tools[0].generateTools()
		}else if(this.tools.length === 2){
			this.container.appendChild(this.tools[1].element)	
			this.tools[1].generateTools()
		}
		// this.container.appendChild(this.tools[0].element)	
		// this.tools[0].generateTools()
		
		
	}

	showCropBox(){
		this.createCropBox()
	}

	sendFondoToFront(){
		document.getElementById("fondo").style.zIndex = 17;
		document.getElementById("producto").style.display = "none";
	}

	hideFondo(){
		console.log("gola")
		console.log(this)
		if(document.getElementById("fondo")){
			document.getElementById("fondo").style.display = "none";
		}
		

	}

	

	sendFondoToBack(){
		
		document.getElementById("producto").style.display = "";
		this.estado = ""
	
	}


	

}



