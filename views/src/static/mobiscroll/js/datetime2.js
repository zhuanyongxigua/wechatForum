(function ($) {
    var theme=''
    var display='center'
    var lang='zh'
    function yearSet(startYear,endYear){
        var years=[]
        for(var i=startYear;i<=endYear;i++){
            years.push(i + '年')
        }
        return years
    }
    /*     function seasonSet(num){
     var seasons=[]
     function season(index){
     var obj={}
     obj.value=this.display
     return obj
     }
     for(var i=1;i<=num;i++){
     seasons.push(season(i))
     }
     return seasons
     }*/
    var seasons=['1-12月','1-9月','1-6月','1-3月']

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
                    label: '季度',
                    data: seasons
                }]
            ]
        });
    }
    init();

})(mobiscroll.$);