function mapdat(master){
    scl = [[0, 'rgb(150,0,90)'],[0.125, 'rgb(0, 0, 200)'],[0.25,'rgb(0, 25, 255)'],[0.375,'rgb(0, 152, 255)'],[0.5,'rgb(44, 255, 150)'],[0.625,'rgb(151, 255, 0)'],[0.75,'rgb(255, 234, 0)'],[0.875,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];
  var arr1=[]
  var arr2=[]
  var arr3=[]
  var arr4=[]
  for (var i in master){
    arr1.push(master[i][0])//lat
    arr2.push(master[i][1])//lon
    arr3.push(master[i][2])//temp
    arr4.push(master[i][3])//name
  }
  var data=[{
    type:'scattermapbox',
    mode:'markers',
    text:arr3,
    lon:arr2,
    lat:arr1,
    marker:{
      color:arr3,
      colorscale:scl,
      cmin:0,
      cmax:30,
      reversescale:false,
      opacity:0.5,
      size:3,
      colorbar:{
        thickness: 10,
        titleside: 'right',
        outlinecolor: 'rgba(68,68,68,0)',
        ticks: 'outside',
        ticklen: 3,
        shoticksuffix: 'last',
        ticksuffix: 'Celsius',
        dtick: 1
      }
    },
    name:"NA temp"
  }]
  return data
}

function mapcenter(master){
  var arr=[]
  var arr1=[]
  var arr2=[]
  for(var i in master){
    arr1.push(master[i][0])//lat
    arr2.push(master[i][1])//lon
  }
  var latmax=Math.max.apply(Math,arr1)
  var latmin=Math.min.apply(Math,arr1)
  var lonmax=Math.max.apply(Math,arr2)
  var lonmin=Math.min.apply(Math,arr2)  
  var avg1=(latmax+latmin)/2
  var avg2=(lonmax+lonmin)/2
  arr=[avg1,avg2]
  return arr
}

function maplay(master){
 var layout = {
      dragmode: 'zoom', 
      mapbox: {
        center: {
          lat: mapcenter(master)[0], 
          lon: mapcenter(master)[1]
        }, 
        domain: {
          x: [0, 10], 
          y: [0, 10]
        }, 
        style: 'light', 
        zoom: 2.5
      }, 
      margin: {
        r: 0, 
        t: 0, 
        b: 0, 
        l: 0, 
        pad: 0
      }, 
      showlegend: false        
   };
   return layout
}

function getMapParams(jso){
  var end=JSON.parse(jso)
  var obj={
    "data":mapdat(end),
    "layout":maplay(end)
  }
  return obj
}

function loadMap(){
Plotly.setPlotConfig({mapboxAccessToken: 'pk.eyJ1IjoiZGFtbml0eiIsImEiOiJjanU3bnd3ZXYwN3V5NDluejlhMGN5cnJuIn0.qA6fHN10lMkgl_6IIZhzow'});
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
 if (this.readyState === 4 && this.status === 200){
 var mapParams = getMapParams(this.response);
 Plotly.plot('map', mapParams.data, mapParams.layout); }
 };
xhttp.open("GET", "/weather1");
xhttp.send();
}
