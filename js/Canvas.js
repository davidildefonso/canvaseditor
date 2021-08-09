class Canvas{
  constructor(width, height) {
    this.height = height;
    this.width = width;
		this.canvas = this.setCanvas(witdh,height)

  }

	setCanvas(w,h){
		let canvas = document.createElement("canvas")
		canvas.width = w;
		canvas.height = h
		return canvas
	}

	getCanvas(){
		return this.canvas
	}

}

