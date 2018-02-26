$(function () {
			var currYear = (new Date()).getFullYear();	
			var opt={};
			opt.date = {preset : 'date'};
			//opt.datetime = { preset : 'datetime', minDate: new Date(2012,3,10,9,22), maxDate: new Date(2014,7,30,15,44), stepMinute: 5  };
			opt.datetime = {preset : 'datetime'};
			opt.time = {preset : 'time'};
			opt.default = {
				theme: 'default', //皮肤样式
		        display: 'modal', //显示方式 
		        mode: 'scroller', //日期选择模式
				lang:'zh',
		        startYear:currYear - 10, //开始年份
		        endYear:currYear + 10 //结束年份
			};

			$("#appDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		  	var optDateTime = $.extend(opt['datetime'], opt['default']);
		  	var optTime = $.extend(opt['time'], opt['default']);
		    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
		    $("#appTime").mobiscroll(optTime).time(optTime);	

			$("#appDate1").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
		  	var optDateTime1 = $.extend(opt['datetime'], opt['default']);
		  	var optTime1 = $.extend(opt['time'], opt['default']);
		    $("#appDateTime1").mobiscroll(optDateTime1).datetime(optDateTime1);
		    $("#appTime1").mobiscroll(optTime1).time(optTime1);	
			//下面注释部分是上面的参数可以替换改变它的样式
			// 直接写参数方法
			//$("#scroller").mobiscroll(opt).date(); 
			// Shorthand for: $("#scroller").mobiscroll({ preset: 'date' });
			//具体参数定义如下
		    //{
		    //preset: 'date', //日期类型--datatime --time,
		    //theme: 'ios', //皮肤其他参数【android-ics light】【android-ics】【ios】【jqm】【sense-ui】【sense-ui】【sense-ui】
										//【wp light】【wp】
		    //mode: "scroller",//操作方式【scroller】【clickpick】【mixed】
		    //display: 'bubble', //显示方【modal】【inline】【bubble】【top】【bottom】
		    //dateFormat: 'yyyy-mm-dd', // 日期格式
		    //setText: '确定', //确认按钮名称
		    //cancelText: '清空',//取消按钮名籍我
		    //dateOrder: 'yymmdd', //面板中日期排列格
		    //dayText: '日', 
		    //monthText: '月',
		    //yearText: '年', //面板中年月日文字
		    //startYear: (new Date()).getFullYear(), //开始年份
		    //endYear: (new Date()).getFullYear() + 9, //结束年份
		    //showNow: true,
		    //nowText: "明天",  //
		    //showOnFocus: false,
		    //height: 45,
		    //width: 90,
		    //rows: 3}

        });