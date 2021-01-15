import json
import urllib.request
def weather_data(url):
  list1=[]
  list2=[]
  total=0
  response=urllib.request.urlopen(url)
  content_string=response.read().decode()
  content=json.loads(content_string)
  for i in content:
    for n in content["list"]:
      if("coord"in n) and ("main"in n):
        x=n["coord"]["Lat"]
        y=n["coord"]["Lon"]
        z=n["main"]["temp"]
        a=n["name"]
        test=[x,y,z,a]
        list1.append(test)
  end=json.dumps(list1)
  return end


