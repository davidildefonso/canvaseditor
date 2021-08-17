class ImagenEditable{
  constructor(
		estado,
		contenedor,
		source, 
		tipo,  
		rotacion, 	
		transparencia, 
		rol, 
		canvas) 
	{
    this.estado = estado;
		this.container = contenedor;    
		this.source = source;
		this.tipe = tipo;
		//this.originalSize = originalSize;
		this.rotation = rotacion;
		this.editor = this.getContainerElement();
		this.transparency = transparencia;
		this.role = rol;
		this.canvas = canvas;
		this.position = this.getPosition();
		this.currentSize = this.getCurrentSize();
		this.image = this.generateImage()
  }

	getContainerElement(){
	console.log(this.container)
	console.log(document.querySelector(this.container))
		return document.querySelector(this.container)
	}

	getContainerRects(){
		return this.getContainerElement().getBoundingClientRect()
	}


	getPosition(){
	
			return {
				x: this.getContainerRects().x,
				y: this.getContainerRects().y
			}
		
		
	}

	
	getCurrentSize(){
	
			return {
				width: this.getContainerRects().width,
				height: this.getContainerRects().height
			}
	
		
	}

	generateImage(){
		const img = new Image;
		img.src = this.source;
		img.id = "fondo1img"
		img.width = this.currentSize.width;
		img.height = this.currentSize.height;
		return img
	
	}

	insertImage(){
		
		this.editor.appendChild(this.image);
	}

	removeImage(){	
	//	console.log(this.image.id)
		this.editor.removeChild(this.image)
	
	}


	empty(){
	
	this.estado = ""
		this.container = ""    
		this.source = ""
		this.tipe = ""
		//this.originalSize = originalSize;
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