$.getJSON('https://corona.lmao.ninja/all',function(data){
document.getElementById("active").innerHTML=data['active']
document.getElementById("total").innerHTML=data['cases']
document.getElementById("death").innerHTML=data['deaths']
document.getElementById("recovered").innerHTML=data['recovered']
//$(".num").counterUp({time:1000});
});