$(function(){

	//界面优化
	$(".dir-box input").change(function(){
		$(".dir-box input").parent().css('color','#ccc');
		$(this).parent().css('color','#00ccff');
	})

	$(".arg-box ul input").change(function(){
		$(".arg-box ul input").parent().css('color','#ccc');
		$(this).parent().css('color','#00ccff');
	})

	
	/*if($("#ie6").is(':checked')){
		$(this).css('color','#00ccff');
	}else{
		$(this).css('color','#ccc');
	}*/
	var ie6state=false;
	$("#ie6").change(function(){
		if(ie6state == false){
			ie6state = true;
			$(this).parent().children('label').css('color','#00ccff');
			console.log(ie6state);
		}
		else if(ie6state == true){
			ie6state=false;
			$(this).parent().children('label').css('color','#ccc');
			console.log(ie6state);
		}
	})

	/*$('#ie6').change(function(){
		updateCSS();
	});*/

	/*$('#colorPicker').ColorPicker({
		color: '#007bff',
		flat: true,
		onChange: function (hsb, hex, rgb) {
			$('#color').val('#' + hex);
			updateCSS();
		}
	});*/

	/*$("#colorPicker").colpick({
	  layout:'rgbhex',
	  submit:0,
	  colorScheme:'dark',
	  onChange:function(hsb,hex,rgb,el,bySetColor) {
	  $(el).css('border-color','#'+hex);
	  if(!bySetColor) $(el).val(hex);
	  updateCSS();
	  }
	}).keyup(function(){
	  $(this).colpickSetColor(this.value);
	  updateCSS();
	});*/


	//复制代码
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

	$("#cssOutput h1 span").click(function(){
		b("css")
	})


	//
	$('html').removeClass('no-js');
	$('html').addClass('js');
	var staticCSS = 'width: 0;'+'\n'+
					'height: 0;'+'\n'+
					'border-style: solid;',
		colorDirection = {
			'top': 'bottom',
			'right': 'left',
			'bottom': 'top',
			'left': 'right',
			'topRight': 'right',
			'bottomRight': 'bottom',
			'bottomLeft': 'left',
			'topLeft': 'top'
		},
		lengthDirection = {
			'top': {
				'top': false,
				'right': 'width-right',
				'bottom': 'height',
				'left': 'width-left'
			},
			'right': {
				'top': 'height-top',
				'right': false,
				'bottom': 'height-bottom',
				'left': 'width'
			},
			'bottom': {
				'top': 'height',
				'right': 'width-right',
				'bottom': false,
				'left': 'width-left'
			},
			'left': {
				'top': 'height-top',
				'right': 'width',
				'bottom': 'height-bottom',
				'left': false
			},
			'topRight': {
				'top': false,
				'right': 'width',
				'bottom': 'height',
				'left': false
			},
			'bottomRight': {
				'top': false,
				'right': false,
				'bottom': 'height',
				'left': 'width'
			},
			'bottomLeft': {
				'top': 'height',
				'right': false,
				'bottom': false,
				'left': 'width'
			},
			'topLeft': {
				'top': 'height',
				'right': 'width',
				'bottom': false,
				'left': false
			}
		},
		triangle = $('#triangle'),
		cssOutput = $('#css'),
		supportIE6 = document.getElementById('ie6');
	function toArray(obj){
		var arr = [];
		for(var key in obj){
			arr.push(obj[key]);
		}
		return arr;
	}
	function updateCSS(){
		var direction = $('input[name=direction]:checked').val(),
			type = $('input[name=type]:checked').val(),
			color = $('#color').val(),
			colors = {
				'top':'transparent',
				'right':'transparent',
				'bottom':'transparent',
				'left':'transparent'
			},
			lengths = {
				'top':0,
				'right':0,
				'bottom':0,
				'left':0
			},
			lengthDirections = lengthDirection[direction];
		colors[colorDirection[direction]] = color;
		for(var key in lengthDirections){
			if(lengthDirections[key] === false){
				lengths[key] = '0';
			}else{
				switch(type){
					case 'equ':
						if(direction == 'top' || direction == 'bottom'){
							var equHeight = (Math.sqrt(3)/2*$('#width').val()).toFixed(1);
							switch(lengthDirections[key]){
								case 'width':
									lengths[key] = equHeight+'px';
									break;
								case 'height':
									lengths[key] = equHeight+'px';
									break;
								case 'width-left':
									lengths[key] = $('#width').val()/2+'px';
									break;
								case 'width-right':
									lengths[key] = $('#width').val()/2+'px';
									break;
							}
						}else if(direction == 'left' || direction == 'right'){
							var equHeight = (Math.sqrt(3)/2*$('#height').val()).toFixed(1);
							switch(lengthDirections[key]){
								case 'width':
									lengths[key] = equHeight+'px';
									break;
								case 'height':
									lengths[key] = equHeight+'px';
									break;
								case 'height-top':
									lengths[key] = $('#height').val()/2+'px';
									break;
								case 'height-bottom':
									lengths[key] = $('#height').val()/2+'px';
									break;
							}
						}
						break;
					case 'iso':
						switch(lengthDirections[key]){
							case 'width':
								lengths[key] = $('#width').val()+'px';
								break;
							case 'height':
								lengths[key] = $('#height').val()+'px';
								break;
							case 'width-left':
								lengths[key] = $('#width').val()/2+'px';
								break;
							case 'width-right':
								lengths[key] = $('#width').val()/2+'px';
								break;
							case 'height-top':
								lengths[key] = $('#height').val()/2+'px';
								break;
							case 'height-bottom':
								lengths[key] = $('#height').val()/2+'px';
								break;
						}
						break;
					case 'sca':
						switch(lengthDirections[key]){
							case 'width':
								lengths[key] = $('#width').val()+'px';
								break;
							case 'height':
								lengths[key] = $('#height').val()+'px';
								break;
							case 'width-left':
								lengths[key] = $('#width-left').val()+'px';
								break;
							case 'width-right':
								lengths[key] = $('#width-right').val()+'px';
								break;
							case 'height-top':
								lengths[key] = $('#height-top').val()+'px';
								break;
							case 'height-bottom':
								lengths[key] = $('#height-bottom').val()+'px';
								break;
						}
						break;
				}
			}
		}
		colors = toArray(colors).join(' ');
		triangle.css('border-color',colors);
		lengths = toArray(lengths).join(' ');
		triangle.css('border-width',lengths);
		
		var ieCSS = '';
		if(supportIE6.checked){
			var chromaColor = color == '#000000'?'#ffffff':'#000000',
				ieColors = colors.replace(/transparent/g, chromaColor),
				ieFilter = "progid:DXImageTransform.Microsoft.Chroma(color='"+chromaColor+"')";
			ieCSS = 'line-height: 0px;\n'+
					'_border-color: '+ieColors+';\n'+
					'_filter: '+ieFilter+';';
		}
		cssOutput.val(staticCSS+'\n'+
						'border-width: '+lengths+';\n'+
						'border-color: '+colors+';\n'+
						ieCSS
					);
	}
	function changeSetup(){
		var direction = $('input[name=direction]:checked').val(),
			type = $('input[name=type]:checked').val();
		$('#triangleDirection').removeClass();
		$('#triangleDirection').addClass('selected-'+direction);
		if(direction == 'topRight' || direction == 'bottomRight' ||
			direction == 'bottomLeft' || direction == 'topLeft'){
			if(document.getElementById('type-equ').checked){
				document.getElementById('type-iso').checked = true;
				type = 'iso';
			}
			$('#equilateral').hide();
		}else{
			$('#equilateral').show();
		}
		var width = document.getElementById('width'),
			height = document.getElementById('height'),
			widthLeft = document.getElementById('width-left'),
			widthRight = document.getElementById('width-right'),
			heightTop = document.getElementById('height-top'),
			heightBottom = document.getElementById('height-bottom');
		switch(type){
			case 'equ':
				if(direction == 'top' || direction == 'bottom'){
					width.disabled = false;
					height.disabled = true;
					widthLeft.disabled = true;
					widthRight.disabled = true;
					heightTop.disabled = true;
					heightBottom.disabled = true;
				}else if(direction == 'left' || direction == 'right'){
					width.disabled = true;
					height.disabled = false;
					widthLeft.disabled = true;
					widthRight.disabled = true;
					heightTop.disabled = true;
					heightBottom.disabled = true;
				}else{
					width.disabled = false;
					height.disabled = false;
					widthLeft.disabled = true;
					widthRight.disabled = true;
					heightTop.disabled = true;
					heightBottom.disabled = true;
				}
				break;
			case 'iso':
					width.disabled = false;
					height.disabled = false;
					widthLeft.disabled = true;
					widthRight.disabled = true;
					heightTop.disabled = true;
					heightBottom.disabled = true;
				break;
			case 'sca':
				if(direction == 'top' || direction == 'bottom'){
					width.disabled = true;
					height.disabled = false;
					widthLeft.disabled = false;
					widthRight.disabled = false;
					heightTop.disabled = true;
					heightBottom.disabled = true;
				}else if(direction == 'left' || direction == 'right'){
					width.disabled = false;
					height.disabled = true;
					widthLeft.disabled = true;
					widthRight.disabled = true;
					heightTop.disabled = false;
					heightBottom.disabled = false;
				}else{
					width.disabled = false;
					height.disabled = false;
					widthLeft.disabled = true;
					widthRight.disabled = true;
					heightTop.disabled = true;
					heightBottom.disabled = true;
				}
				break;
		}
	}
	function changeSize(self){
		var direction = $('input[name=direction]:checked').val(),
			type = $('input[name=type]:checked').val(),
			width = document.getElementById('width'),
			height = document.getElementById('height'),
			widthLeft = document.getElementById('width-left'),
			widthRight = document.getElementById('width-right'),
			heightTop = document.getElementById('height-top'),
			heightBottom = document.getElementById('height-bottom');
		if(direction == 'top' || direction == 'bottom' ||
			direction == 'left' || direction == 'right'){
			if(width.disabled){
				width.value = widthLeft.value*1 + widthRight.value*1;
			}else{
				widthLeft.value = width.value*1 / 2;
				widthRight.value = width.value*1 / 2;
			}
			if(height.disabled){
				height.value = heightTop.value*1 + heightBottom.value*1;
			}else{
				heightTop.value = height.value*1 / 2;
				heightBottom.value = height.value*1 / 2;
			}
		}else if(type == 'iso'){
			if(self.attr('id') == 'width'){
				height.value = width.value;
			}else if(self.attr('id') == 'height'){
				width.value = height.value;
			}else if(height.value != width.value){
				height.value = width.value;
			}
			widthLeft.value = width.value*1 / 2;
			widthRight.value = width.value*1 / 2;
			heightTop.value = height.value*1 / 2;
			heightBottom.value = height.value*1 / 2;
		}
	}
	
	$('input[name=direction]').change(function(){
		changeSetup();
		changeSize($(this));
		updateCSS();
	});
	$('input[name=type]').change(function(){
		changeSetup();
		changeSize($(this));
		updateCSS();
	});
	
	$('#fieldset-size input').change(function(){
		changeSize($(this));
		updateCSS();
	});
	$('#fieldset-size input').keydown(function(){
		changeSize($(this));
		updateCSS();
	});
	$('#fieldset-size input').keyup(function(){
		changeSize($(this));
		updateCSS();
	});
	
	

	$('#data').submit(function(){
		updateCSS();
		$("html, body").animate({scrollLeft:400}, 200, function(){
			$("html, body").animate({scrollTop:0}, 200)
		});
		return false;
	});
	changeSetup();
});