
$( document ).ready(function() {

	var $document = $(document);
	var $window = $(window);


	var $opacityScrollStartValues = [];
	var $opacityScrollStopValues = [];
	var $startEffectOpacity = 100;
	var $heightEffectOpacity = 600;

	// init opacity-scroll-magic function
	$('.opacity-scroll-magic').each(function(index){
		$opacityScrollStartValues.push(
			($(this).offset().top + $startEffectOpacity)
		);
		$opacityScrollStopValues.push(
			($(this).offset().top + $heightEffectOpacity + $startEffectOpacity)
		);
	});

	$document.scroll(function() {

		var $scrollBottom = $window.scrollTop() + $window.height();

		var heightEffect = 400;
		$('.w').each(function(index){
			//scroll image effect
			var $this_images_top = $(this).offset().top;

			if ( $scrollBottom - $this_images_top + 100 > 0){

				var $margin_top = heightEffect - ($scrollBottom - $this_images_top)/2;
				if ($margin_top >= 0) {
					$(this).css("margin-top", $margin_top)
				}

				var $width = (100 - 20*($scrollBottom - $this_images_top)/heightEffect)
				if ($width > 75){
					$(this).css("width", $width + "vw")
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
