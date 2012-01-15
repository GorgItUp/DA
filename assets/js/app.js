// 
//  --- our app behavior logic ---
//

$(document).ready(function() {
    (function( $ ){
        $.fn.da = function( method, value ) {
            
            var methods = {
                _init : function () {
                    var obj = this;
                    var jobj = $(this);   
                    //this._query();
                    
                    $('#start_button').click(function () {
                        var numRand = Math.floor(Math.random()*2);
                        var res = numRand == 0 ? 'nein' : 'ja';
                        $('#result-wrapper').css('display', 'block');
                        $('#result').text(res);
                        //res = obj._addWishlist(productID);
                        return true;
                    });
                },
                // QUERY //
                _query : function (data, returndata) {
                    var obj = this;
                    var jobj = $(this);
                    var stamp = new Date().getTime();
                    var status = false;
                    $.ajax({
                        url:"/checkout.ajax.php?"+stamp,
                        async:false, 
                        dataType:"json", 
                        data:data,
                        type:'POST',
                        success:function (json) {
                            $('*', jobj).removeClass('co-error');
                            if (typeof json.status != 'undefined') {
                                obj.plugin = json;
                                if (json.status) {
                                    if (typeof json.redirect != 'undefined' && json.redirect != null) {
                                        window.location.href = json.redirect;
                                        return false;
                                    } else {
                                        //obj._update();
                                        status = true;
                                        if (json.note.length) obj._showNote(json.note);
                                    }
                                }
                                else obj._showError(json.error);
                            }
                        }
                    });
                    if (returndata == true && obj.plugin.status) {
                        return obj.plugin;
                    }
                    return status;
                }
            };
            var settings = {
                
            };
            return this.each(function() {
                var init = false;

                if (methods[method]) {
                    return this[method].apply(this, [value]);
                } else if ( typeof method === 'object' || ! method ) {
                    init = true;
                }

                if (init) {
                    this.plugin = {};
                    this.opt = $.extend({}, settings, method);
                    $.extend(this, methods);
                    this._init();
                }
            });
        }
    })( jQuery );

});


/*
run(function () {
    // immediately invoked on first run
    var init = (function () {
        
        if (navigator.network.connection.type == Connection.NONE) {
            alert("No internet connection - we won't be able to show you any maps");
        } else {
            alert("We can reach Google - get ready for some awesome maps!");
        }
        })();
    alert(1);
    // a little inline controller
    when('#welcome');
    when('#start_button', function () {
        alert(1);
        //display('#welcome');
    });
});

*/
