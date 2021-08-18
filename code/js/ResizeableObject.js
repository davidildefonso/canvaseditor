class ResizeableObject  {
  constructor(
		estado,
		editor,  
		size
	)
	{
			this.state = estado
			this.editor = editor
			this.container =  this.getContainer()
			this.position =  this.getPosition() 
			this.size = this.getSize(size)
			this.element = this.generateElement()
			
			this.element.onclick = (e) => {
				e.preventDefault()
				this.setState("selected")
			}
			
			this.element.onmousedown = (e) => {
				e.preventDefault()
				this.setState("start_moving")
				console.log(this.state)
				console.log(this.editor)
			}

			this.element.onmousemove = (e) => {
					e.preventDefault()
					if(this.state === "start_moving"){
						this.state = "moving"
						return
					} 

					if(this.state === "moving"){
						this.move(e)
					}
								
					
			}



			this.element.onmouseup = (e) => {
				e.preventDefault()
				this.setState("selected")
				console.log(this.state)	
				console.log(this.editor)
			}

	}

	setState(newState){
		this.state = newState
	} 


	move(e){
		//console.log(this.container.getBoundingClientRect())
		let offsetWidth = this.size.width /2
		let offsetHeight = this.size.height /2 
		this.position.x = e.clientX - this.container.getBoundingClientRect().x  - offsetWidth
		this.position.y = e.clientY - this.container.getBoundingClientRect().y - offsetHeight
		this.updatePosition()

	}

	updatePosition(){
		this.element.style.top = this.position.y + "px"
		this.element.style.left = this.position.x + "px"
	}

	getContainer(){
		return this.editor.container
	}

	getPosition(){
		const rects = this.container.getBoundingClientRect()
		return { x: rects.x, y: rects.y }
	}

	getSize({width, height}){
		return { width, height}
	}


	generateElement(){
		const div = document.createElement("div")
		div.style.position = "absolute"
		div.style.width = this.size.width + "px"
		div.style.height = this.size.height + "px"
		div.style.top = this.position.y
		div.style.left = this.position.x
		div.style.border = "2px solid #fff"
		div.style.background = "transparent"
		div.setAttribute("id","cropbox")
		div.style.zIndex = 20

		
		return div	
	}

	




}





