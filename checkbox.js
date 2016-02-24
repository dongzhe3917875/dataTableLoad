var checkboxProcess = (function($) {
    return {

        // 初始化参数
        initParam: function(dataTable, processingButton) {

            var $dataTable = $(dataTable);
            var $processingButton = $(processingButton);

            this.dataTable = $dataTable;
            this.processingButton = $processingButton;
            this.thead = "thead th :checkbox";
            this.tbody = "tbody td :checkbox";
            this.tfoot = "tfoot th :checkbox";
            this.paginate = ".paginate_button";
        },

        // 全部选中事件
        allSelect: function(event) {

            if (this.processingButton.find("a").hasClass('disabled')) {
                this.processingButton.find("a").removeClass('disabled');
            } else {
                this.processingButton.find("a").addClass('disabled');
            }

            if ($(event.target).prop("checked")) {
                $(this.tbody).prop("checked", true);
                $(this.thead).prop("checked", true);
                $(this.tfoot).prop("checked", true);
            }
        },

        // 全部取消事件
        allCancle: function(event) {

            // this.processingButton.find("a").addClass('disabled');

            if (!$(event.target).prop("checked")) {
                $(this.tbody).prop("checked", false);
                $(this.thead).prop("checked", false);
                $(this.tfoot).prop("checked", false);
            }
        },

        // 单个checkbox的change事件
        checkSingle: function(event) {

            if (!$(event.target).prop("checked")) {
                $(this.thead).prop("checked", false);
                $(this.tfoot).prop("checked", false);

                if ($(this.tbody + ":checked").size() != 0) {
                    this.processingButton.find("a").removeClass('disabled');
                } else {
                    this.processingButton.find("a").addClass('disabled');
                }
            } else {
                this.processingButton.find("a").removeClass('disabled');
            }
        },

        // 翻页时的处理
        paginateButtonEmpty: function() {

            $(this.tbody).prop("checked", false);
            $(this.thead).prop("checked", false);
            $(this.tfoot).prop("checked", false);
            this.processingButton.find("a").addClass('disabled');
        },

        // 事件绑定
        eventAdd: function() {

            var _this = this;

            this.dataTable.on("change", _this.thead, $.proxy(_this.allSelect, _this));
            this.dataTable.on("change", _this.tfoot, $.proxy(_this.allSelect, _this));
            this.dataTable.on("change", _this.thead, $.proxy(_this.allCancle, _this));
            this.dataTable.on("change", _this.tfoot, $.proxy(_this.allCancle, _this));
            this.dataTable.on("change", _this.tbody, $.proxy(_this.checkSingle, _this));
            $(document).on("click", _this.paginate, $.proxy(_this.paginateButtonEmpty, _this));
        },

        // 启动 包括初始化 和 绑定事件
        start: function(dataTable, processingButton) {

            this.initParam(dataTable, processingButton);
            this.eventAdd();
        }
    };
})(jQuery);