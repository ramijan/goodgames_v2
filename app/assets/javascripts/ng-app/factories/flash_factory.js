/*****************************************************
 *  This factory adds and removes a 'Saving' spinner
 *  and message to any element with class given as
 *  argument.  Mainly used when updating ratings,
 *  reviews, and shelves
 ****************************************************/

angular
  .module('goodGames')
  .factory('Flash', function() {

    var flash = {

      // adds a "saving..." spinner to the element with the given class
      flashIn: function(cssClass) {
        $('.'+cssClass).append("<i class='fa fa-spinner fa-spin'></i>&nbsp;Saving...").fadeIn();
      },

      // Updates the saving spinner to 'saved' and then dismisses it 
      flashOut: function(cssClass) {
        var elt = $('.'+cssClass);
        elt.empty().append("<i class='fa fa-floppy-o'></i>&nbsp;Saved!");
        window.setTimeout(function(){
          elt.fadeOut(function(){
            $(this).empty();
          });
        }, 1500);
      }
    };

    return flash;

  });
