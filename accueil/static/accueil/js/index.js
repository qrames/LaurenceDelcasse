
$( document ).ready(function() {

	var $cataloges_images_top = $('#cataloges_images').offset().top;
	var $document = $(document);
	var $window = $(window);
	var $opacityScrollStartValues = [];
	var $opacityScrollStopValues = [];
	var $startEffectOpacity = 100;
	var $heightEffectOpacity = 600;
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

		// Catalogue images :
		if ( $scrollBottom - $cataloges_images_top + 100 > 0){

			var $margin_top = 300 - ($scrollBottom - $cataloges_images_top)/1.7;
			if ($margin_top >= 0) {
				$('#cataloges_images').css("margin-top", $margin_top)
			}

			var $width = (100 - 20*($scrollBottom - $cataloges_images_top)/300)
			if ($width > 75){
				$('#cataloges_images').css("width", $width + "vw")
			}
		}

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
