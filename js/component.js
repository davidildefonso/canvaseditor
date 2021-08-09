let GLASSES_STATUS = ""
let FONDO_STATUS = ""
let GLASSES_SRC = ""
let FONDO_SRC = ""
let FONDO_RECTS

if(window.location.protocol == 'file:'){
  alert('To test this demo properly please use a local server such as XAMPP or WAMP. See README.md for more details.');
}

// localStorage.setItem("glassesStatus", "")
// localStorage.setItem("fondoStatus", "")
// localStorage.setItem("glassesSrc", "")
// localStorage.setItem("src", "")


var  para_rotar_w;
var  para_rotar_h;
var seg=0;
var tras=1;

var resizeableImage = function(image_target, src) {
  // Some variable and settings

  var $container,
      orig_src = new Image(),
      image_target = $(image_target).get(0),
      
      event_state = {},
      constrain = false,
      min_width = 60, // Change as required
      min_height = 60,
      max_width = 2500, // Change as required
      max_height = 2500,
      resize_canvas = document.createElement('canvas');
     

  init = function(){
     para_rotar_w=image_target.clientWidth;
     para_rotar_h=image_target.clientHeight;
   
    // When resizing, we will always use this copy of the original as the base
	
	/*	if(!src){
			orig_src.src=image_target.src;
		}else{
			orig_src.src = src;
		}*/
    orig_src.src=image_target.src;

    // Wrap the image with the container and add resize handles
    $(image_target).wrap('<div class="resize-container"></div>')
   
    .before('<span class="resize-handle resize-handle-nw"></span>')
    .before('<span class="resize-handle resize-handle-ne"></span>')
    .after('<span class="resize-handle resize-handle-se"></span>')
    .after('<span class="resize-handle resize-handle-sw"></span>')
    .after('<span class="resize-handle resize-handle-sw"></span>');

    // Assign the container to a variable
    $container =  $(image_target).parent('.resize-container');

    // Add events
    $container.on('mousedown touchstart', '.resize-handle', startResize);
    $container.on('mousedown touchstart', 'img', startMoving);
    $('.js-crop').on('click', crop);
  };

  startResize = function(e){	
		GLASSES_STATUS = "resizing"
		orig_src.src = GLASSES_SRC
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on('mousemove touchmove', resizing);
    $(document).on('mouseup touchend', endResize);
  };

  endResize = function(e){
		GLASSES_STATUS = "loaded"	
    e.preventDefault();
    $(document).off('mouseup touchend', endResize);
    $(document).off('mousemove touchmove', resizing);
		GLASSES_SRC  = $("#mi_imagen")[0].src 
		orig_src.src = GLASSES_SRC
  };

  saveEventState = function(e){
    // Save the initial event details and container state
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
	if(typeof e.originalEvent.touches !== 'undefined'){
		event_state.touches = [];
		$.each(e.originalEvent.touches, function(i, ob){
		  event_state.touches[i] = {};
		  event_state.touches[i].clientX = 0+ ob.clientX;
		  event_state.touches[i].clientY = 0+ ob.clientY;
		});
	}
    event_state.evnt = e;
  };

  resizing = function(e){
    var mouse= {}, width, height, left, top, offset=$container.offset();
    mouse.x = (e.clientX || e.pageX || 
			e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
    mouse.y = (e.clientY || e.pageY || 
			e.originalEvent.touches[0].clientY) + $(window).scrollTop();
    
    // Position image differently depending on the corner dragged and constraints
    if( $(event_state.evnt.target).hasClass('resize-handle-se') ){
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
  
  resizeImage = function(width, height){
    resize_canvas.width = width;
    resize_canvas.height = height;
    resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height); 
		
		$(image_target).attr('src', resize_canvas.toDataURL("image/png")); 
	//	localStorage.setItem("glassesSrc", $('#mi_imagen').src )
		
   
  };

  startMoving = function(e){
		GLASSES_STATUS = "moving"	
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    $(document).on('mousemove touchmove', moving);
    $(document).on('mouseup touchend', endMoving);
  };

  endMoving = function(e){
		GLASSES_STATUS = "loaded"	
    e.preventDefault();
    $(document).off('mouseup touchend', endMoving);
    $(document).off('mousemove touchmove', moving);
  };

  moving = function(e){
		GLASSES_STATUS = "moving"
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
    // Watch for pinch zoom gesture while moving
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
       
      // To improve performance you might limit how often resizeImage() is called
      resizeImage(width, height);
    }
  };

  crop = function(){
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

  rotar=function(){
   /*  width = $('.overlay').width(),
    height = $('.overlay').height(); */
    seg++;
 /*  resize_canvas.getContext('2d').clearRect(0, 0, para_rotar_w, para_rotar_h);
    resize_canvas.getContext('2d').rotate(Math.PI/180);
    resize_canvas.getContext('2d').drawImage(orig_src,-orig_src.width/2,-orig_src.height/2, para_rotar_w, para_rotar_h); 
    $(image_target).attr('src', resize_canvas.toDataURL("image/png"));   */
    $('.resize-image')
			.css("-moz-transform", "rotate("+seg+"deg) scaleX("+tras+")")
			.css("-o-transform", "rotate("+seg+"deg) scaleX("+tras+")")
			.css("-webkit-transform", "rotate("+seg+"deg) scaleX("+tras+")")
			.css("transform", "rotate("+seg+"deg) scaleX("+tras+")")
			.css("filter", "rotate("+seg+"deg) scaleX("+tras+")")
  }
  rotarm=function(){     
     seg--;
     $('.resize-image')
		 .css("-moz-transform", "rotate("+seg+"deg) scaleX("+tras+")")
     .css("-o-transform", "rotate("+seg+"deg) scaleX("+tras+")")
     .css("-webkit-transform", "rotate("+seg+"deg) scaleX("+tras+")")
     .css("transform", "rotate("+seg+"deg) scaleX("+tras+")")
     .css("filter", "rotate("+seg+"deg) scaleX("+tras+")")
   }
   borrar=function(){
	 GLASSES_STATUS = ""
  $('.resize-container').remove();
   }
/*    cancelar=function(){
    $('#mi_imagen').imgAreaSelect().cancelSelection()
   } */

   invetirm180=function(){
     tras=-1;
    $('.resize-image').css("-moz-transform", "rotate("+seg+"deg) scaleX("+tras+")")
    .css("-o-transform", "rotate("+seg+"deg) scaleX("+tras+")")
    .css("-webkit-transform", "rotate("+seg+"deg) scaleX("+tras+")")
    .css("transform", "rotate("+seg+"deg) scaleX("+tras+")")
    .css("filter", "rotate("+seg+"deg) scaleX("+tras+")")
    }
    invetir180=function(){
        tras=1;
      $('.resize-image').css("-moz-transform", "rotate("+seg+"deg) scaleX("+tras+")")
      .css("-o-transform", "rotate("+seg+"deg) scaleX("+tras+")")
      .css("-webkit-transform", "rotate("+seg+"deg) scaleX("+tras+")")
      .css("transform", "rotate("+seg+"deg) scaleX("+tras+")")
      .css("filter", "rotate("+seg+"deg) scaleX("+tras+")")
    }

    aumentar = function(e){ 
        para_rotar_w=para_rotar_w+15;
        para_rotar_h=para_rotar_h+15;
        w=para_rotar_w;
        h=para_rotar_h;
        resizeImage(w, h);          
    }

    reducir = function(e){
        para_rotar_w=para_rotar_w-15;
        para_rotar_h=para_rotar_h-15;
        w=para_rotar_w;
        h=para_rotar_h;
    	  resizeImage(w, h);     
  }  
  init();
};

function fondo(){  
  $('#foto').click();                     
}

if($("#foto").length != 0) {
  function archivo(evt) {
      var foto = evt.target.files; // FileList object
      // Obtenemos la imagen del campo "file".
      for (var i = 0, f; f = foto[i]; i++) {
          //Solo admitimos imágenes.
          if (!f.type.match('image.*')) {
              continue;
          }
          var reader = new FileReader();
          reader.onload = (function (theFile) {
              return function (e) {
							FONDO_SRC = e.target.result
							//localStorage.setItem("src",e.target.result)
							FONDO_STATUS = "loaded"
							//localStorage.setItem("fondoStatus", "loaded")
                  // Insertamos la imagen
                /*   console.log(foto); */
            /*       $(".img-fluid").attr("src",e.target.result); */
            $(".img-fluid").css("display",'none')
              $(".component").css("background-image", "url(' "+ e.target.result + "')  ") 
              $("#foto").val('');
              };
          })(f);
          reader.readAsDataURL(f);
      }
  }

  document.getElementById('foto').addEventListener('change', archivo, true);
	FONDO_RECTS = document.querySelector(".component").getBoundingClientRect()
}

function borrar_fondo(){
  $(".img-fluid").css("display",'')
  $(".component").removeAttr( 'style' );
  if($(".resize-container").length != 0) {
    $('.resize-container').remove();
	}	
	FONDO_STATUS = ""
	GLASSES_STATUS = ""
	FONDO_STATUS = ""
  GLASSES_SRC = ""
	FONDO_SRC = ""
	FONDO_RECTS = null
}

$('.imgcontent').on('click',function(e){
  if($('.img-fluid').css("display")!="none"){
    alert("debe subir una imagen primero")	
  }else{
	  $('.select-item').removeClass('select-item')	
    $(this).addClass('select-item');	
		let srcDataUrl = getBase64Image(e.target.src)

    if($(".resize-container").length !== 0) {
      $('.resize-container').remove();
      $('#contimgall').append('<img class="resize-image img-mont" id="mi_imagen" src="" >')
      $('#mi_imagen').attr('src',srcDataUrl)
    }else if($("#mi_imagen").length != 0 ){
      $('#contimgall').append('<img class="resize-image img-mont" id="mi_imagen" src="" >')
      $('#mi_imagen').attr('src',srcDataUrl)
    }else{
      $('#mi_imagen').attr('src',srcDataUrl)
    }
		GLASSES_SRC =srcDataUrl
		GLASSES_STATUS = "loaded"
    resizeableImage($('#mi_imagen'), GLASSES_SRC);
	}
})

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

const btnBorrarEditar = document.getElementById("btn_borrar_editar")

btnBorrarEditar.addEventListener("click",() => {
	if(FONDO_SRC !== ""){
		let btnContenedor = 	document.getElementById("contenedor_borrador")
		btnContenedor.classList.toggle("hide")
		if(btnContenedor.classList.contains("hide")){
			btnBorrarEditar.style.background = "transparent"
		}else{
			btnBorrarEditar.style.background = "#17a2b8"
		}
	}	
})


