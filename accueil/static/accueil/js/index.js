
$( document ).ready(function() {

	var $document = $(document);
	var $window = $(window);


	var $opacityScrollStartValues = [];
	var $opacityScrollStopValues = [];
	var $startEffectOpacity = 100;
	var $heightEffectOpacity = 600;

	function arrayOpacityScroll(){
		$opacityScrollStartValues = [];
		$opacityScrollStopValues = [];
		// init opacity-scroll-magic function
		$('.opacity-scroll-magic').each(function(index){
			$opacityScrollStartValues.push(
				($(this).offset().top + $startEffectOpacity)
			);
			$opacityScrollStopValues.push(
				($(this).offset().top + $heightEffectOpacity + $startEffectOpacity)
			);
		});

	}
	arrayOpacityScroll();
	$window.resize(arrayOpacityScroll());

	function tranform3d([x,y,z]){
		return 'translate3d( ' + x + 'px, '+ y +'px, '+  z +'px)'
	}

	function xyzScroll(pos, scroll){
		var x = ((scroll <= 0.8) ? 200*(0.8 -scroll): 0);
		var y = 200;
		var z = 0;
		console.log(scroll);
		switch (pos){
			case 1:

				return [-x,y*scroll,z];
			case 2:

				return [-x/2,1.3*y*scroll,z];
			case 3:

				return [0,y*scroll,z];
			case 4:

				return [x/2,1.3*y*scroll,z];
			case 5:

				return [x,y*scroll,z];
			default:
				return [0,0,0];
		}
	}

	$document.scroll(function() {

		var $scrollBottom = $window.scrollTop() + $window.height();

		var heightEffect = 400;
		$('.w').each(function(index){
			//scroll image effect
			var $this_images_top = $(this).offset().top;

			if ( $scrollBottom - $this_images_top + 100 > 0){

				var effect = ($scrollBottom - $this_images_top)/window.innerHeight;
				if (effect >= 0) {
					// $(this).css("margin-top", effect)
					$(this).children(".cadre-1").css("transform", tranform3d(xyzScroll(1,effect)))
					$(this).children(".cadre-2").css("transform", tranform3d(xyzScroll(2,effect)))
					$(this).children(".cadre-3").css("transform", tranform3d(xyzScroll(3,effect)))
					$(this).children(".cadre-4").css("transform", tranform3d(xyzScroll(4,effect)))
					$(this).children(".cadre-5").css("transform", tranform3d(xyzScroll(5,effect)))
				}

				var $width = (100 - 20*($scrollBottom - $this_images_top)/heightEffect)
				if ($width > 75){
					// $(this).css("width", $width + "vw")
				}

				var opacity = ($scrollBottom - $this_images_top)/heightEffect
				if (0 < opacity <= 1){
					$(this).css("opacity", opacity )
				}
			}

		});


		// h2 and p opacity
		$('.opacity-scroll-magic').each(function(index){
			if ($opacityScrollStartValues[index] < $scrollBottom < $opacityScrollStopValues[index]){
				var opa = ($scrollBottom - $opacityScrollStartValues[index])/$heightEffectOpacity;
				// opa = Math.pow(opa, 2);
				opa = ((opa < 0) ? 0 : opa);
				opa = ((opa > 1) ? 1 : opa);
				// console.log(opa);
				$(this).css("opacity", opa);
			}
		});

	});

});
