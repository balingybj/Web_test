$(function () {
    pageInitModule.setSidebar();
});

/*
* init page when page load
*/
var pageInitModule = (function (mod) {

    mod.setSidebar = function () {
        $('[data-target="sidebar"]').click(function () {
            var asideleft = $(".sidebar").offset().left;
            if (asideleft == 0) {
                $(".sidebar").animate({ left: -320 });
                $(".main").animate({ marginLeft: -320 });
            }
            else {
                $(".sidebar").animate({ left: 0 });
                $(".main").animate({ marginLeft: 0 });
            }
        });
    }
    return mod;
})(window.pageInitModule || {});
