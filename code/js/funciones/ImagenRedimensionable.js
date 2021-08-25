class ImagenRedimensionable extends ResizeableObject {
  constructor(
		estado,
		editor,  
		contenedor,
		tipo, 
		rol,
		source,
		originalSource,
		pos = null,
		size = null){

			super(
				estado,
				editor,  
				contenedor,
				tipo, 
				rol
			);
		
			this.newSize = size
			this.newPos = pos
			this.estado = estado
			this.rol = rol, 
			this.tipe = tipo;
			this.container = document.querySelector(contenedor)	;
			this.element =  null // this.getElement() 		
			this.source = source , 		
			this.originalSource = originalSource || source, 
			this.rotacion = 0,
			this.image =  null//this.generateImage()
			this.size =   this.getCurrentSize() 
			this.originalRects =   null // this.getRects(document.getElementById("producto"))
			this.drawRatio = {}
			this.transparencia = 1, 
			
			this.canvas = null; 
	
			
			this.modified = false
			this.position =  // pos//this.getPosition(this.getRects(this.element))
			this.originalPosition  = { x: this.position.x , y: this.position.y}
			
			
			

			



	
	}

	getElement(){

		return document.querySelector("#producto");
	}


	setEstado(newState){
		this.estado = newState
	}

	select(){
		if(this.estado !== "selected" && this.estado !== "moving"
			&& this.estado !== "crop" && this.estado !== "borrando"
		)
		

			this.estado = "selected"
			this.showResizeableImage()			
		
	}
	


	unselect(){	
			this.estado = "unselected"
			this.editor.estado = ""
			this.editor.tools = []
			this.removeTools()		
					
			
	}

	removeTools(){
		 this.editor.removeHandles(this.tools)		
		 this.tools = []
		 
	}	


	showResizeableImage(){	

		this.editor.addTool(this)	
		this.editor.estado = "editando producto"
		super.generateTools()
		
	}


	generateImage(){	
		const img = new Image	
	
		img.onload = () => {
	
			img.width = this.size.width;
			img.height =  this.size.height;
		}
		img.src = this.source
		img.id = this.rol	
		
		
		return img	
	}

	
	

	getRects(elm){

		return elm.getBoundingClientRect()
	}

	getSize(rects){
		return { width: rects.width, height: rects.height}
	}

	getPosition(rects){	
	//{ x: rects.x, y: rects.y}

		document.querySelector("#producto").onload = function(){
	
		}
		let x =  parseFloat(/\d+\.*\d*/.exec(this.element.style.left)[0])
		let y = parseFloat(/\d+\.*\d*/.exec(this.element.style.top)[0])

		return { x: x, y: y}
	}

  aumentar() {
		this.modified = true
    this.increaseSize()
  }	


	reducir() {
		this.modified = true
		this.reduceSize()
  }

	masTransparencia(){
		this.modified = true
    this.addTransparency()
	}

	menosTransparencia(){
		this.modified = true
    this.reduceTransparency()
	}

	rotar(){
		this.modified = true
		
		this.rotate()
		this.removeTools()
	}

	recortar(){
		this.modified = true

		if(this.estado === "selected"){	
		
			this.editor.tools = []
			this.editor.showCropBox()
			this.editor.hideFondo()	
			this.tools.forEach(t => {
				t.remove()
			});	
		
			this.estado = "crop"
			
		}else if(this.estado === "crop"){
			
		
			this.editor.drawProductoOnCanvas()
			//this.select()

	
		
			//this.editor.removeHandles(this.editor.tools[1].tools)		
		//	this.editor.tools[1].element.remove()
			this.editor.removeHandles(this.editor.tools[0].tools)		
			this.editor.tools[0].element.remove()
			this.editor.tools = [] 
			this.editor.estado = ""	
			this.estado = "loaded"
			this.tools = []
		
		

			//this.updatePosition()
			//this.updateToolsPosition()

		}	
	}

	rotarm(){
		this.modified = true
		this.removeTools()
		this.rotateback()
	
	}

	resetear(){	
		this.editor.reset()

	}


	guardarImagen(pos, size){

		var image = this.editor.canvas.toDataURL("image/png");
		this.editor.canvas.style.display = "none"
		this.editor.canvas  = null

		this.update(image, pos, size)


		//this.size =  size
		//this.position = pos
		//this.size.height = this.canvasSize.height

		//this.updateElementStyle()	
		
		//console.log(this)
		// this.position.x = this.canvasPosition.x
		// this.position.y = this.canvasPosition.y
		//console.log(this)
		// this.updatePosition()
		// this.updateSize()
		// this.updateToolsPosition()



		// this.element.src = image
		// this.element.style.display = ""
		


		//this.tools.forEach(t => t.style.display = "")

		this.estado = "selected"
		this.editor.estado = "editando producto"


	


	//	glassesCanvas.style.zIndex = 1;
	
		// GLASSES_SRC = image
		// document.querySelector(".bg_producto").style.backgroundImage =
		// 'url(' + FONDO_SRC + ')';

		// document.querySelector(".bg_producto").style.
		// backgroundPosition = "center"

		// document.querySelector(".bg_producto").style.
		// backgroundRepeat = "no-repeat"

		// document.querySelector(".bg_producto").style.
		// backgroundSize = "cover"

		
		// const imgElm = document.createElement("img")
		// imgElm.setAttribute("id", "imgtest")
		// document.body.appendChild(imgElm)
		// document.querySelector("#imgtest").src = GLASSES_SRC
		// document.getElementById("mi_imagen").src =  document.querySelector("#imgtest").src 
		// GLASSES_STATUS = "loaded"
		// document.querySelector("#imgtest").remove()
		// btnBorradorLentes.addEventListener("click", borrarLentes)
		// btnBorradorLentes.removeEventListener("click", guardarImagenLentes )
		// document.querySelector(".resize-container").style.display = "block"
	}


	borrar(){

		this.element.style.display = "none"
		this.tools.forEach(t => t.style.display = "none")

		this.estado = "borrando"
		this.editor.estado = "borrando producto"

	

		this.editor.createCanvas()
		this.editor.showCanvas()
		this.editor.drawImageBorrar(this)

		this.isPress = false;
		this.old = null;

	


		this.editor.canvas.addEventListener('touchstart',  (e) => {
				e.preventDefault();
				this.isPress = true;
				this.old = {x: e.offsetX, y: e.offsetY};
				
		});

		this.editor.canvas.addEventListener('touchmove',  (e) => {
			e.preventDefault();
			if (this.isPress) {
				var x = e.offsetX;
				var y = e.offsetY;
		
				let ctx = this.editor.canvas.getContext('2d')
				ctx.globalCompositeOperation = 'destination-out';
				ctx.beginPath();		
				ctx.arc(x, y, 10, 0, 2 * Math.PI);
				ctx.fill();
				ctx.lineWidth = 20;
				ctx.beginPath();
				ctx.moveTo(this.old.x, this.old.y);
				ctx.lineTo(x, y);
				ctx.stroke();
				this.old = {x: x, y: y};
			}
			// const circularCursor = document.getElementById("circularcursor")
			// circularCursor.style.zIndex = 1;

			// circularCursor.style.left =  e.pageX
			// +"px";
			// circularCursor.style.top = e.pageY  +"px";
			// glassesCanvas.classList.add("hide-cursor")


		});

		this.editor.canvas.addEventListener('touchend',  (e) => 	{
			e.preventDefault();
			this.isPress = false;
		
		});

		
		this.editor.canvas.addEventListener('mousedown',  (e) => {
	
				this.isPress = true;
				this.old = {x: e.offsetX, y: e.offsetY};
				
		});

		this.editor.canvas.addEventListener('mousemove',  (e) => {
		
			if (this.isPress) {
				var x = e.offsetX;
				var y = e.offsetY;
		
				let ctx = this.editor.canvas.getContext('2d')
				ctx.globalCompositeOperation = 'destination-out';
				ctx.beginPath();		
				ctx.arc(x, y, 10, 0, 2 * Math.PI);
				ctx.fill();
				ctx.lineWidth = 20;
				ctx.beginPath();
				ctx.moveTo(this.old.x, this.old.y);
				ctx.lineTo(x, y);
				ctx.stroke();
				this.old = {x: x, y: y};
			}
			// const circularCursor = document.getElementById("circularcursor")
			// circularCursor.style.zIndex = 1;

			// circularCursor.style.left =  e.pageX
			// +"px";
			// circularCursor.style.top = e.pageY  +"px";
			// glassesCanvas.classList.add("hide-cursor")


		});

		this.editor.canvas.addEventListener('mouseup',  (e) => 	{
			this.isPress = false;
		
		});

	}


	changeColor(color){
		this.color = color;
		this.updateColor()
	}


	update(src, pos, size){
		let  prod  = new ImagenRedimensionable("", editor, ".producto", "jpg", "producto", src, "rg/img/20/102012111004.jpg", pos, size)

	}


	updateColor(){
		this.element.style.color = this.color
	
	}



	getCurrentSize(){

		if(this.rol === "producto"){

			if(this.tipe !== "svg"){
					this.image = this.generateImage()
					this.image.onload  = () => {
						let rects = this.getContainerRects()
						let hRatio = rects.width / this.image.naturalWidth    
						let vRatio = rects.height / this.image.naturalHeight  
						let ratio  = Math.min(vRatio, hRatio)


						if(!this.newSize){
							this.size = { width : this.image.naturalWidth * ratio, height: this.image.naturalHeight * ratio }

						}else{
							this.size = this.newSize
						}
						
						if(!this.newPos){
							  this.position = { x : (rects.width - this.size.width)/2 , y: (rects.height - this.size.height)/2 }

						}else{
							this.position = this.newPos
						}


						this.positions = [
							{left: this.position.x +   "px", 
								top:  this.position.y +   "px"},
							{left: this.size.width +  this.position.x +"px",
							top: this.position.y  + "0px"},
							{left:  this.size.width +  this.position.x +"px",
							top:  this.position.y + this.size.height   + "px"},
							{left: this.position.x +  "px", 
							top:   this.position.y + this.size.height    + "px"}
						]
						

						this.createElement()
					//	this.updatePosition()
						this.editor.addImage(this)

					

						this.element.onclick = (e) => {
						
								e.preventDefault()
								this.select()


						}

						this.element.onmousedown = (e) => {
						
							e.preventDefault()
							this.removeTools()
				
							if(this.estado === "selected" && this.editor.estado === "editando producto"){
								this.estado = "start_moving"
							}			
							this.element.style.position = "absolute"
							this.element.style.objectFit = ""

						}

						this.element.onmousemove = (e) => {
						
							e.preventDefault()
							if(this.estado === "start_moving"){
								this.estado = "moving"
								
							} 

							if(this.estado === "moving"){
								
								this.move(e)

							}		
																	
						}

						this.element.onmouseup = (e) => {
					
							e.preventDefault()
							if(this.estado === "moving"){
								this.estado = "selected"
								this.modified = true

							}
						}



							
							
			}
			
		}

		
			
		
		}		


		//	return { width : rects.width, height: rects.height }
	}




	getContainerRects(){
		return this.container.getBoundingClientRect()
	}


	createElement(){

		this.image.width = this.size.width
		this.image.height = this.size.height
		this.element = this.image
		this.updateElementStyle()
		//return this.element
	}

	updateElementStyle(){
		this.element.style.width = this.size.width + "px"
		this.element.style.position = "absolute"
		this.element.style.height = this.size.height + "px"
		this.element.style.top = this.position.y + "px"
		this.element.style.left = this.position.x + "px"
	

	}



}