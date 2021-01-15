import bottle
import weather

@bottle.route("/test.js")
def mappy():
  return bottle.static_file("test.js",root=".")

@bottle.route("/test1.js")
def mappy1():
  return bottle.static_file("test1.js",root=".")
  
@bottle.route("/")
def indexy():
  return bottle.static_file("index.html",root=".")

@bottle.route("/weather")
def weatherdata():
  APIkey="&APPID=089c73d2b89b5971e970cf984abb5f39"
  print("Please enter data for the plot.")
  lonleft=input("Plot-lon-left? ")
  latbot=input("Plot-lat-bottom? ")
  lonright=input("Plot-lon-right? ")
  lattop=input("Plot-lat-top? ")
  query="bbox="+lonleft+","+latbot+","+lonright+","+lattop+","+"10"
  url="http://api.openweathermap.org/data/2.5/box/city?"+query+APIkey
  print("http://api.openweathermap.org/data/2.5/box/city?"+query+APIkey)
  return weather.weather_data(url)

@bottle.route("/weather1")
def weatherdata1():
  APIkey="&APPID=089c73d2b89b5971e970cf984abb5f39"
  print("Please enter data for the map")
  lonleft=input("Map-lon-left? ")
  latbot=input("Map-lat-bottom? ")
  lonright=input("Map-lon-right? ")
  lattop=input("Map-lat-top? ")
  query="bbox="+lonleft+","+latbot+","+lonright+","+lattop+","+"10"
  url="http://api.openweathermap.org/data/2.5/box/city?"+query+APIkey
  print("http://api.openweathermap.org/data/2.5/box/city?"+query+APIkey)
  return weather.weather_data(url)

#lon-left,lat-bottom,lon-right,lat-top
#NYC:-75,40,-73,42
#Murica:-125,26,-67,49
#Paris:1.5,48,3.4,49.1
#EU coords:-16,34,41,56

bottle.run(host="0.0.0.0",port=8080,debug=True)