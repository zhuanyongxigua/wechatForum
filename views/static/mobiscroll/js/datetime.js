(function ($) {
    var theme=''
    var display='center'
    var lang='zh'
    function yearSet(startYear,endYear){
        var years=[]
        for(var i=startYear;i<=endYear;i++){
        	var obj={}
        	obj.display=i + '年'
        	obj.value=i + '年'
            years.push(obj)
        }
        return years
    }

/*    var seasons=['1-12月','1-9月','1-6月','1-3月']*/
    function seasonsSet(){
    	var seasons=[]
    	for(var i=1;i<=4;i++){
    		var obj={}
    		obj.display='1-'+i*3+'月'
    		obj.value=i
    		seasons.push(obj)
    	}
    	return seasons
    }
    function monthsSet(){
    	var months=[];
    	for(var i=1;i<=12;i++){
    		var obj={};
    		obj.display = i +'月';
    		obj.value= i +'月';
    		months.push(obj);
    	}
    	return months;
    }
    function init() {
        mobiscroll.scroller('#test', {
            theme: theme,
            circular: false,
            display: display,
            lang: lang,
            wheels: [
                [{
                    label: '年',
                    data: yearSet(2016,2017)
                }, {
                    label: '月',
                    data: monthsSet()
                }]
            ]
        });
    }
    init();

})(mobiscroll.$);