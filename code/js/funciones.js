function getBase64Image(src){    
	var canvas = document.createElement("canvas")     
	ctx = canvas.getContext("2d"),
	img = new Image();
	img.src = src
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);	
	var dataUrl = canvas.toDataURL("image/png");
	return dataUrl 
}


const resizeableBox = function(){
	let $container,			
	event_state = {},
	constrain = false,
	min_width = 60, 
	min_height = 60,
	max_width = 2500, 
	max_height = 2500,
	resize_canvas = document.createElement('canvas');
	
  function init(){		

		
		const box = document.createElement("div")
		box.setAttribute("id", "crop-container")
		

		
		const spanNW = document.createElement("span")
		spanNW.setAttribute("class", "resize-handle resize-handle-nw")
		
		const spanNE = document.createElement("span")
		spanNE.setAttribute("class", "resize-handle resize-handle-ne")
		
		const spanSE = document.createElement("span")
		spanSE.setAttribute("class", "resize-handle resize-handle-se")
		
		const spanSW = document.createElement("span")
		spanSW.setAttribute("class", "resize-handle resize-handle-sw")
		
		
		const boxContainer = document.createElement("div")
		boxContainer.style.width = "200px"
		boxContainer.style.height = "200px"
		boxContainer.style.zIndex = 15
		boxContainer.style.border = "2px red solid"
		boxContainer.style.position = "absolute"
		
		boxContainer.setAttribute("id", "cropboxContainer")
		boxContainer
			.append(spanNW,spanNE, box, spanSE, spanSW)

		document.querySelector(".bg_producto")
			.append(boxContainer)

		const resizeHandles = document.querySelectorAll(".resize-handle")
		resizeHandles.forEach(rh => rh.addEventListener("mousedown", startResize))
    
		//box.addEventListener('mousedown touchstart', '.resize-handle', startResize);
   	
		 boxContainer.addEventListener('mousedown',  startMoving);
    
		//$('.js-crop').on('click', crop);
	};

  function startResize(e){	
		console.log("click")
		FONDO_STATUS = "crop"
		//orig_src.src = GLASSES_SRC
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on('mousemove touchmove', resizing);
    $(document).on('mouseup touchend', endResize);
  };

  function endResize(e){
		FONDO_STATUS = "loaded"	
    e.preventDefault();
    $(document).off('mouseup touchend', endResize);
    $(document).off('mousemove touchmove', resizing);
		 
		//orig_src.src = GLASSES_SRC
  };

  function saveEventState(e){    
		$container = $(document.getElementById("cropboxContainer"))
    event_state.container_width = $container.width();
    event_state.container_height = $container.height();
    event_state.container_left = $container.offset().left; 
    event_state.container_top = $container.offset().top;
    event_state.mouse_x = (e.clientX || e.pageX || 
			e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
    event_state.mouse_y = (e.clientY || e.pageY || 
			e.originalEvent.touches[0].clientY) + $(window).scrollTop();
	
	// This is a fix for mobile safari
	// For some reason it does not allow a direct copy of the touches property
		// if(typeof e.originalEvent.touches !== 'undefined'){
		// 	event_state.touches = [];
		// 	$.each(e.originalEvent.touches, function(i, ob){
		// 		event_state.touches[i] = {};
		// 		event_state.touches[i].clientX = 0+ ob.clientX;
		// 		event_state.touches[i].clientY = 0+ ob.clientY;
		// 	});
		// }
    event_state.evnt = e;
  };

   function resizing(e){
	 
	 	$container = $(document.getElementById("cropboxContainer"))
   
	 	//console.log($container)
	  var mouse= {}, width, height, left, top, offset=$container.offset();
    mouse.x = (e.clientX || e.pageX || 
			e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
    mouse.y = (e.clientY || e.pageY || 
			e.originalEvent.touches[0].clientY) + $(window).scrollTop();
    
    // Position image differently depending on the corner dragged and constraints
    if( $(event_state.evnt.target).hasClass('resize-handle-se') ){
		//console.log("aqiu")
      width = mouse.x - event_state.container_left;
      height = mouse.y  - event_state.container_top;
      left = event_state.container_left;
      top = event_state.container_top;
    } else if($(event_state.evnt.target).hasClass('resize-handle-sw') ){
      width = event_state.container_width - (mouse.x - event_state.container_left);
      height = mouse.y  - event_state.container_top;
      left = mouse.x;
      top = event_state.container_top;
    } else if($(event_state.evnt.target).hasClass('resize-handle-nw') ){
      width = event_state.container_width - (mouse.x - event_state.container_left);
      height = event_state.container_height - (mouse.y - event_state.container_top);
      left = mouse.x;
      top = mouse.y;
      if(constrain || e.shiftKey){
        top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
      }
    } else if($(event_state.evnt.target).hasClass('resize-handle-ne') ){
      width = mouse.x - event_state.container_left;
      height = event_state.container_height - (mouse.y - event_state.container_top);
      left = event_state.container_left;
      top = mouse.y;
      if(constrain || e.shiftKey){
        top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
      }
    }
	
    // Optionally maintain aspect ratio
    if(constrain || e.shiftKey){
      height = width / orig_src.width * orig_src.height;
    }

    if(width > min_width && height > min_height &&
			 width < max_width && height < max_height){
      // To improve performance you might limit how often resizeImage() is called
      
      para_rotar_w=width;
      para_rotar_h=height;
      
			
			resizeImage(width, height);  
      
      // Without this Firefox will not re-calculate the the image dimensions until drag end
      $container.offset({'left': left, 'top': top});
    }
  }
  
  function resizeImage(width, height){
			document.getElementById("cropboxContainer").style.width = width + "px"
			document.getElementById("cropboxContainer").style.height = height + "px"
		// orig_src.src = ORIGINAL_SRC
		// resize_canvas.width = width;
    // resize_canvas.height = height;
    // resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height); 
		// //$(image_target).attr('src', GLASSES_SRC); 
	
		
   
  };

  function startMoving(e){
			console.log("click")
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on('mousemove touchmove', moving);
    $(document).on('mouseup touchend', endMoving);
  };

  function endMoving(e){
			
    e.preventDefault();
    $(document).off('mouseup touchend', endMoving);
    $(document).off('mousemove touchmove', moving);
  };

  function moving(e){
		
    var  mouse={}, touches;
    e.preventDefault();
    e.stopPropagation();    
    touches = e.originalEvent.touches;    
    mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft(); 
    mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
    $container.offset({
      'left': mouse.x - ( event_state.mouse_x - event_state.container_left ),
      'top': mouse.y - ( event_state.mouse_y - event_state.container_top ) 
    });
    
    if(event_state.touches && event_state.touches.length > 1 && touches.length > 1){
      var width = event_state.container_width, height = event_state.container_height;
      var a = event_state.touches[0].clientX - event_state.touches[1].clientX;
      a = a * a; 
      var b = event_state.touches[0].clientY - event_state.touches[1].clientY;
      b = b * b; 
      var dist1 = Math.sqrt( a + b );
      
      a = e.originalEvent.touches[0].clientX - touches[1].clientX;
      a = a * a; 
      b = e.originalEvent.touches[0].clientY - touches[1].clientY;
      b = b * b; 
      var dist2 = Math.sqrt( a + b );

      var ratio = dist2 /dist1;

      width = width * ratio;
      height = height * ratio;
       
    
      //resizeImage(width, height);
    }
  };

  function crop(){
		//resizeableImage($('.overlay'))
    //Find the part of the image that is inside the crop box
    var crop_canvas,
        left = $('.overlay').offset().left - $container.offset().left,
        top =  $('.overlay').offset().top - $container.offset().top,
        width = $('.overlay').width() *2,
        height = $('.overlay').height()*2;
		
    crop_canvas = document.createElement('canvas');
    crop_canvas.width = width;
    crop_canvas.height = height;
    
    crop_canvas.getContext('2d').drawImage(image_target, left, top, width, height, 0, 0, width, height);

		src = crop_canvas.toDataURL();
		 $('#mi_imagen').attr("src",src);
	    //window.open(crop_canvas.toDataURL());
  }

  
   function borrar(){
			//if(GLASSES_STATUS !== "loaded") return
			//if(FONDO_STATUS !== "loaded") return

	 		//GLASSES_STATUS = ""
  		$('.resize-container').remove();
   }
     
  init();
};