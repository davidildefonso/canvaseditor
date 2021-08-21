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
			this.position = this.getPosition(this.getRects(this.element)),  
			this.size = this.getSize(this.getRects(this.element))
			this.transparencia = 1, 
			this.rol = rol, 
			this.canvas = null; 
			this.estado = estado
			this.state= null;
			this.image = this.generateImage()
			this.role = "producto";
			this.modified = false
			

			this.element.onclick = (e) => {
				e.preventDefault()
			//	this.select()
				
			
			}
			
			this.element.onmousedown = (e) => {
				e.preventDefault()
				this.removeTools()
				if(this.estado === "selected"){
						this.estado = "start_moving"
				}			
				this.element.style.position = "absolute"
				
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
				{left: this.position.x - this.getRects(this.container).x +   "0px", 
					top:  this.position.y - this.getRects(this.container).y  + "0px"},
				{left: this.size.width +  this.position.x - this.getRects(this.container).x +"px",
				 top: this.position.y -  this.getRects(this.container).y  + "0px"},
				{left: this.size.width + this.position.x -this.getRects(this.container).x  + "px",
				 top: this.size.height  +  this.position.y - this.getRects(this.container).y + "px"},
				{left: this.position.x -  this.getRects(this.container).x +  "0px", 
				top:  this.size.height + this.position.y  - this.getRects(this.container).y + "px"}
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
		console.log(this.positions)
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
		return { x: rects.x, y: rects.y}
	}

  increaseSize() {
    
  }


	reduceSize() {
    
  }

	rotate() {
    
  }

	crop() {
    
  }

	erase() {
    
  }

	reset() {
    
  }




}