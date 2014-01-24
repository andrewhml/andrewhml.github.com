/*
|--------------------------------------------------------------------------
| DOCUMENT READY
|--------------------------------------------------------------------------
*/  

$(function() {

    /*
    |--------------------------------------------------------------------------
    |  fullwidth image
    |--------------------------------------------------------------------------
    */
    if ($('#homeFullScreen').length){
      fullscreenImage();
    }
    //alert($('#mainHeader').height());
    //alert( $(window).height());
    var $starter = $(window).height()-($('#mainHeader').height());
    $(window).scroll(function() {
      if ($('#fullScreen').length){
        if ($(window).scrollTop()>= $starter){
          $('#mainHeader').slideDown();
        } else if ($(window).scrollTop()==0){
          $('#mainHeader').slideUp();
        } 
      }
    });

  /** FULLSCREEN IMAGE **/

    function fullscreenImage(){
      $('#homeFullScreen').css({height:$(window).height()})   
    }

    $(window).on("resize",function(e){
      if ($('#homeFullScreen').length){
          console.log("working!")
          fullscreenImage();
        }
    });

  // Transition the header to sticky class when you reach about section //
    $(function () {
        $("#about").waypoint(function () {
            $("#main-nav").toggleClass("sticky")
        }, {
            offset: 160
        })
    });


  // Music toggle //

  (function ($) {

    "use strict";

    function setCookie(c_name,value){
      /*
      // http://stackoverflow.com/questions/1783302/clear-cookies-on-browser-close
      //var exdate=new Date();
      //exdate.setDate(exdate.getDate() + 1);
      var c_value=escape(value) + "; expires="+exdate.toUTCString();
      */
      var c_value=escape(value);
      var __path = '/';
      document.cookie=c_name + "=" + c_value + ';  path=' + __path;
      //reload_styleswitcher_box_with_cookies();
    }

    function getCookie(c_name){
      var i,x,y,ARRcookies=document.cookie.split(";");
      for (i=0;i<ARRcookies.length;i++){
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name) {
          if( 'false' == y){
            return false;
          }
          return unescape(y);
        }
      }
      return false;
    }

    function isPossibleToCreateAudioElement(){
      if( typeof( $('.music-toggle').attr('data-mp3') ) != 'undefined' ){
        return true;
      }
      
      if( typeof( $('.music-toggle').attr('data-ogg') ) != 'undefined' ){
        return true;
      }
      return false;
    }
    
    function createAudioElement(){
      if( $('audio.audio-rain').size() > 0 ){
        return true;
      }

      var audio_element = '';

      if( typeof( $('.music-toggle').attr('data-mp3') ) != 'undefined' ){
        audio_element += '<source src="' + $('.music-toggle').attr('data-mp3') + '"></source>';
      }
      
      if( typeof( $('.music-toggle').attr('data-ogg') ) != 'undefined' ){
        audio_element += '<source src="' + $('.music-toggle').attr('data-ogg') + '"></source>';
      }

      if( '' === audio_element ){
        // nothing to play
        return false;
      }
      
      audio_element = '<audio class="audio-rain" loop="true" autoplay="true">' + audio_element + '</audio>';
    
      $('.music-toggle').parent().append( audio_element );
    
      $('audio.audio-rain').each(function(){ this.pause(); });
      
      return true;
    }
    
    if( isPossibleToCreateAudioElement() ){
      
      if( ( $('.jqres').width() <= 900 ) ) return;

      var music_playing = getCookie('music_playing');

      if( false === music_playing ){
        // not initialized
        music_playing = 1;
      }

      music_playing = 1 * music_playing;

      $('.music-toggle').show();

      if( music_playing ){
        $('.music-toggle').addClass('music-playing');
        createAudioElement();
        $('audio.audio-rain').each(function(){ this.play(); });
      }else{
        $('.music-toggle').addClass('music-stopped');
      }

      $('.music-toggle').click(function(){
        // $(this).pause(); -> does not work in f.e. Chrome
        if( $(this).hasClass('music-playing') ){
          $('audio.audio-rain').each(function(){
            this.pause();
          });
          setCookie('music_playing', 0);
        }else{
          createAudioElement();
          $('audio.audio-rain').each(function(){
            this.play();
          });
          setCookie('music_playing', 1);
        }

        $('.music-toggle').toggleClass('music-playing');
        $('.music-toggle').toggleClass('music-stopped');
      });

      //hide music-toggle on iPad

      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('.music-toggle').hide();
      }
    }

    $('#slideshow-caption').center('#homeFullScreen');



   $('body').on(
      'click'
      , '#form-submit'
      , function (){
        var name = $('#form-name')
        , email = $('#form-email')
        , msg = $('#form-message');

        sendMail(
          msg.val()
          , email.val()
          , name.val()
          )

      }

   ) 

//helper
    

  }(jQuery));


});
  $.fn.center = function ( container ) {

      var $this = $(this)
          , container = container || window;
      $this.css("position","fixed");

      $(window).resize(
        function(){

          console.log( $(container).height() );
          console.log( $(container).width() );

          $this.css("top", Math.max(0, (($(container).height() - $this.outerHeight()) / 2) + 
                                          $(container).scrollTop()) + "px");
          $this.css("left", Math.max(0, (($(container).width() - $this.outerWidth()) / 2) + 
                                          $(container).scrollLeft()) + "px");
        }
      ).resize();
      return this;
    }



function sendMail (text, from_email, from_name) {

  var myMail = new mail({
    message: {
      text: text
      , html: ""
            , subject: "Andrewhml: Contact Form"
      , from_name: from_name
      , from_email: from_email
      , to: [
                {
                    "name": "Andrew Lee"
                    , "email": "alee@syntheus.com"
                }
            ]
    }
  });

  myMail.send(
    function( s ){
      if( s == 'sent'){
        $('#form-container').html('<h2 class="form-callback"> Your pigeon has flown. I&#39;ll be in touch shortly!</h1>')
      }
    }
  );
  //if( myMail.send() == 'sent'){
      
  //}
}

