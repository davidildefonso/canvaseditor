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
			this.position =   { x: 0, y: 0 } 
			this.size = this.getSize(size)
			this.element = this.generateElement()
			this.opacity =  1

			this.positions = [
				{left: "0px", top: "0px"},
				{left: this.size.width + "px", top:  "0px"},
				{left: this.size.width + "px", top: this.size.height  + "px"},
				{left:  "0px", top:  this.size.height + "px"}
			]

			
			//this.element.onclick = (e) => {
			//	e.preventDefault()
				// console.log(this)
				// if(this.estado === "loaded"){
				// 	this.estado = "selected"
				// }
			//}


			const  touchmove = (e) => {				
				e.preventDefault()
				if(this.state === "start_moving"){
					this.state = "moving"
					return
				} 

				if(this.state === "moving"){
					this.move(e)
				}	
			}

			const touchend = (e) => {
				this.setState("selected")
			}

			const  touchstart = (e) => {	
				this.setState("start_moving")
			}
			
			this.element.addEventListener("touchstart", touchstart)
			this.element.addEventListener("touchmove", touchmove)
			this.element.addEventListener("touchend", touchend)
		
			this.element.onmousedown = (e) => {
		
			//	e.preventDefault()
				this.setState("start_moving")
			}

			this.element.onmousemove = (e) => {
	
			//		e.preventDefault()
					if(this.state === "start_moving"){
					
						this.state = "moving"
						return
					} 

					if(this.state === "moving"){
						this.move(e)
					}												
			}

			this.element.onmouseup = (e) => {
			
		//		e.preventDefault()
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


		this.updateToolsPosition()
	
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
		e.preventDefault()

		let eventX, eventY
		if(e.type === "touchmove"){
			eventX = e.touches[0].clientX
			eventY = e.touches[0].clientY
		}else{
			eventY = e.clientY
			eventX = e.clientX
		}

		if(this.state === "resizing"){
			
			let handleWidth = /\d+/.exec(e.target.style.width)[0]
			let handleHeight = /\d+/.exec(e.target.style.height)[0]
			
			let offsetWidth =  handleWidth /2
			let offsetHeight = handleHeight /2 
			
			let newPosX = eventX - this.container.getBoundingClientRect().x 
			let newPosY = eventY - this.container.getBoundingClientRect().y
			
			if(this.handleid === "handle_0"){					

					this.tools[0].style.left = eventX - this.container.getBoundingClientRect().x + "px"
					this.tools[0].style.top = eventY - this.container.getBoundingClientRect().y  + "px"		

					this.resizeCropBox(newPosX, newPosY) 
								
			}else 	if(this.handleid === "handle_1"){
			
					this.tools[1].style.left = eventX - this.container.getBoundingClientRect().x + "px"
					this.tools[1].style.top = eventY - this.container.getBoundingClientRect().y  + "px"			

					this.resizeCropBox(newPosX, newPosY) 
								
			}else 	if(this.handleid === "handle_2"){
			
					this.tools[2].style.left = eventX - this.container.getBoundingClientRect().x + "px"
					this.tools[2].style.top = eventY - this.container.getBoundingClientRect().y  + "px"			

					this.resizeCropBox(newPosX, newPosY) 
								
			}else 	if(this.handleid === "handle_3"){		

					this.tools[3].style.left = eventX - this.container.getBoundingClientRect().x + "px"
					this.tools[3].style.top = eventY	 - this.container.getBoundingClientRect().y  + "px"								

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

		let eventX, eventY
		if(e.type === "touchmove"){
			eventX = e.touches[0].clientX
			eventY = e.touches[0].clientY
		}else{
			eventY = e.clientY
			eventX = e.clientX
		}

		

		let offsetWidth = this.size.width /2
		let offsetHeight = this.size.height /2 


	//	this.position.x = eventX - this.container.getBoundingClientRect().x  - offsetWidth
	//	this.position.y = eventY - this.container.getBoundingClientRect().y - offsetHeight
		
		//this.updatePosition()


		let containerWidth = this.container.getBoundingClientRect().width
		
		let containerHeight = this.container.getBoundingClientRect().height 

		let containerX = this.container.getBoundingClientRect().x
		let containerY = this.container.getBoundingClientRect().y


	
		let borderTop = eventY - containerY - offsetHeight
		let borderLeft =  eventX - containerX - offsetWidth
		let borderBottom = containerY + containerHeight - eventY - offsetHeight
		let borderRight = containerX + containerWidth - eventX - offsetWidth

		
		this.border = { 
				top: eventY - containerY - offsetHeight, 
				right:  eventX - containerX - offsetWidth,
				bottom: containerY + containerHeight - eventY - offsetHeight,
				left: containerX + containerWidth - eventX - offsetWidth }


console.log(this.border)


		this.element.style.borderWidth = "" + borderTop + "px " + borderRight + "px "
			+ borderBottom + "px " + borderLeft + "px"

		this.element.style.borderColor = "rgba(0, 0, 0, 0.5)"


		this.element.style.borderStyle = " solid"		






		this.element.style.top = 0 + "px" //this.position.y + "px"
		this.element.style.left = 0 + "px" // this.position.x + "px"



		this.updateToolsPosition()
	
		if(this.rol === "producto"){	
			this.editor.images[1] = this
		}
	}

	updatePosition(){

				

		let containerWidth = this.container.getBoundingClientRect().width
		
		let containerHeight = this.container.getBoundingClientRect().height 

	
		let borderTop = this.position.y
		let borderLeft = this.position.x
		let borderBottom = containerHeight - (this.position.y + this.size.height)
		let borderRight = containerWidth - (this.position.x + this.size.width)
		

					this.element.style.borderWidth = "" + borderTop + "px " + borderRight + "px "
						+ borderBottom + "px " + borderLeft + "px"

					this.element.style.borderColor = "rgba(0, 0, 0, 0.5)"


					this.element.style.borderStyle = " solid"		






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

console.log(this.border)
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

		
		

		let containerWidth = this.container.getBoundingClientRect().width
		
		let containerHeight = this.container.getBoundingClientRect().height 

		this.position.x = containerWidth * 0.25
		this.position.y = containerHeight * 0.25
		this.size.width = containerWidth * 0.5
		this.size.height = containerHeight * 0.5


		let borderTop = this.position.y
		let borderLeft = this.position.x
		let borderBottom = containerHeight - (this.position.y + this.size.height)
		let borderRight = containerWidth - (this.position.x + this.size.width)




		if(this.rol !== "producto" && this.role !== "producto"){
					const div = document.createElement("div")
					div.style.position = "absolute"
					div.style.width = this.size.width + "px"
					div.style.height = this.size.height + "px"
					div.style.top = this.position.y
					div.style.left = this.position.x		
				
			//		div.style.border = "2px solid #fff"}
			// CREAR SHADOW CON BORDER

					div.style.borderWidth = "" + borderTop + "px " + borderRight + "px "
						+ borderBottom + "px " + borderLeft + "px"

					div.style.borderColor = "rgba(0, 0, 0, 0.5)"


					div.style.borderStyle = " solid"		

					div.style.background = "transparent"
					div.setAttribute("id","cropbox")
					div.style.zIndex = 20

					return div	
		
		}

	}

}

