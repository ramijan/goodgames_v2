angular
  .module('goodGames')
  .factory('Flash', function() {

    var flash = {
      flashIn: function(cssClass) {
        $('.'+cssClass).append("<i class='fa fa-spinner fa-spin'></i>&nbsp;Saving...").fadeIn();
      },
      flashOut: function(cssClass) {
        var elt = $('.'+cssClass);
        elt.empty().append("<i class='fa fa-floppy-o'></i>&nbsp;Saved!");
        window.setTimeout(function(){
          elt.fadeOut(function(){
            $(this).empty();
          });
        }, 1000);
      }
    };

    return flash;

  });
