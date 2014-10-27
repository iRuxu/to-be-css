$(document).ready(function() {

	function a() {
		if ($("#backgroundColor").val() == "") {
			var q = "222D3A"
		} else {
			var q = $("#backgroundColor").val()
		}
		$("#result").css("background-color", q);
		if ($("#shadowSize").val() == "") {
			var f = 100
		} else {
			var f = $("#shadowSize").val()
		} if ($("#fadeStart").val() == "") {
			var p = 60 / 100
		} else {
			var p = $("#fadeStart").val() / 100
		} if ($("#shadowAlpha").val() == "") {
			var n = 10 / 100
		} else {
			var n = $("#shadowAlpha").val() / 100
		}
		var o = $.xcolor.opacity("#" + q, "black", n);
		var h = [];
		var g = Math.ceil(f * p);
		if (n < 0.01) {
			f = 0
		}
		for (var j = 0; j < f; j++) {
			var m = f - j;
			var l = f - j;
			var r = m + "px " + l + "px ";
			if (j <= g && p > 0.01) {
				var k = $.xcolor.gradientlevel(o, q, g - j, g);
				r += k
			} else {
				r += o
			}
			h.push(r)
		}
		var d = h.reverse().join();
		$("#shape").css({
			"box-shadow": d
		})
	}

	function c() {
		if ($("#shapeColor").val() == "") {
			var q = "16a085"
		} else {
			var q = $("#shapeColor").val()
		}
		$("#shape").css("background-color", q);
		if ($("#textShadowSize").val() == "") {
			var f = 30
		} else {
			var f = $("#textShadowSize").val()
		} if ($("#fadeTextStart").val() == "") {
			var d = 60 / 100
		} else {
			var d = $("#fadeTextStart").val() / 100
		} if ($("#textAlpha").val() == "") {
			var r = 10 / 100
		} else {
			var r = $("#textAlpha").val() / 100
		}
		var o = $.xcolor.opacity("#" + q, "black", r);
		var g = [];
		var m = Math.ceil(f * d);
		if (r < 0.01) {
			f = 0
		}
		for (var j = 0; j < f; j++) {
			var l = f - j;
			var h = f - j;
			var p = l + "px " + h + "px ";
			if (j <= m && d > 0.01) {
				var k = $.xcolor.gradientlevel(o, q, m - j, m);
				p += k
			} else {
				p += o
			}
			g.push(p)
		}
		var n = g.reverse().join();
		$("#shape").css({
			"text-shadow": n
		})
	}

	function b(f) {
		var h = document,
			i = h.getElementById(f),
			d, g;
		if (h.body.createTextRange) {
			d = document.body.createTextRange();
			d.moveToElementText(i);
			d.select()
		} else {
			if (window.getSelection) {
				g = window.getSelection();
				d = document.createRange();
				d.selectNodeContents(i);
				g.removeAllRanges();
				g.addRange(d)
			}
		}
	}
	a();
	c();
	$("#shadowSizeSlider").slider({
		range: "min",
		min: 0,
		animate: true,
		max: 200,
		value: 100,
		slide: function(d, f) {
			$("#shadowSize").focus().val(f.value).blur()
		},
		start: function(d, f) {
			$(this).closest(".sliderWrap").addClass("active")
		},
		stop: function(d, f) {
			$(this).closest(".sliderWrap").removeClass("active")
		}
	});
	$("#shadowAlphaSlider").slider({
		range: "min",
		min: 0,
		animate: true,
		max: 100,
		value: 10,
		slide: function(d, f) {
			$("#shadowAlpha").focus().val(f.value).blur()
		},
		start: function(d, f) {
			$(this).closest(".sliderWrap").addClass("active")
		},
		stop: function(d, f) {
			$(this).closest(".sliderWrap").removeClass("active")
		}
	});
	$("#fadeStartSlider").slider({
		range: "min",
		min: 0,
		animate: true,
		max: 100,
		value: 60,
		slide: function(d, f) {
			$("#fadeStart").focus().val(f.value).blur()
		},
		start: function(d, f) {
			$(this).closest(".sliderWrap").addClass("active")
		},
		stop: function(d, f) {
			$(this).closest(".sliderWrap").removeClass("active")
		}
	});
	$("#textShadowSizeSlider").slider({
		range: "min",
		min: 0,
		animate: true,
		max: 200,
		value: 30,
		slide: function(d, f) {
			$("#textShadowSize").focus().val(f.value).blur()
		},
		start: function(d, f) {
			$(this).closest(".sliderWrap").addClass("active")
		},
		stop: function(d, f) {
			$(this).closest(".sliderWrap").removeClass("active")
		}
	});
	$("#textAlphaSlider").slider({
		range: "min",
		min: 0,
		animate: true,
		max: 100,
		value: 10,
		slide: function(d, f) {
			$("#textAlpha").focus().val(f.value).blur()
		},
		start: function(d, f) {
			$(this).closest(".sliderWrap").addClass("active")
		},
		stop: function(d, f) {
			$(this).closest(".sliderWrap").removeClass("active")
		}
	});
	$("#fadeTextStartSlider").slider({
		range: "min",
		min: 0,
		animate: true,
		max: 100,
		value: 60,
		slide: function(d, f) {
			$("#fadeTextStart").focus().val(f.value).blur()
		},
		start: function(d, f) {
			$(this).closest(".sliderWrap").addClass("active")
		},
		stop: function(d, f) {
			$(this).closest(".sliderWrap").removeClass("active")
		}
	});
	$(".text-only").bind("click", function() {
		$("#shape").toggleClass("only");
		$(".input-group.background input").attr("disabled", "disabled");
		$(".input-group.background").addClass("disabled");
		$(".input-group.background .slider").slider("option", "disabled", true);
		$(".input-group.background .slider#shadowSizeSlider").slider("option", {
			value: 0
		});
		$("#shadowSize").focus().val("0").blur();
		$("#shape span").text("Long shadows");
		$("#shadowSize").focus().val("0").blur();
		if ($(this).hasClass("active")) {
			$("#shape span").text("Ls");
			$(".input-group.background input").removeAttr("disabled");
			$(".input-group.background").removeClass("disabled");
			$(".input-group.background .slider").slider("option", "disabled", false);
			$(".input-group.background .slider#shadowSizeSlider").slider("option", {
				value: 100
			});
			$("#shadowSize").focus().val("60").blur()
		}
		$(this).toggleClass("active")
	});
	$(".text-shadow").bind("click", function() {
		if ($(this).hasClass("disabled")) {
			e.preventDefault()
		} else {
			if ($(this).hasClass("active")) {
				$("#textShadowSize").focus().val("0").blur()
			} else {
				$("#textShadowSize").focus().val("").blur()
			}
			$(this).toggleClass("active")
		}
	});
	$("input").each(function() {
		var d = $(this).attr("id");
		$(this).keypress(function(f) {
			if (f.which == 13) {
				$(this).blur();
				switch (d) {
					case "backgroundColor":
					case "shadowAlpha":
					case "shadowSize":
					case "fadeStart":
						a();
						break;
					case "shapeColor":
					case "textAlpha":
					case "textShadowSize":
					case "fadeTextStart":
						c();
						break
				}
			}
		});
		$(this).on("focusout", function() {
			switch (d) {
				case "backgroundColor":
				case "shadowAlpha":
				case "shadowSize":
				case "fadeStart":
					a();
					break;
				case "shapeColor":
				case "textAlpha":
				case "textShadowSize":
				case "fadeTextStart":
					c();
					break
			}
		});
		$("#shadowAlpha, #shadowSize, #fadeStart").on("input", function() {
			a()
		});
		$("#textAlpha, #textShadowSize, #fadeTextStart").on("input", function() {
			c()
		})
	});
	$("#showCode").bind("click", function() {
		$("#code-wrapper").fadeIn();
		var i = $("#shape").attr("style");
		var g = i.split("px, ").join("px,<br>    ");
		var h = g.split(";").join(";<br>  ");
		if ($("#backgroundColor").val() == "") {
			var d = "222D3A"
		} else {
			var d = $("#backgroundColor").val()
		} if ($(".text-only").hasClass("active")) {
			var f = "/* you do realize this makes no sense, right?\ndon't use this.\nhttp://www.youtube.com/watch?v=umDr0mPuyQc */\n.shape {\n  " + h + "height: 100%;\n  width: 100%;\n  font-size: 75px;\n  text-align: center;\n}"
		} else {
			var f = "/* you do realize this makes no sense, right?\ndon't use this.\nhttp://www.youtube.com/watch?v=umDr0mPuyQc */\n.container {\n  padding: 100px;\n  background: #" + d + ";\n}\n.shape {\n  " + h + "height: 150px;\n  width: 150px;\n  font-size: 75px;\n  line-height: 150px;\n  text-align: center;\n}"
		}
		$("#code pre").html("");
		$("#code pre").append(f)
	});
	$(document).keyup(function(d) {
		if (d.keyCode == 27) {
			$("#code-wrapper").fadeOut()
		}
	});
	$("#code-wrapper .background, #code-wrapper .close").bind("click", function() {
		$("#code-wrapper").fadeOut()
	});
	$("label.color").each(function() {
		$(this).children().focus(function() {
			$(this).parent().addClass("active")
		});
		$(this).children().blur(function() {
			$(this).parent().removeClass("active")
		})
	});
	$("#selectAll").bind("click", function() {
		b("tocopy")
	})
});