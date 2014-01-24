(function(){
    var defaults = {
        key: "JOiNWt31tCV7Zn4Dp8OWkw"
        , message: {
            html: ""
            , text: ""
            , subject: "AndrewHML: Contact Form"
            , from_email: "no-reply@syntheus.com"
            , from_name: "Team Syntheus"
            , to: []
        }
    }, console = window.console || { log: function(){} };


    function mail( options ){
        if( this == window ){
            return new setOptions();
        }
        
        options = options || {};
        
        this.setOptions( defaults, this );
        this.setOptions( options, this );
        
        if( this.debug ){
            console.log( this );
        }

        return this;
    }

    mail.prototype.send = function( callback ){
        callback = callback || function ( status ){};

        var response;
        $.ajax({
            url: "https://mandrillapp.com/api/1.0/messages/send.json"
            , type: "POST"
            , async: false
            , data: {
                "key": this.key
                , "message": {
                    "html": this.message.html
                    , "text": this.message.text
                    , "subject": this.message.subject
                    , "from_email": this.message.from_email
                    , "from_name": this.message.from_name
                    , "to": this.message.to
                }
            }
            , dataType: "html"
            , success: function( data ) {
                response = JSON.parse( data )[ 0 ].status;

                callback( response );
            }
        });
        return response;
    }

    mail.prototype.setOptions = function(options, obj){
        for( i in options ){
            if( options.hasOwnProperty( i ) ){
                this[ i ] = options[ i ];
            }
        }
        return this;
    }

    window.mail = mail;
    
})();