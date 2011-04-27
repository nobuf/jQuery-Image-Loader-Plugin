/*!
 *  (c) 2011 Nobu Funaki, @zuzara
 *  This plugin may be freely distributed under the MIT license.
 */
;(function($) {

    $.fn.imageLoader = function(options){
        var opts = $.extend({}, $.fn.imageLoader.defaults, options || {});
        $(this).each(function(index, value){
            var $element = $(value);
            var imagePath = $element.data(opts.actualImagePathKey);
            if (!imagePath) {
                return;
            }
            $element.addClass(opts.loadingClassName);
            $('<img />')
                .attr('src', imagePath)
                .load(function(){
                    $element.removeClass(opts.loadingClassName);
                    if (opts.useBackgroundImage) {
                        $element.css('background-image', 'url(' + imagePath + ')');
                    } else {
                        $element.append($(this));
                    }
                }).error(function(){
                    $element.removeClass(opts.loadingClassName).addClass(opts.brokenClassName);
                });
        });
    };
    $.fn.imageLoader.defaults = {
        actualImagePathKey: 'image',
        loadingClassName:   'loading',
        brokenClassName:    'broken',
        useBackgroundImage: false
    };
})(jQuery);
