from flask import Flask, jsonify, request, render_template_string, render_template
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

df = pd.read_excel("https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-geographic-disbtribution-worldwide-2020-03-29.xlsx")
df = df.rename({'countriesAndTerritories':'location'},axis="columns")

def cumulative(l):
    f=[]
    f=[sum(l[0:i+1]) for i in range(0,len(l))]
    return (f)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/country/<string:name>',methods=['GET'])
@cross_origin(supports_credentials=True)
def data(name):
    dates = df[df['location']==str(name)]['dateRep'].tolist()[::-1]
    date = [i.date() for i in dates]
    cases = df[df['location']==str(name)]['cases'].tolist()[::-1]
    deaths = df[df['location']==str(name)]['deaths'].tolist()[::-1]
    case = cumulative(cases)
    death = cumulative(deaths)
    if (0 in case[::-1]):
        i = len(case)-case[::-1].index(0)
        date = date[i-1:]
        case = case[i-1:]
        death = death[i-1:]
    l = df.location.unique()
    geoid=[]
    cntcode=[]
    for i in range(0,len(l)):
        cntcode.append(df[df['location']==l[i]]['countryterritoryCode'].tolist()[0])
        geoid.append(df[df['location']==l[i]]['geoId'].tolist()[0])
    l = l.tolist()
    return jsonify({'date':date,'cases':case,'deaths':death,'iso2':geoid[l.index(name)],'iso3':cntcode[l.index(name)]})

@app.route('/world',)
@cross_origin(supports_credentials=True)
def world():
    l=df['dateRep'].unique()
    l.sort()
    keys = []
    wrld_cases = []
    wrld_deaths = []
    d=0
    c=0
    for i in l:
        d=d+df[df['dateRep']==i]['deaths'].sum()
        c=c+df[df['dateRep']==i]['cases'].sum()
        keys.append(str(i).split('T')[0])
        wrld_cases.append(str(c))
        wrld_deaths.append(str(d))
    return jsonify({"keys":keys,"cases":wrld_cases,"deaths":wrld_deaths})

if __name__ == '__main__':
    app.run(debug=True)