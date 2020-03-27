(function ($) {
    'use strict';

    var form = $('#search'),
        form_data,d;

    // // Success function
    // function done_func(response) {
    //     message.fadeIn().removeClass('alert-danger').addClass('alert-success');
    //     message.text("Success");
    //     setTimeout(function () {
    //         message.fadeOut();
    //     }, 2000);
    //     form.find('input:not([type="submit"]), textarea').val('');
    // }

    // // fail function
    // function fail_func(data) {
    //     message.fadeIn().removeClass('alert-success').addClass('alert-danger');
    //     message.html("Message not sent :(<br>Try after some time");
    //     setTimeout(function () {
    //         message.fadeOut();
    //     }, 2000);
    // }
    
    form.submit(function (e) {
        e.preventDefault();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'application/json');
        // headers.append('Origin','http://127.0.0.1:5000');
        form_data = $(this).serialize();
        console.log(form_data.substring(8));
        $.ajax({
            type: 'GET',
            // url: "http://18.219.210.136:5000/country/"+form_data.substring(8),
            url: "http://127.0.0.1:5000/country/"+form_data.substring(8),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: 'application/json; charset=utf-8',
            // headers: { 'Access-Control-Allow-Origin':'*' }, 
            success : function(datas){
                console.log(datas['date'][0].split('00:00:00')[0]);
                var i;
                for (i=0;i<datas['date'].length;i++)
                {
                    datas['date'][i]=datas['date'][i].split('00:00:00')[0];
                }
                value(datas,form_data.substring(8))
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
            // categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
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
            // data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            data: datas['cases']
        },
        {
            name: cnt+" : Deaths",
            // data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
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