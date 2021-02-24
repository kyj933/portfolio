		 (() => {	
			 	let yOffset = 0; // javascript의 스크롤탑 window.pageYoffset대신 쓸 값
			 	let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 있는 스크롤 높이
			 	let currentScene = 0; // 현재 씬
			 	let enterNewScene = false; // 새로운 씬이 시작되면  true
			 	
			 	//  여기서부터는 나중에 표기 
			 	let acc = 0.2; 
			 	let delayedYOffset = 0;
			 	let rafId;
			 	let rafState;	
			 	

			    
			 	/*let scene03Point = [
					[0.35, 0.39],
					[0.37, 0.42],
					[0.44, 0.49],
					[0.54, 0.59],
					[0.61, 0.66],
					[0.68, 0.73]
				];*/
			 

			 	const sceneInfo = [
					{
						// 0
						type: 'normal',
						heightNum: 0, // 브라우저 높이의 5배로 scrollHeight 세팅
						scrollHeight: 0,
						objs: {
							container: document.querySelector('#scroll-section-0'),
						}
					},
					{
						// 1
						type: 'normal',
						heightNum: 0, // 브라우저 높이의 5배로 scrollHeight 세팅
						scrollHeight: 0,
						objs: {
							container: document.querySelector('#scroll-section-1'),
						}
					},
					{
						// 2
						type: 'normal',
						heightNum: 0, // 브라우저 높이의 5배로 scrollHeight 세팅
						scrollHeight: 0,
						objs: {
							container: document.querySelector('#scroll-section-2'),
						}
					},
					{
						// 3
						type: 'sticky',
						heightNum: 3, // 브라우저 높이의 5배로 scrollHeight 세팅
						scrollHeight: 0,
						objs: {
							container: document.querySelector('#scroll-section-3'),
							objs1_1: document.querySelector('#scroll-section-3 .objset.t1 .obj.ty1'),
							objs1_2: document.querySelector('#scroll-section-3 .objset.t1 .obj.ty2'),
							objs2_1: document.querySelector('#scroll-section-3 .objset.t2 .obj.ty1'),
							objs2_2: document.querySelector('#scroll-section-3 .objset.t2 .obj.ty2'),
							objs3_1: document.querySelector('#scroll-section-3 .objset.t3 .obj.ty1'),
							objs3_2: document.querySelector('#scroll-section-3 .objset.t3 .obj.ty2'),
						},
						values : { 
							
							objs1_1_opacity_in: [0, 1, {start: 0.31, end: 0.39}],
							objs1_1_translate_in: [-150,0, {start: 0.31, end: 0.39}],
						
							objs1_2_opacity_in: [0, 1, { start: 0.37, end: 0.45}],
							objs1_2_translate_in: [150,0, {start: 0.37, end: 0.45}],
							
							
							objs2_1_opacity_in: [0, 1, {start: 0.47, end: 0.54}],
							objs2_1_translate_in: [-150,0, {start: 0.47, end: 0.54}],
						
							objs2_2_opacity_in: [0, 1, { start: 0.56, end: 0.62}],
							objs2_2_translate_in: [150,0, {start: 0.56, end: 0.62}],
							
							objs3_1_opacity_in: [0, 1, {start: 0.64, end: 0.73}],
							objs3_1_translate_in: [-150,0, {start: 0.64, end: 0.73}],
						
							objs3_2_opacity_in: [0, 1, { start: 0.75, end: 0.80}],
							objs3_2_translate_in: [150,0, {start: 0.75, end: 0.80}],
							
							/*
							objs2_1_opacity_in: [0, 1, { start: scene03Point[2][0], end: scene03Point[2][1]}],
							objs2_1_translate_in: [0, 1, { start: scene03Point[2][0], end: scene03Point[2][1]}],
							
							objs2_2_opacity_in: [0, 1, { start: scene03Point[3][0], end: scene03Point[3][1]}],
							objs2_2_translate_in: [0,200, {start: scene03Point[3][0], end: scene03Point[3][1]}],
							
							objs3_1_opacity_in: [0, 1, { start: scene03Point[4][0], end: scene03Point[4][1]}],
							objs3_2_translate_in: [0,200, {start: scene03Point[4][0], end: scene03Point[4][1]}],
							
							objs3_2_opacity_in: [0, 1, { start: scene03Point[5][0], end: scene03Point[5][1]}],
							objs3_2_translate_in: [0,200, {start: scene03Point[5][0], end: scene03Point[5][1]}],
							*/
							
							
						}
					},					
			 	];
			 	
			 	// 레이아웃 설정
			 	function setLayout() { 		
					for (let i = 0; i < sceneInfo.length; i++) {
						if (sceneInfo[i].type === 'sticky') {
							sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;							
						} else if (sceneInfo[i].type === 'normal')  {
							sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;

						}
						sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
					}
			 		
			 		
			 		yOffset = window.pageYOffset;
			 		let totalScrollHeight = 0;
			 		for(let i = 0; i < sceneInfo.length; i++) { 
			 			totalScrollHeight += sceneInfo[i].scrollHeight;
			 			if(totalScrollHeight > yOffset) { 
			 			   currentScene = i;			   	
			 			   break;							   
			 			}			
			 		}
			 		
			 		document.body.setAttribute('id', `show-scene-${currentScene}`);
			 		
			 		
			 	}
			 	
			 	function calcValues(values, currentYOffset) { 
					
			 		let rv;
			 		//현재씬에서 스크롤된 비율 구하기
			 		//console.log(values);	
			 		const scrollHeight = sceneInfo[currentScene].scrollHeight;
			 		const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;					 		
			 		if(values.length == 3) { 
			 		   //start ~ end 사이 애니메이션 실행
			 		   	const partScrollStart = values[2].start * scrollHeight;
			 		   	const partScrollEnd = values[2].end * scrollHeight;
			 			const partScrollHeight = partScrollEnd - partScrollStart;
			 			
			 			if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) { 
			 				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			 			} else if(currentYOffset < partScrollStart) { 
			 				rv = values[0];
			 			} else if(currentYOffset > partScrollEnd) { 
			 				rv = values[1];
			 			}
			 			
			 		} else { 
			 			rv = scrollRatio * (values[1] - values[0]) + values[0];	   
			 		}
			 		
			 		
			 		return rv;
			 	}
			 	
			 	function totalCalcValue(values, yOffset) { 
			 		let rv;
			 		
					
			 		const totalScrollHeight = sceneInfo[0].scrollHeight + sceneInfo[1].scrollHeight + sceneInfo[2].scrollHeight + sceneInfo[3].scrollHeight;
			 		const totalScrollRatio = yOffset / totalScrollHeight;
					
					//console.log(values[2].start, totalScrollHeight);
					
			 		const partScrollStart = values[2].start * totalScrollHeight;
			 		const partScrollEnd = values[2].end * totalScrollHeight;
			 		const partScrollHeight = partScrollEnd - partScrollStart;		
			 		
			 		//rv = (yOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			 		
			 		
			 		//console.log("partScrollStart ==", partScrollStart);
			 		//console.log("토탈스크롤 ", totalScrollRatio);
			 		//console.log("partScrollHeight ==", partScrollHeight);
			 		
			 		if(yOffset >= partScrollStart && yOffset <= partScrollEnd) { 
			 			
			 			rv = (yOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			 			//console.log(rv)			
			 		} else if(yOffset < partScrollStart) { 
			 			rv = values[0];
			 			//console.log("시작전", rv);
			 		} else if(yOffset > partScrollEnd) { 
			 			rv = values[1];
			 			//console.log("시작후", rv);
			 		}
			 		//console.log("rv ", rv);
			 		
			 		return rv;
			 	}
			 	
			 	
			 	function playAnimation() { 
			 		const objs = sceneInfo[currentScene].objs;
			 		const values = sceneInfo[currentScene].values;
			 		const currentYOffset = yOffset - prevScrollHeight;
			 		const scrollHeight = sceneInfo[currentScene].scrollHeight;
			 		const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight; //yOffset / 현재 씬의 scrollHeight;	
			 		
			 		const totalScrollHeight = sceneInfo[0].scrollHeight + sceneInfo[1].scrollHeight + sceneInfo[2].scrollHeight +  + sceneInfo[3].scrollHeight;
			 		const totalScrollRatio = yOffset / totalScrollHeight;

			 		
					const scene03_objs = sceneInfo[3].objs;
			 		const scene03_values = sceneInfo[3].values;
					
					//console.log(scene03_objs.objs1);		
					
					
					let objs1_1_opacity_in = totalCalcValue(scene03_values.objs1_1_opacity_in, yOffset);
					let objs1_1_translate_in = totalCalcValue(scene03_values.objs1_1_translate_in, yOffset); 	
					let objs1_2_opacity_in = totalCalcValue(scene03_values.objs1_2_opacity_in, yOffset);
					let objs1_2_translate_in = totalCalcValue(scene03_values.objs1_2_translate_in, yOffset);
					
					let objs2_1_opacity_in = totalCalcValue(scene03_values.objs2_1_opacity_in, yOffset);
					let objs2_1_translate_in = totalCalcValue(scene03_values.objs2_1_translate_in, yOffset); 
					let objs2_2_opacity_in = totalCalcValue(scene03_values.objs2_2_opacity_in, yOffset);
					let objs2_2_translate_in = totalCalcValue(scene03_values.objs2_2_translate_in, yOffset); 	
				
					let objs3_1_opacity_in = totalCalcValue(scene03_values.objs3_1_opacity_in, yOffset);
					let objs3_1_translate_in = totalCalcValue(scene03_values.objs3_1_translate_in, yOffset); 
					let objs3_2_opacity_in = totalCalcValue(scene03_values.objs3_2_opacity_in, yOffset);
					let objs3_2_translate_in = totalCalcValue(scene03_values.objs3_2_translate_in, yOffset); 	
										
					//let objs1_opacity_out = totalCalcValue(values.objs1_opacity_out, currentYOffset);
					//let objs1_translatey_out = totalCalcValue(values.objs1_translatey_out, currentYOffset); 	
					console.log(totalScrollRatio);
					if(totalScrollRatio >= 0.3) { 
						scene03_objs.objs1_1.setAttribute("style", 'opacity :' + objs1_1_opacity_in + '; transform : translateY(' + objs1_1_translate_in + 'px)');
					}
					if(totalScrollRatio >= 0.37) { 
						scene03_objs.objs1_2.setAttribute("style", 'opacity :' + objs1_2_opacity_in + '; transform : translateY(' + objs1_2_translate_in + 'px)');
					}
					
					if(totalScrollRatio >= 0.47) { 
						scene03_objs.objs2_1.setAttribute("style", 'opacity :' + objs2_1_opacity_in + '; transform : translateY(' + objs2_1_translate_in + 'px)');
					}
					if(totalScrollRatio >= 0.56) { 
						scene03_objs.objs2_2.setAttribute("style", 'opacity :' + objs2_2_opacity_in + '; transform : translateY(' + objs2_2_translate_in + 'px)');
					}
					
					if(totalScrollRatio >= 0.63) { 
						scene03_objs.objs3_1.setAttribute("style", 'opacity :' + objs3_1_opacity_in + '; transform : translateY(' + objs3_1_translate_in + 'px)');
					}
					if(totalScrollRatio >= 0.73) { 
						scene03_objs.objs3_2.setAttribute("style", 'opacity :' + objs3_2_opacity_in + '; transform : translateY(' + objs3_2_translate_in + 'px)');
					}			 		

			 		switch(currentScene) { 
			 			case 0 : 	
		 					//console.log(scrollRatio);
			 				break;
			 			case 1 : 
			 				//console.log(scrollRatio);
			
			 				
			 				break;
			 			
			 			case 2 : 
			 				//console.log(scrollRatio);

			
			 				
			 				break;
			 				
			 			case 3 :
							
							break;	
			 				
			 				
			 		}
			 		
			 		// 2번째 화면이 윈도우상에서 보이기 시작한 시점부터 애니메이션이 동작해야함 
			 		var zz = document.getElementById("scroll-section-1").offsetHeight;
			 		//console.log(zz);
			 		//console.log(totalScrollRatio);
			 	}
			 	
			 	function scrollLoop() { 
			 		prevScrollHeight = 0;
			 		enterNewScene = false
			 		for(let i = 0; i < currentScene; i++) { 
			 			prevScrollHeight += sceneInfo[i].scrollHeight;
			 		}

			 		//console.log("prevScrollHeight ==", prevScrollHeight);
			 		//console.log("현재신의 스크롤하이트 ==", sceneInfo[currentScene].scrollHeight);
			 		//console.log("yOffset ==", yOffset);
			 		
			 		
			 		if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { 
			 			enterNewScene = true;
			 			currentScene++;		
			 			document.body.setAttribute('id', `show-scene-${currentScene}`);
			 		}

			 		if(yOffset < prevScrollHeight) { 
			 			enterNewScene = true;
			 			if(currentScene === 0) return;
			 			currentScene--;
			 			document.body.setAttribute('id', `show-scene-${currentScene}`);
			 		}
			 		//console.log(yOffset);
			 		if(enterNewScene) return;
			 		playAnimation();
			 	}
			 	
			 	
			 	window.addEventListener('scroll', () => { 
			 		yOffset = window.pageYOffset;
			 		scrollLoop();
			 	});
			 	
			 	window.addEventListener('load', setLayout);
			 	window.addEventListener('resize', setLayout);
			 	
			 })();	

$( document ).ready(function() {
  $('.trigger').click(function() {
     $('.modal-wrapper').toggleClass('open');
    $('.page-wrapper').toggleClass('blur');
     return false;
  });
});








