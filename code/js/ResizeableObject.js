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
			this.position =   { x: 0, y: 0 } //this.getPosition() 
			this.size = this.getSize(size)
			this.element = this.generateElement()

			this.positions = [
				{left: "0px", top: "0px"},
				{left: this.size.width + "px", top:  "0px"},
				{left: this.size.width + "px", top: this.size.height  + "px"},
				{left:  "0px", top:  this.size.height + "px"}
			]

			
			this.element.onclick = (e) => {
				e.preventDefault()
				this.setState("selected")
			}
			
			this.element.onmousedown = (e) => {
				e.preventDefault()
				this.setState("start_moving")
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
			}

			this.tools = []
	}


	

	generateTools(){	
		const style = `
			border-radius: 50%;
			width: 10px;
			height: 10px;
			background: #fff;
			opacity: 1;
			position: absolute;
			z-index: 21;
			transform: translate(-50%,-50%);
		`

	
		for(let i = 0; i <= 3; i++){
			let handle = document.createElement("span")
			handle.setAttribute("id", "handle_" + i)
			handle.setAttribute("style", style)
			handle.style.left = this.positions[i].left
			handle.style.top = this.positions[i].top		
			handle.addEventListener("mousedown", this.startResizing)
			handle.addEventListener("mousemove", this.moveHandle)
			handle.addEventListener("mouseup", this.endresizing)
			this.container.appendChild(handle)	
			this.tools = this.tools.concat(handle)
			this.tools.push[handle]
		}
	}

	startResizing = (e) =>  {
		e.preventDefault()
		this.state = "resizing"
		this.handleid = e.target.id
	}

	endresizing = (e) =>  {	
		e.preventDefault()
		this.state = "selected"	
		this.modified = true
	}

	moveHandle = (e) => {
		e.preventDefault()
		if(this.state === "resizing"){
			let handleWidth = /\d+/.exec(e.target.style.width)[0]
			let handleHeight = /\d+/.exec(e.target.style.height)[0]
			
			let offsetWidth =  handleWidth /2
			let offsetHeight = handleHeight /2 

	
			let newPosX = e.clientX - this.container.getBoundingClientRect().x 
			let newPosY = e.clientY - this.container.getBoundingClientRect().y
			
			if(this.handleid === "handle_0"){					

					this.tools[0].style.left = e.clientX - this.container.getBoundingClientRect().x + "px"
					this.tools[0].style.top = e.clientY - this.container.getBoundingClientRect().y  + "px"		

					this.resizeCropBox(newPosX, newPosY) 
								
			}else 	if(this.handleid === "handle_1"){
			
					this.tools[1].style.left = e.clientX - this.container.getBoundingClientRect().x + "px"
					this.tools[1].style.top = e.clientY - this.container.getBoundingClientRect().y  + "px"			

					this.resizeCropBox(newPosX, newPosY) 
								
			}else 	if(this.handleid === "handle_2"){
			
					this.tools[2].style.left = e.clientX - this.container.getBoundingClientRect().x + "px"
					this.tools[2].style.top = e.clientY - this.container.getBoundingClientRect().y  + "px"			

					this.resizeCropBox(newPosX, newPosY) 
								
			}else 	if(this.handleid === "handle_3"){		

					this.tools[3].style.left = e.clientX - this.container.getBoundingClientRect().x + "px"
					this.tools[3].style.top = e.clientY - this.container.getBoundingClientRect().y  + "px"								

					this.resizeCropBox(newPosX, newPosY) 
								
			}
		}
	}

	resizeCropBox(x, y){
		if(this.state === "resizing"){

				if(this.handleid === "handle_0"){
							this.size.width =  this.size.width + this.position.x  - x 
							this.size.height = this.size.height +  this.position.y - y
							this.position.x = x
							this.position.y= y						
						

				}else if(this.handleid === "handle_1"){

								this.size.width = (x - this.position.x)
								this.size.height =  this.position.y +	this.size.height - y
								this.position.y= y				


				}else if(this.handleid === "handle_2"){
							
							this.size.width = (x - this.position.x)
							this.size.height = (y - this.position.y )

				}else if(this.handleid === "handle_3"){

							this.size.width =  this.size.width + this.position.x  - x 
							this.size.height = (y - this.position.y )
							this.position.x = x
				}		

				this.updateSize()
				this.updatePosition()
				this.updateToolsPosition()
		}
	console.log(this)
	}

	updateSize(){
		this.element.style.width = this.size.width + "px"
		this.element.style.height = this.size.height + "px"
	}

	setState(newState){
		this.state = newState
	} 

	move(e){	
		let offsetWidth = this.size.width /2
		let offsetHeight = this.size.height /2 
		this.position.x = e.clientX - this.container.getBoundingClientRect().x  - offsetWidth
		this.position.y = e.clientY - this.container.getBoundingClientRect().y - offsetHeight
		
		this.updatePosition()

	

		this.updateToolsPosition()

	
		if(this.rol === "producto"){
	
			this.editor.images[1] = this
	
		}
		
	}

	updatePosition(){
		this.element.style.top = this.position.y + "px"
		this.element.style.left = this.position.x + "px"
	}

	updateToolsPosition(){
			this.positions = [
				{left: this.position.x + "px", top:  this.position.y + "0px"},
				{left: this.position.x +this.size.width + "px", top: this.position.y + "0px"},
				{left:this.size.width + this.position.x + "px", top: this.size.height + this.position.y + "px"},
				{left: this.position.x + "0px", top: this.position.y + this.size.height + "px"}
			]

			for(let i = 0; i<= 3; i++){
				if(this.tools[i]){
						this.tools[i].style.left = this.positions[i].left
						this.tools[i].style.top = this.positions[i].top	
				}
			
									
			}
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

function startResize(e){

}

function resizing(e){
}

function endresizing(e){

}