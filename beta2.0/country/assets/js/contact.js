(function ($) {
    'use strict';

    var form = $('#search'),
        form_data;

    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
            type: 'GET',
            url: "http://18.191.74.90:5000/country/"+form_data.substring(8),
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
                document.getElementById("just-show").innerHTML="Line chart showing trends in European Centre for Disease Prevention and Control dataset."
                var iso2 = datas['iso2'];
                var iso3 = datas['iso3'];
                $.getJSON('https://corona.lmao.ninja/countries/'+iso2,function(data){
                    // document.getElementById("cntname").innerHTML='Country : '+data['countryInfo']['country'].toUpperCase();
                    // document.getElementById("flagurl").src=data['countryInfo']['flag']
                    document.getElementById("counts").style.display="block";
                    document.getElementById("active").innerText=parseInt(data['active'])
                    document.getElementById("total").innerHTML=data['cases']
                    document.getElementById("death").innerHTML=data['deaths']
                    document.getElementById("recovered").innerHTML=data['recovered']
                    $(".num").counterUp({time:1000});
                    var st = '<img id="flagurl" src="'+data['countryInfo']['flag']+'">';
                    document.getElementById("cntname").innerHTML='Country : '+data['country'].toUpperCase()+' '+st;
                });
                value(datas,form_data.substring(8))
            }
        });
    });
    
})(jQuery);


function value(datas,cnt){
    Highcharts.chart('container', {
        chart: {
            height: 600
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Graph of '+cnt
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