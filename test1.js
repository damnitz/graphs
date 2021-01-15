function mapdata(master){
  var arr1=[]
  var arr2=[]
  var arr3=[]
  for (var i in master){
    arr1.push(master[i][0])//lat
    arr2.push(master[i][2])//temp
    arr3.push(master[i][3])//name
  }
  var trace1={
    x:arr1,
    y:arr2,
    mode:"markers+text",
    type:"scatter",
    name:"Cities",
    text:arr3,
    textposition:"top center",
    textfont:{
      family:'Times New Roman'
    },
    marker:{size:10}
  }
  var data=[trace1]
  return data
}

function maplayout(master){
  var arr=[]
  var arr1=[]
  var arr2=[]
  for(var i in master[i]){
    arr1.push(master[i][0])
    arr2.push(master[i][1])
    arr.push(master[i][2])
  }
  var latmax=Math.max.apply(Math,arr1)
  var latmin=Math.min.apply(Math,arr1)
  var tempmax=Math.max.apply(Math,arr)
  var tempmin=Math.min.apply(Math,arr)
  var layout={
    xaxis:{
      range:[latmin,latmax]
    },
    yaxis:{
      range:[tempmin,tempmax]
    },
    legend:{
      y:0.25,
      yref:"paper",
      font:{
        family: 'Arial, sans-serif',
        size: 20,
        color: 'grey',
      }
    },
    title:"Temperatures of Cities "
  }
  return layout
}

function getPlotParams(jso){
  var end=JSON.parse(jso)
  var obj={
    "data":mapdata(end),
    "layout":maplayout(end)
  }
  return obj
}

function loadMap1(){
  var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function (){
    if (this.readyState === 4 && this.status === 200){
    var mapParams = getPlotParams(this.response);
    console.log(mapParams);
    Plotly.plot('map1', mapParams.data, mapParams.layout); }
 };
xhttp.open("GET", "/weather");
xhttp.send();
}


