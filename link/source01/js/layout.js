
$(function() { 
	var $eles = $("#absad > .vodka_set li");
	var eles = $eles.toArray();
	
	console.log(eles);
	var pt = [];
	var center = Math.floor(eles.length/2);
	
	var total = eles.length;
	var repeat = 1, count = 0, cont = 0;
	var playSlider = function(){
	  setCss();
	};
	
	var newArr = ["0", "1", "2"];
	
	function setCss(){
		
		
		eles.forEach(function(e,i){
			// e == 각 엘리먼트, i = 인덱스 순서
			

		pt[i] = $(e).css(['left','z-index', 'width', 'height', 'opacity']);
		//ptScale = ['1', '-=0.9', '-=0.8', '-=0.7', '-=0.6'];
		ptScale = ['1', '0.9', '0.8', '0.7', '0.6'];
			
		

	
			
		});
		
		/* 여기서는 i 는 1이다 */
		for(var i = 0 ; i < center ; i++){
			//eles.unshift(eles.pop());
			eles.forEach(function(e,i){
				count++;
				//$(e).css(pt[i]).removeClass('click').find('.txt').hide();
				
				
			});			
		}		
		
		
	}
	
	function movePanel(){
	  eles.forEach(function(e,i){
		$('.vo_box.lt .vodka_set > li').removeClass("on");
		  

		//console.log("각엘리먼트인덱스 ==", pt[i]);  
		
		//console.log("각엘리먼트 ==",$(e).index());  
		
		$(e).css('transform', 'scale(' + ptScale[i] + ')'); 
		$(e).stop().animate(pt[i],200,function(){
		  count++;
			//console.log($(e).css("z-index"));  
			
			if($(e).css("z-index") == 5) { 
				$(this).addClass("on");
				var zz = $(this).index();
				$('.vo_box.rt .stxt > li').removeClass("on");
				$('.vo_box.rt .stxt > li').eq(zz).addClass("on");
				
			}
	  			
		});		  
		//console.log($(e).attr('style'));   
	  });
	}
	
	
	
	function autoMove() { 
		if(cont < 4){
				cont++;
				
			}else{
			  cont = 0;
			}
		console.log(cont);
		
	  	nextFn();
	}
	
	// left_btn
	$('.left_btn').on('click',function(){
		
		
		
		if(cont > 0){
			cont--;
		
		}else{
			  cont = 4;
			 
			}
		

		prevFn();
		
	});
	// right_btn
	$('.right_btn').on('click',function(){
		
		
		
		if(cont < 4){
				cont++;
				
			}else{
			  cont = 0;
			}
	

	  	nextFn();
		
	});	
	
	
	//설명문 바꾸기
	function explainChange(e){
		
		$(".vo_box.rt .stxt > li").removeClass("on");
		$(".vo_box.rt .stxt > li").eq(e).addClass("on");
	}	
	
	function prevFn(){
	  eles.unshift(eles.pop());
	  movePanel();
	}		
	
	function nextFn(){
	  //배열의 맨끝에 배열의 맨앞을 제거한 값을 추가한다
	  
	  eles.push(eles.shift());
		
	  newArr.push(newArr.shift());
	  console.log(newArr);
	  console.log(eles);
	  	
	  movePanel();
	 
	}	
		
	playSlider();
	
	
	//autoMove();
	setInterval(function() { 
	autoMove();		
	}, 3000)
	
		
	//var itemleng = $('.box').length;
	$(function() { 
		
		var pshparell = { }
		pshparell.winHT = $(window).height();
		pshparell.distance = pshparell.winHT;
		pshparell.count = 0;
		pshparell.mnoving = false;	
		pshparell.length = $(document).find(".page").length;

		$('.logo .h1 > a').on("click", function() { 
			pshparell.count = 0;
			$("html,body").stop().animate({scrollTop :0}, 500);
			
		});		
		
		
		var scfunc = function(event) { 
		event.preventDefault();
		var _this = $(this);
		var _thispt = $(this).parent();
		var _target = $(event).target;
		var _index = _thispt.index(_target);
            
		pshparell.count = _index + 1;
			
		console.log("클릭 했을때의 카운트 ==", pshparell.count);	

		var scrollHT = 	pshparell.distance * pshparell.count;
		//console.log("scrollHT", scrollHT);
		
		$("html,body").stop().animate({scrollTop : scrollHT + 'px'}, 500);	
	};
	
	var parrelTrigger = $('.nav_set > .nav > li > a');
	parrelTrigger.on("click", scfunc);

	
})	

	
	
});


