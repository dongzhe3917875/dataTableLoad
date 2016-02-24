// 创建一个闭包
(function($) {
  // 插件的定义
  $.fn.chooseSelect = function(options) {
    // build main options before element iteration
    var opts = $.extend({}, $.fn.chooseSelect.defaults, options);
    // iterate and reformat each matched element
    return this.each(function() {
      $this = $(this);
      // build element specific options
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      // update element styles
      $this.css({
        backgroundColor: o.background,
        color: o.foreground
      });
      var $showText = $this.find(".show_select_item");
      var $selectItem = $this.find(".select_item");
      var $ulselect = $this.find(".test-select");
      $showText.on("click",function(){
        $ulselect.slideToggle();
      });
    });
  };
  // 私有函数：debugging
  function debug($obj) {
    if (window.console && window.console.log)
      window.console.log('chooseSelect selection count: ' + $obj.size());
  };
  // 定义暴露format函数
  $.fn.chooseSelect.format = function(txt) {
    return '<strong>' + txt + '</strong>';
  };
  // 插件的defaults
  $.fn.chooseSelect.defaults = {
  };
// 闭包结束
})(jQuery);