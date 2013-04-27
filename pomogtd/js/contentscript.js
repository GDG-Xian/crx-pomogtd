(function($) {
    var TPLS = {
        MENUITEM_GTASKS: '' 
            + '<li id="gtasks_preference">'
            + '  <label><input type="checkbox" name="gtasks_switch">使用Google Tasks替换土豆</label>'
            + '</li>',
        GTASKS: ''
            + '<div id="gtasks" class="container-outer">'
            + '  <div class="preloader">Loading Google Tasks ...</div>'
            + '  <iframe id="gtasks_iframe" src="about:blank" frameborder="0"></iframe>'
            + '</div>'
    };

    function install_extra_menuitems() {
        $('.preferences ul').prepend(TPLS.MENUITEM_GTASKS);
        $('#gtasks_preference :checkbox').on('click', function() {
            var flag = $(this).prop('checked');
            toggle_gtasks(flag);
            $(this).parents('.preferences-container').removeClass('open');
        }); 
    }

    function toggle_gtasks(flag) {
        var $todo      = $('#todo');
        if (flag) {
            var $gtasks    = $(TPLS.GTASKS);
            var $preloader = $gtasks.find('.preloader');

            $todo.hide();
            $gtasks.insertAfter($todo);
            $('#gtasks_iframe').load(function() {
                this.style.display = 'block';
                $preloader.hide();
            }).attr('src', 'https://mail.google.com/tasks/ig');
        } else {
            $('#gtasks').remove();
            $todo.show();
        }
        chrome.runtime.sendMessage({ type: 'set-option', name: 'show_gtasks', value: flag});
    }

    $(function() {
        install_extra_menuitems(); 

        chrome.runtime.sendMessage({ type: 'get-option', name: 'show_gtasks'}, function(show_gtasks) {
            var flag = (show_gtasks === 'true') || false;
            toggle_gtasks(flag);  
            $('#gtasks_preference :checkbox').prop('checked', flag);
        });
    });
})(jQuery);
