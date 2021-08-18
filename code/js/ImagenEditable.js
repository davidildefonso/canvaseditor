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
		canvas) 
	{
    this.estado = estado;
//		this.container = contenedor;    
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
		
  }

	

	getContainerElement(cont){
		console.log(cont)
		console.log(document.querySelector(cont))
		return document.querySelector(cont)
	}

	getContainerRects(){
		console.log(this.container.getBoundingClientRect())
		console.log(this.container.parentElement.getBoundingClientRect())

		return this.container.getBoundingClientRect()
	}


	getPosition(){	
			let rects =  this.getContainerRects()		
			let parentRects = this.container.parentElement.getBoundingClientRect()
			return { x : rects.x - parentRects.x , y: rects.y - parentRects.y }
	}

	
	getCurrentSize(){
			let rects =  this.getContainerRects()		
			console.log(rects)
			return { width : rects.width, height: rects.height }
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
		if(this.editor.estado === ""){
			this.editor.images[this.role] = {
				role : "fondo",
				img:  this.generateImage()
			}
			console.log(this.editor)
		}else{
			console.log("editor dibujando en canvas")
		}
		
	}

	removeImage(){	
	//	console.log(this.image.id)
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