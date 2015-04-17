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