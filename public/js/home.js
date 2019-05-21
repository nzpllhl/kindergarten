$("#nav li .ajax-link").click(function () {
    if ($(this).parent().hasClass("active") == false) {
        $("#nav li").removeClass("active");
        $(this).parent().addClass("active");
    }
});