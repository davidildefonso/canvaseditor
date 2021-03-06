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
			this.opacity =  1

			this.positions = [
				{left: "0px", top: "0px"},
				{left: this.size.width + "px", top:  "0px"},
				{left: this.size.width + "px", top: this.size.height  + "px"},
				{left:  "0px", top:  this.size.height + "px"}
			]

			
			this.element.onclick = (e) => {
			//	e.preventDefault()
				// console.log(this)
				// if(this.estado === "loaded"){
				// 	this.estado = "selected"
				// }
			}
			
			this.element.onmousedown = (e) => {
				console.log(this)
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
				console.log(this)
				e.preventDefault()
				this.setState("selected")
			}

			this.tools = []
	}


	

	generateTools(){	

		const style = `
			border-radius: 50%;
			width: 30px;
			height: 30px;
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
				handle.addEventListener("touchstart", this.startResizing)
			handle.addEventListener("touchmove", this.moveHandle)
			handle.addEventListener("touchend", this.endresizing)	
			handle.addEventListener("mousedown", this.startResizing)
			handle.addEventListener("mousemove", this.moveHandle)
			handle.addEventListener("mouseup", this.endresizing)
		
			this.container.appendChild(handle)	
			this.tools = this.tools.concat(handle)
			this.tools.push[handle]
		}
	}

	startResizing = (e) =>  {
		
		// console.log(this.editor)
		// 	console.log(this)
		// this.editor.images[1] = this
	
	
	
		//e.preventDefault()
		this.state = "resizing"
		this.handleid = e.target.id
	}

	endresizing = (e) =>  {	
		//e.preventDefault()
		this.state = "selected"	
		this.modified = true
	}

	moveHandle = (e) => {

		//e.preventDefault()
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
					
							this.size.width = (this.tools[2].getBoundingClientRect().x - this.tools[0].getBoundingClientRect().x)
							this.size.height = (this.tools[2].getBoundingClientRect().y - this.tools[0].getBoundingClientRect().y)

				}else if(this.handleid === "handle_3"){

							this.size.width =  this.size.width + this.position.x  - x 
							this.size.height = (y - this.position.y )
							this.position.x = x
				}		

				this.updateSize()
				this.updatePosition()
				this.updateToolsPosition()
		}
	
	}

	updateSize(){
		this.element.style.width = this.size.width + "px"
		this.element.style.height = this.size.height + "px"
	}

	addTransparency(){
		this.editor.images[1] = this
		
		this.opacity += 0.1

		this.element.style.opacity = this.opacity

		
	}

	reduceTransparency(){
		this.editor.images[1] = this
		this.opacity -= 0.1

		this.element.style.opacity = this.opacity

		
	}


	increaseSize(){
		this.editor.images[1] = this
	
		let prevWidth = this.size.width
		this.size.width += 15
		let ratio = this.size.width / prevWidth
		let newHeight = ratio * this.size.height
		

		this.size.height += 15
		this.element.style.width = this.size.width  + "px"
		this.element.style.height =  newHeight + "px" //this.size.height  + "px"
		this.updateToolsPosition()
	}


	reduceSize(){
		this.editor.images[1] = this
		

		let prevWidth = this.size.width
		this.size.width -= 15
		let ratio = this.size.width / prevWidth
		let newHeight = ratio * this.size.height

		this.size.height  = newHeight //-= 15
		this.element.style.width = this.size.width  + "px"
		this.element.style.height = this.size.height  + "px"
		this.updateToolsPosition()
	}


	rotate(){
		this.editor.images[1] = this

		this.rotacion += 5
		this.element.style.transform = "rotate(" + this.rotacion + "deg)"
	
		//this.updatePositionAfterRotation()
		//this.updateToolsAfterRotation({x: this.position.x, y: this.position.y, alpha: 5 * 2 *Math.PI /360})
		//transform", "rotate("+seg+"deg) scaleX("+tras+")")
	}

	rotateback(){
		this.editor.images[1] = this
		this.rotacion -= 5
		this.element.style.transform = "rotate(" + this.rotacion + "deg)"
	}

	setState(newState){
		this.state = newState
	} 

	move(e){	

	console.log(this)
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

	updatePositionAfterRotation(){
		let rectsnew = this.element.getBoundingClientRect()
		this.position = { x: rectsnew.left, y: rectsnew.top}
		this.size = { width: rectsnew.width, height: rectsnew.height}
	
	
	}

	updateToolsAfterRotation({x,y, alpha}){

		//change here

		console.log(x, y, alpha)
			this.positions = [
				{left: x + "px", top: y + "px" },
				{left: x +  this.size.width *0.1 + "px",
				 top:   y -  this.size.width*0.1 + "px"},
				{left:  x +  this.size.width * Math.cos(alpha) - this.size.height * Math.sin(alpha) + "px", 
				top:  y +  this.size.width * Math.sin(alpha) +  this.size.height * Math.cos(alpha) + "px"},
				{left: x -  this.size.height * Math.sin(alpha) + "px",
				 top:  y +  this.size.height * Math.cos(alpha) + "px"}
			]
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
	
		if(this.rol !== "producto" && this.role !== "producto"){
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

}

function startResize(e){

}

function resizing(e){
}

function endresizing(e){

}