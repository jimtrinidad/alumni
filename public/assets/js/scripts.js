//left side accordion
$(function() {

    $('#nav-accordion').dcAccordion({
        eventType: 'click',
        autoClose: true,
        saveState: true,
        disableLink: true,
        speed: 'slow',
        showCount: false,
        autoExpand: true,
        classExpand: 'dcjq-current-parent'
    });

});

var Script = function() {

    //  menu auto scrolling
    jQuery('#sidebar .sub-menu > a').click(function() {
        var o = ($(this).offset());
        diff = 80 - o.top;
        if (diff > 0) {
            $("#sidebar").scrollTo("-=" + Math.abs(diff), 500);
        } else {
            $("#sidebar").scrollTo("+=" + Math.abs(diff), 500);
        }
    });

    $('.sidebar-toggle-box .fa-bars').click(function(e) {
        $('#sidebar').toggleClass('hide-left-bar');
        $('#main-content').toggleClass('merge-left');
        e.stopPropagation();
        if ($('.header').hasClass('merge-header')) {
            $('.header').removeClass('merge-header')
        }
    });

    // custom scroll bar
    $("#sidebar").niceScroll({
        styler: "fb",
        cursorcolor: "#1FB5AD",
        cursorwidth: '3',
        cursorborderradius: '10px',
        background: '#404040',
        spacebarenabled: false,
        cursorborder: ''
    });

}();

toastr.options = {
  "closeButton"     : true,
  "debug"           : false,
  "newestOnTop"     : true,
  "progressBar"     : true,
  "positionClass"   : "toast-bottom-left",
  "preventDuplicates": false,
  "onclick"         : null,
  "showDuration"    : "300",
  "hideDuration"    : "1000",
  "timeOut"         : "4000",
  "showEasing"      : "swing",
  "hideEasing"      : "linear",
  "showMethod"      : "fadeIn",
  "hideMethod"      : "fadeOut"
}

bootbox.setDefaults({

  /**
   * @optional String
   * @default: en
   * which locale settings to use to translate the three
   * standard button labels: OK, CONFIRM, CANCEL
   */
  locale: "en",
  
  /**
   * @optional Boolean
   * @default: true
   * whether the dialog should be shown immediately
   */
  show: true,
  
  /**
   * @optional Boolean
   * @default: true
   * whether the dialog should be have a backdrop or not
   */
  backdrop: true,
  
  /**
   * @optional Boolean
   * @default: true
   * show a close button
   */
  closeButton: false,
  
  /**
   * @optional Boolean
   * @default: true
   * animate the dialog in and out (not supported in < IE 10)
   */
  animate: true,
  
  /**
   * @optional String
   * @default: null
   * an additional class to apply to the dialog wrapper
   */
  className: "confirmModal",
  
});


(function($) {

$(document)
    .on( 'hidden.bs.modal', '.modal', function() {
        $(document.body).removeClass( 'modal-scrollbar' );
    })
    .on( 'show.bs.modal', '.modal', function() {
        // Bootstrap's .modal-open class hides any scrollbar on the body,
        // so if there IS a scrollbar on the body at modal open time, then
        // add a right margin to take its place.
        if ( $(window).height() < $(document).height() ) {
            $(document.body).addClass( 'modal-scrollbar' );
        }
    });

})(window.jQuery);