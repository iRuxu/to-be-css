$(function(){

    //index
    $("#tbc_index>li").hover(
      function(){
        $('#tbc_index>li').css({'filter':'alpha(opacity=60)','opacity':0.2});
        $(this).css({'filter':'alpha(opacity=100)','opacity':1});
      },
      function(){
        $('#tbc_index>li').css({'filter':'alpha(opacity=100)','opacity':100});
      }
    )

    //top menu
    $("#gradient_nav").hover(
      function(){$(this).children('ul').show('slow')},
      function(){$(this).children('ul').hide('slow')}
    )

    //longshadows
    $("h5").click(function() {
        $("#about").fadeToggle('slow');
        var h5_pos = $("h5").offset().top;
        $(window).scrollTop(h5_pos);
    });

    $("#backgroundColor").colpick({
      layout:'rgbhex',
      submit:0,
      colorScheme:'dark',
      onChange:function(hsb,hex,rgb,el,bySetColor) {
      $(el).css('border-color','#'+hex);
      if(!bySetColor) $(el).val(hex);
      }
    }).keyup(function(){
      $(this).colpickSetColor(this.value);
    });

    $("#shapeColor").colpick({
      layout:'rgbhex',
      submit:0,
      colorScheme:'dark',
      onChange:function(hsb,hex,rgb,el,bySetColor) {
      $(el).css('border-color','#'+hex);
      if(!bySetColor) $(el).val(hex);
      }
    }).keyup(function(){
      $(this).colpickSetColor(this.value);
    });
    

    


    
    
    


})