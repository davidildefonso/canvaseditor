class ImagenEditable{
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
		) 
	{
    this.estado = estado;    
		this.source = source;
		this.tipo = tipo;
		this.container = this.getContainerElement(contenedor); 
		this.rotation = rotacion;
		this.editor = editor;
		this.transparency = transparencia;
		this.role = rol;
		this.canvas = canvas;
		this.image = this.generateImage()
		this.currentSize = this.getCurrentSize();
		this.drawRatio = {}
		this.originalsource = originalsource		
		this.position = {}
  }
	

	getContainerElement(cont){
		return document.querySelector(cont)
	}

	getContainerRects(){
		return this.container.getBoundingClientRect()
	}




	
	getCurrentSize(){
			let rects =  this.getContainerRects()		

			if(this.role === "producto"){
	
				this.image.onload  = () => {
					let rects = this.getContainerRects()
					let hRatio = rects.width / this.image.naturalWidth    
					let vRatio = rects.height / this.image.naturalHeight  
					let ratio  = Math.min(vRatio, hRatio)
				
					this.currentSize = { width : this.image.naturalWidth * ratio, height: this.image.naturalHeight * ratio }

					this.position = { x : (rects.width - this.currentSize.width)/2 , y: (rects.height - this.currentSize.height)/2 }
					this.generateElement()
					this.updatePosition()
					
				}
				
			
			}		


			return { width : rects.width, height: rects.height }
	}


	updatePosition(){
		this.element.style.top = this.position.y + "px"
		this.element.style.left = this.position.x + "px"
		this.element.style.position = "absolute"
		
	}

	generateElement(){
		this.image.width = this.currentSize.width
		this.image.height = this.currentSize.height
		this.element = this.image
		return this.element
	}

	generateImage(){
		const img = new Image;
		img.src = this.source;
	
		
		img.id = this.role

		//img.width = this.currentSize.width;
		//img.height = this.currentSize.height;
		return img
	
	}

	insertImage(){
		if(this.editor.estado === ""){
			this.editor.images[this.role] = {
				role : "fondo",
				img:  this.generateImage("fondo")
			}			
		}else{
			console.log("editor dibujando en canvas")
		}		
	}

	removeImage(){		
		if(this.editor.estado === ""){
			this.editor.container.removeChild(this.image)
		}else{
			console.log("editor dibujando en canvas")
		}	
	}


	empty(){	
		this.estado = ""
		this.container = ""    
		this.source = ""
		this.tipe = ""
		this.rotation = ""
		this.editor = ""
		this.transparency = ""
		this.role = ""
		this.canvas = ""
		this.position = ""
		this.currentSize = ""
		this.image = ""
	
	}
 
	loadToEditor() {

  }

	eraseFromEditor(){
	
	}

	changeTransparency(){
	
	}



}