(function ($) {
    'use strict';

    var form = $('#search'),
        form_data;

    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        var cnt1=form_data.split('&')[0].split('=')[1]
        var cnt2=form_data.split('&')[1].split('=')[1]
        var d1={}
        var d2={}
        var date=[]
        console.log(form_data);
        $.ajax({
            type: 'GET',
            url: "http://18.219.210.136:5000/country/"+cnt1,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: 'application/json; charset=utf-8', 
            success : function(datas){
                var i;
                for (i=0;i<datas['date'].length;i++)
                {
                    datas['date'][i]=datas['date'][i].split('00:00:00')[0];
                }
                d1=datas
                $.ajax({
                    type: 'GET',
                    url: "http://18.219.210.136:5000/country/"+cnt2,
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    contentType: 'application/json; charset=utf-8', 
                    success : function(datas){
                        var i;
                        for (i=0;i<datas['date'].length;i++)
                        {
                            datas['date'][i]=datas['date'][i].split('00:00:00')[0];
                        }
                        d2=datas
                        if (d2['date'].length>d1['date'].length)
                        {
                            date=d2['date'];
                        }
                        else
                        {
                            date=d1['date'];
                        }
                        value(date,d1,d2,cnt1,cnt2)
                    }
                });
            }
        });
    });
    
})(jQuery);


function value(x,d1,d2,cnt1,cnt2){
    Highcharts.chart('container', {
        chart: {
            height: 600
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Comparison of : '+cnt1+' & '+cnt2
        },
    
        subtitle: {
            text: 'Source: European Centre for Disease Prevention and Control<br>Time = 00:00:00 GMT<br><p style="color:blue"> Click on particular legend to make that plot disappear</p>'
        },
    
        yAxis: {
            title: {
                text: 'Number of People'
            }
        },
    
        xAxis: {
            categories: x,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        series: [{
            name: cnt1+": Cases",
            data: d1['cases']
        },
        {
            name: cnt1+" : Deaths",
            data: d1['deaths']
        },
        {
            name: cnt2+": Cases",
            data: d2['cases']
        },
        {
            name: cnt2+": Deaths",
            data: d2['deaths']
        }
        ],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}