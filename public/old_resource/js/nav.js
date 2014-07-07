$(document).ready(function() {
	var expand = false;
	$(".menulist,.fechar").on("click", function() {
		if (!expand) {
			$("#menu").animate({
				marginLeft : "0px"
			}, "fast", function() {
				expand = true;
			});

			$("#wrapper").animate({
				marginLeft : "300px"
			}, "fast");
		} else {
			$("#menu").animate({
				marginLeft : "-300px"
			}, "fast", function() {
				expand = false;
			});

			$("#wrapper").animate({
				marginLeft : "0"
			}, "fast");
		}

	});
	$("nav").on("click", "li", function() {
		$("#menu").animate({
			marginLeft : "-300px"
		}, "fast", function() {
			expand = false;
		});

		$("#wrapper").animate({
			marginLeft : "0"
		}, "fast");
	});
});

$(document).ready(function() {
	$(".m1,.close1").click(function() {
		$(".menu-1").toggleClass("open");
	});
	$(".m2,.close2").click(function() {
		$(".menu-2").toggleClass("open");
	});
	$(".m3,.close3").click(function() {
		$(".menu-3").toggleClass("open");
	});
	$(".m4,.close4").click(function() {
		$(".menu-4").toggleClass("open");
	});
	$(".m5,.close5").click(function() {
		$(".menu-5").toggleClass("open");
	});
	$(".m6,.close6").click(function() {
		$(".menu-6").toggleClass("open");
	});
	$(".m7,.close7").click(function() {
		$(".menu-7").toggleClass("open");
	});
	$(".m8,.close8").click(function() {
		$(".menu-8").toggleClass("open");
	});
}); 