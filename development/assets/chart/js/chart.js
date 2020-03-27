Highcharts.chart('container', {

    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

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
            url: "http://127.0.0.1:5000/country/"+form_data.substring(8),
            headers : {
                Accept : 'application/json',
                Origin : 'http://127.0.0.1:5000',
                
            }
        });
    });
    
})(jQuery);