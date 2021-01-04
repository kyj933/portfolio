
$(function() { 
var nav = $('nav');
var line = $('<div />').addClass('line');

line.appendTo(nav);

var active = nav.find('.active');
var pos = 0;
var wid = 0;

if(active.length) {
  pos = active.position().left;
  wid = active.width();
  line.css({
    left: pos,
    width: wid
  });
}

nav.find('ul li a').click(function(e) {
  e.preventDefault();
  if(!$(this).parent().hasClass('active') && !nav.hasClass('animate')) {
    
    nav.addClass('animate');

    var _this = $(this);
	var _thispt = $(this).parent();
	var _thisptIndex = _thispt.index();
	
	var _target = $(".page").eq(_thisptIndex).offset().top;
	  
	$("html, body").animate({"scrollTop" : _target});
	
	switch(_thisptIndex) { 
		case 0 : 
			break;
		case 1 : 
			$(document).find(".bar-fill").addClass("on");
			break;
	}  
	  

    nav.find('ul li').removeClass('active');

    var position = _this.parent().position();
    var width = _this.parent().width();

    if(position.left >= pos) {
      line.animate({
        width: ((position.left - pos) + width)
      }, 300, function() {
        line.animate({
          width: width,
          left: position.left
        }, 150, function() {
          nav.removeClass('animate');
        });
        _this.parent().addClass('active');
      });
    } else {
      line.animate({
        left: position.left,
        width: ((pos - position.left) + wid)
      }, 300, function() {
        line.animate({
          width: width
        }, 150, function() {
          nav.removeClass('animate');
        });
        _this.parent().addClass('active');
      });
    }

    pos = position.left;
    wid = width;
  }
});
});


$(window).scroll(function(){
	//var zz = $(window).height();
	
	var sec2Offset = $(".porfile").offset().top;
	
	var winscTop = $(window).scrollTop();
	console.log(winscTop);
	if(winscTop > sec2Offset - 700){
		$(".bar-fill").addClass("on");
		
	}
});




var lypop = function(e, _this) { 
   e.preventDefault();
   var _this = $(_this);
   var _thisDataNum = _this.attr("data-num");
   console.log(_thisDataNum);
   var _origin = $(document).find("#lypop");
   
   
   _origin.addClass("on");
   $('body').css('overflow','hidden');
   
   _origin.find(".lypopcont .simg img").attr("src", "img/detailview0" + _thisDataNum +".jpg");
   
   
};

var lypopClose = function(e, _this) { 
   e.preventDefault();
   var _this = $(_this);
   var _origin = $(document).find("#lypop");      
   _origin.removeClass("on");
   $('body').removeAttr('style');      
};
//pop-up







