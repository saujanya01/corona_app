(function ($) {
    'use strict';

    var form = $('#search'),form1=$('#compare')
        form_data,d;

    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
            type: 'GET',
            url: "http://127.0.0.1:5000/country/"+form_data.substring(8),
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
                value(datas,form_data.substring(8))
            }
        });
    });

    form1.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        console.log(form_data);
        $.ajax({
            type: 'GET',
            url: "http://127.0.0.1:5000/compare/"+form_data,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: 'application/json; charset=utf-8', 
            success : function(datas){
                // var i;
                // for (i=0;i<datas['date'].length;i++)
                // {
                //     datas['date'][i]=datas['date'][i].split('00:00:00')[0];
                // }
                // value(datas,form_data.substring(8))
            }
        });
    });
    
})(jQuery);

function value(datas,cnt){
    Highcharts.chart('container', {

        title: {
            text: 'Graph of '+cnt
        },
    
        subtitle: {
            text: 'Source: European Centre for Disease Prevention and Control<br>Time = 00:00:00 GMT'
        },
    
        yAxis: {
            title: {
                text: 'Number of People'
            }
        },
    
        xAxis: {
            categories: datas['date'],
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
            name: cnt+": Cases",
            data: datas['cases']
        },
        {
            name: cnt+" : Deaths",
            data: datas['deaths']
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