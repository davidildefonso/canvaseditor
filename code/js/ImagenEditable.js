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
		this.position = this.getPosition();
		this.currentSize = this.getCurrentSize();
		this.image = this.generateImage()
		this.drawRatio = {}
		this.originalsource = originalsource		
  }
	

	getContainerElement(cont){
		return document.querySelector(cont)
	}

	getContainerRects(){
		return this.container.getBoundingClientRect()
	}


	getPosition(){	
			let rects =  this.getContainerRects()		
			let parentRects = this.container.parentElement.getBoundingClientRect()
			return { x : rects.x - parentRects.x , y: rects.y - parentRects.y }
	}

	
	getCurrentSize(){
			let rects =  this.getContainerRects()		
			return { width : rects.width, height: rects.height }
	}

	generateImage(id  = "image"){
		const img = new Image;
		img.src = this.source;
		img.id = id
		img.width = this.currentSize.width;
		img.height = this.currentSize.height;
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
			this.editor.containerremoveChild(this.image)
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