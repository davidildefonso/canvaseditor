class Imagen{
  constructor(imgDomElemContainer){
		this.originalImgSrc = setOriginalImgSrc(imgDomElemContainer)
   
  }

	setOriginalImgSrc(elem){
		orig_src = new Image()
		orig_src.src=elem.src;
		this.originalImgSrc = orig_src;
	}

}

