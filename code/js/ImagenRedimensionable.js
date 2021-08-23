class ImagenRedimensionable extends ResizeableObject {
  constructor(
		estado,
		editor,  
		contenedor,
		tipo, 
		rol){

			super(
				estado,
				editor,  
				contenedor,
				tipo, 
				rol
			);
			
			this.tipe = tipo;
			this.container = contenedor	;
			this.element = contenedor.querySelector("#producto");
			this.source = this.element.src , 		
			this.originalSource = this.source, 
			this.rotacion = 0,
			this.size = this.getSize(this.getRects(this.element))
			this.originalRects =this.getRects(document.getElementById("producto"))

		
			
	
			this.transparencia = 1, 
			this.rol = rol, 
			this.canvas = null; 
			this.estado = estado
			this.state= null;
			this.image = this.generateImage()
			this.role = "producto";
			this.modified = false
			this.position = this.getPosition(this.getRects(this.element))


			this.originalPosition  = { x: this.position.x , y: this.position.y}

			this.element.onclick = (e) => {
				e.preventDefault()
			//	this.select()
				
			
			}
			
			this.element.onmousedown = (e) => {
				e.preventDefault()
				this.removeTools()
				console.log(this)
				if(this.estado === "selected"){
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

		let x =  parseFloat(/\d+\.*\d*/.exec(this.element.style.left)[0])
		let y = parseFloat(/\d+\.*\d*/.exec(this.element.style.top)[0])
console.log(x, y)
		return { x: x, y: y}
	}

  aumentar() {
		
    this.increaseSize()
  }	


	reducir() {
		this.reduceSize()
  }

	rotar(){
		this.rotate()
	}

	resetear(){
		console.log(this)
		let newproducto = new ImagenRedimensionable("unselected",	editor,	document.querySelector(".producto"),	"jpg",	"producto")
		//this.reset()
		this.source = this.originalSource		
		this.rotacion = 0
		this.size = this.getSize(this.originalRects)
		this.transparencia = 1
		this.canvas = null
		this.estado = "unselected"
		this.state= null;
		this.image = this.generateImage()
		this.modified = false
		this.position = this.originalPosition
		console.log(this.image)
		this.image.style.top = this.position.y + "px"
		this.image.style.left = this.position.x +"px"
		this.image.style.position = "absolute"

		
		//this.element = contenedor.querySelector("#producto");
		this.element = this.image

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
	
		this.unselect()

		document.getElementById("producto").remove()
		this.container.appendChild(this.image)


	console.log(this)


	}
}