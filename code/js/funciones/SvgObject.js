class SvgObject extends ResizeableObject {
  constructor(
		estado,
		editor,  
		contenedor,
		source,  
		tipo, 
		rotacion, 	
		transparencia,
		rol, 
		canvas,
		originalsource = ""
		
		){

			super(
				estado,
				editor,  
				contenedor,
				tipo, 
				rol
			);
			
			this.canvas = canvas
			this.tipe = tipo;
			this.container = contenedor	;
			this.element =  this.getElement()
			this.source = source	
			this.originalSource = originalsource 
			this.rotacion = rotacion,
			this.size = null // this.getSize(this.getRects(this.element))
			this.originalRects = null // this.getRects(document.getElementById("producto"))
			this.drawRatio = {}
			this.transparencia = transparencia		
			this.rol = rol,
			this.estado = estado
			this.editor = editor
		//	this.image = this.generateImage()
			this.modified = false
			this.position = null // this.getPosition(this.getRects(this.element))
			this.originalPosition  = null //  { x: this.position.x , y: this.position.y}

			

	
	}

	getElement(){

		
		fetch("../VD5062.svg")
		.then(response => {
			return response.text()
		})
		.then(data => {
			
			let producto_div = document.querySelector(this.container)
			producto_div.innerHTML += data
	
			this.container = producto_div
			let producto_svg = document.getElementById("producto")
		
//			producto_svg.style.width = "100%";
	//		producto_svg.style.display = "flex"
			producto_svg.style.position = "absolute"
			producto_svg.style.height = "auto"
			//producto_svg.style.pointerEvents = "none"

			this.element = producto_svg




			this.size =  this.getSize(this.getRects(this.element))
			this.originalRects = this.getRects(document.getElementById("producto"))
			// this.position =  { x : this.element.getBoundingClientRect().x - this.container.getBoundingClientRect().x,
			// 		y : this.element.getBoundingClientRect().y - this.container.getBoundingClientRect().y
			//  } //this.getPosition(this.getRects(this.element))


			this.originalSize = { width : this.element.width.baseVal.value, height: this.element.height.baseVal.value }

			this.ratioSvg = this.originalSize.width / this.originalSize.height

				let ratio

			if(this.ratioSvg > 1){
				ratio =   this.originalSize.width / this.editor.currentSize.width
				this.size.height = 0.5 * this.originalSize.height / ratio
				this.size.width = 0.5 * this.originalSize.width / ratio
			}else{
				ratio =   this.originalSize.height / this.editor.currentSize.height
				this.size.height = 0.5 * this.originalSize.height / ratio
				this.size.width = 0.5 * this.originalSize.width / ratio
			}


			let centerShift_y =  (this.editor.currentSize.height - this.size.height) /2
			let centerShift_x =  (this.editor.currentSize.width - this.size.width) /2

			this.position =  { x:  centerShift_x, y: centerShift_y}
			


			this.originalPosition  =   { x: this.position.x , y: this.position.y}



			this.element.style.width = this.size.width;
			this.element.style.height = this.size.height;

			this.element.style.top = this.position.y;
			this.element.style.left = this.position.x;
			

	//		producto_svg.style.display = "flex"

	





		
						const  touchmove = (e) => {				
							e.preventDefault()
							if(this.estado === "start_moving"){
								this.estado = "moving"
								return
							} 

							if(this.estado === "moving"){
								this.move(e)
							}	
						}

						const touchend = (e) => {
							
							if(this.estado === "moving"){
								this.estado = "selected"
								this.modified = true
								this.unselect()
							}

						}

						const  touchstart = (e) => {	
						
							this.removeTools()
				
							if(this.estado === "selected" && this.editor.estado === "editando producto"){
								this.estado = "start_moving"
							}			
							this.element.style.position = "absolute"
							this.element.style.objectFit = ""

						}
						
						this.element.addEventListener("touchstart", touchstart)
						this.element.addEventListener("touchmove", touchmove)
						this.element.addEventListener("touchend", touchend)
					

					// 	this.element.onmousedown = (e) => {
						
					// 	//	e.preventDefault()
					// 		this.setState("start_moving")
					// 	}

					// 	this.element.onmousemove = (e) => {

					// 	//		e.preventDefault()
					// 			if(this.state === "start_moving"){
					// 				this.state = "moving"
					// 				return
					// 			} 

					// 			if(this.state === "moving"){
					// 				this.move(e)
					// 			}												
					// 	}

					// 	this.element.onmouseup = (e) => {
						
					// //		e.preventDefault()
					// 		this.setState("selected")
					// 	}


//**///* */

						// this.element.onclick = (e) => {
						
						// 		e.preventDefault()
						// 		this.select()


						// }

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
								this.unselect()
								this.modified = true

							}
						}
		







			// this.element.onclick = (e) => {
			// 	e.preventDefault()
			// 	this.estado === "selected"
				
			
			// }
			
			// this.element.onmousedown = (e) => {
			// 	e.preventDefault()
			// 	this.removeTools()
			
			// 	if(this.estado === "selected"){
			// 			this.estado = "start_moving"
			// 	}			
			// 	this.element.style.position = "absolute"
			// 	this.element.style.objectFit = ""
				
			// }

			// this.element.onmousemove = (e) => {
			// 		e.preventDefault()
			// 		if(this.estado === "start_moving"){
			// 			this.estado = "moving"
						
			// 		} 

			// 		if(this.estado === "moving"){
			// 			this.move(e)
			// 		}		
															
			// }

			// this.element.onmouseup = (e) => {
			// 	e.preventDefault()
			// 	if(this.estado === "moving"){
			// 			this.estado = "selected"
			// 			this.modified = true
					
			// 	}
			// }







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



			
			
			this.editor.addImage(this)

				//	this.updatePosition()
					
			//container.style.background = "red"

			//this.element = document.getElementById("producto")
			// console.log(container)
			// container.innerHTML += `<div id="producto_wrap" ></div>`
			// document.getElementById("producto_wrap").innerHTML = data
			// let svgColorContainer = document.querySelector("defs style")
			// let colorText = svgColorContainer.textContent
			// console.log(colorText.trim())
			// let originalColor = /#.{6}/.exec(colorText.trim())[0]
			// console.log(originalColor)
			// console.log(productoFoto)
			// console.log(this)



			return producto_svg
		
		});


	//	return document.querySelector("#producto");
	}


	setEstado(newState){
		this.estado = newState
	}

	select(){

			this.setEstado("selected")		
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
		const img = new Image;
	
		img.src = this.source
		img.id = this.rol	
		img.width = this.size.width;
		img.height =  this.size.height;
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


		let x = rects.left// parseFloat(/\d+\.*\d*/.exec(this.element.style.left)[0])
		let y =  rects.top  //parseFloat(/\d+\.*\d*/.exec(this.element.style.top)[0])

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
	}

	recortar(){
		this.modified = true
	
		if(this.editor.estado === "editando producto"){	
			this.editor.estado = "crop"
			this.editor.showCropBox()
			this.editor.hideFondo()		
			
		}else if(this.editor.estado === "crop"){
		
			this.editor.drawProductoOnCanvas()
		}	
	}

	rotarm(){
		this.modified = true
		this.rotateback()
	}

	resetear(){	
		this.editor.reset()

	}


	guardarImagen(){
		var image = this.editor.canvas.toDataURL("image/png");
		this.editor.canvas.style.display = "none"
		this.editor.canvas  = null
	
		this.element.src = image
		this.element.style.display = ""
		
		this.tools.forEach(t => t.style.display = "")

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
	
		let path = this.element.querySelectorAll(".fil0")
		let arr = Array.from(path)
		arr.forEach(p =>p.style.fill = color)

	}


	updateColor(){
		this.element.style.color = this.color

	}

}