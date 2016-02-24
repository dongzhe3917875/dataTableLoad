$(document).ready(function() {
    var t = $('#example').dataTable({
        // "paging":false
        "bProcessing": true,
        "ajaxSource": "cgi-bin/process.py",
        "deferRender": true,
        "fnServerData": function(sSource, aoData, fnCallback) {
          $.ajax({
              url: sSource,
              type: "GET",
              dataType: "json",
              success: function(data) {
                fnCallback(add_ajax_data(data));
              }
          })
        },
        "fnCreatedRow": function (nRow, aData, iDataIndex) {
          console.log(nRow);
          // console.log(aData);
        },
        "aoColumnDefs": [{
            "bSortable": true,
            "stype": "numeric",
            "aTargets": [0],
            "bVisible": false
        }, {
            "bSortable": true,
            "sWidth": "200px",
            "aTargets": [4]
        }, {
            "bSortable": true,
            "aTargets": [8]
        }],
        // "aaSorting": [
        //     [7, "desc"]
        // ],
        "aaSortingFixed": [
            [0, 'desc']
        ],
        "oLanguage": {
            sLengthMenu: "每页显示 _MENU_ 条目",
            "sSearch": "搜索:",
            "sInfo": "_START_ - _END_ 条 共 _TOTAL_ 条",
            "sInfoEmpty": "共有0条记录",
            "oPaginate": {
                "sPrevious": "<<",
                "sNext": ">>"
            },
            "sZeroRecords": "没有云主机可以显示"
        },
        "pagingType": "simple_numbers"
    });

    // $.ajax({
    //     url: "cgi-bin/process.py",
    //     type: "POST",
    //     dataType: "json",
    //     success: function(data) {
    //
    //     }
    // })

    var data_source = {

    };

    var context = {
        ifcost: null,
        more_operation: [{
            operation_class: "instance_start",
            operation_id: "1",
            operation_target: "#startModal",
            operation_faclass: "fa fa-play",
            operation_name: "启动"
        }, {
            operation_class: "instance_stop",
            operation_id: "2",
            operation_target: "#stopModal",
            operation_faclass: "fa fa-power-off",
            operation_name: "停止"
        }, {
            operation_class: "createImage",
            operation_id: "3",
            operation_target: "",
            operation_faclass: "fa fa-laptop",
            operation_name: "创建镜像"
        }, {
            operation_class: "editCloud",
            operation_id: "4",
            operation_target: "#editModal",
            operation_faclass: "fa fa-edit",
            operation_name: "编辑"
        }, {
            operation_class: "console",
            operation_id: "4",
            operation_target: " ",
            operation_faclass: "fa fa-terminal",
            operation_name: "编辑"
        }, {
            operation_class: "bandwidthUpdate icon-bandwidth",
            operation_id: "4",
            operation_target: "#editBrandModal",
            operation_faclass: "fa",
            operation_name: "升级带宽"
        }]
    };
    var bat = {
        bat_function: [{
            bat_function_class: "reboot btn btn-success disabled",
            bat_function_modal: "#batrebootModal",
            bat_function_name: "批量重启"
        }, {
            bat_function_class: "change start btn btn-success disabled",
            bat_function_modal: "#batstartModal",
            bat_function_name: "批量启动"
        }, {
            bat_function_class: "stop btn btn-success disabled",
            bat_function_modal: "#batstopModal",
            bat_function_name: "批量停止"
        }, {
            bat_function_class: "terminate btn btn-success disabled",
            bat_function_modal: "#batterminateModal",
            bat_function_name: "批量删除"
        }]
    };

    var item = null,

        wrapper = $("#example_wrapper"),
        $row = wrapper.find(".row").eq(0);
    // 添加创建云主机按钮
    $(Handlebars.compile($("#create-instance-template").html())()).appendTo($row);

    // 添加批量按钮
    $(Handlebars.compile($("#bat-function-template").html())(bat)).appendTo($row);
    var i = 0;
    function add_ajax_data(data) {
      var data_source = data;
      var addArray = [];
      var allArray = [];
      for (item in data_source) {
        // addArray = [];
        // addArray = [i, "<input type='checkbox'><span>" + 1 +"</span>"];
        // i = i+1
        addArray = [0, "<input type='checkbox'><span>"];

        // 处理名称
        var name = data_source[item].name,
        id = item;

        addArray.splice(2, 0, Handlebars.compile($("#td-name-template").html())({
          id: id,
          name: name
        }));

        // 处理ip
        var public_ip = data_source[item].public_ip,
        private_ip = data_source[item].private_ip;

        addArray.splice(3, 0, Handlebars.compile($("#td-ip-template").html())({
          private_ip: private_ip,
          public_ip: public_ip
        }));

        // 处理配置
        var cpu = data_source[item].full_flavor.vcpus,
        ram = data_source[item].full_flavor.ram,
        disk = data_source[item].full_flavor.disk,
        bandwidth = data_source[item].full_flavor.upload_bandwidth;

        addArray.splice(4, 0, Handlebars.compile($("#td-showInfo-template").html())({
          cpu: cpu,
          ram: ram,
          disk: disk,
          upload_bandwidth: bandwidth
        }));

        // 处理操作
        context.ifcost = (data_source[item].billing == "" ? false : true);
        addArray.splice(9, 0, Handlebars.compile($("#td-operation-template").html())(context));


        // 处理镜像
        var imageContext = {
          image: data_source[item].image_name
        }

        addArray.splice(5, 0, Handlebars.compile($("#td-image-template").html())(imageContext));

        // 处理状态
        addArray.splice(6, 0, Handlebars.compile($("#td-status-template").html())({
          status: data_source[item].status
        }));

        // 处理起始时间
        addArray.splice(7, 0, Handlebars.compile($("#td-date-template").html())({
          date: data_source[item].billing == "" ? data_source[item].created : data_source[item].auto_renewal_at
        }));

        addArray.splice(8, 0, Handlebars.compile($("#td-date-template").html())({
          date: data_source[item].billing == "" ? "按量" : "自动续费"
        }));
        allArray.push(addArray);
      }
      return {
        data: allArray
      }
    }



    // add click event
    $(".createcloud").on("click", function() {
        i = i + 1;
        allArray[0][0] = i;
        var oSettings = t.fnSettings();
        console.log(oSettings.aaSortingFixed = [
            [0, 'desc']
        ]);
        var index = $("#example").dataTable().fnAddData(allArray[0], true);

        // $("tr").each(function(index, ele) {
        //         $(this).find("td").eq(0).text(0);
        // });

        oSettings.aaSortingFixed = null;

    });


    //  $(".createcloud").on("click",function(){
    //     allArray.splice(0,0,allArray[0]);
    //     $("#example").dataTable().fnClearTable();
    //     t.rows.add(allArray).draw();
    // });

    // checkbox 选择事件 以及禁用按钮的实时绑定
    checkboxProcess.start("#example", "div.div");
});
