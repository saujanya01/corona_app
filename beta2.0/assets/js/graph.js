$.getJSON('http://18.191.74.90:5000/world',function(data){
    for (i=0;i<data['cases'].length;i++)
    {
        data['cases'][i]=parseInt(data['cases'][i]);
    }
    for (i=0;i<data['deaths'].length;i++)
    {
        data['deaths'][i]=parseInt(data['deaths'][i]);
    }
    document.getElementById("just-show").innerHTML="Line chart showing trends in European Centre for Disease Prevention and Control dataset."
    plot(data)
});

function plot(datas){
Highcharts.chart('container', {
    chart: {
        height: 600
    },
    credits: {
        enabled: false
    },
    title: {
        text: 'Global Graph of COVID-19 Cases'
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
        categories: datas['keys'],
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
        name: "Cases : Global",
        data: datas['cases']
    },
    {
        name: "Deaths : Global",
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