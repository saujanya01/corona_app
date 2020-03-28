from flask import Flask, jsonify, request, render_template_string, render_template
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
# CORS(app, support_credentials=True)
# CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)

df = pd.read_excel("https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-geographic-disbtribution-worldwide-2020-03-27.xlsx")
# df = pd.read_excel("./COVID-19-geographic-disbtribution-worldwide-2020-03-22.xlsx")
df = df.rename({'countriesAndTerritories':'location'},axis="columns")

def cumulative(l):
    f=[]
    f=[sum(l[0:i+1]) for i in range(0,len(l))]
    return (f)

@app.after_request
def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   response.headers.add('Access-Control-Allow-Credentials', '*')
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
    i = len(case)-case[::-1].index(0)
    date = date[i-1:]
    case = case[i-1:]
    death = death[i-1:]
    return jsonify({'date':date,'cases':case,'deaths':death})

@app.route('/compare',methods=['GET'])
@cross_origin(supports_credentials=True)
def cmp():
    cnt1 = request.args.get('cnt1')
    cnt2 = request.args.get('cnt2')
    print (cnt1+" : "+cnt2)
    # cnt1 = names.split('1')[0]
    # cnt2 = names.aplit('1')[1]
    date1 = df[df['location']==str(cnt1)]['DateRep'].tolist()[::-1]
    case1 = df[df['location']==str(cnt1)]['Cases'].tolist()[::-1]
    death1 = df[df['location']==str(cnt1)]['Deaths'].tolist()[::-1]
    date2 = df[df['location']==str(cnt2)]['DateRep'].tolist()[::-1]
    case2 = df[df['location']==str(cnt2)]['Cases'].tolist()[::-1]
    death2 = df[df['location']==str(cnt2)]['Deaths'].tolist()[::-1]
    case1 = cumulative(case1)
    case2 = cumulative(case2)
    death1 = cumulative(death1)
    death2 = cumulative(death2)
    x = len(case1)-case1[::-1].index(0)
    y = len(case2)-case2[::-1].index(0)
    y1 = case1[x-1:]
    y2 = case2[y-1:]
    x1 = [i for i in range(0,len(y1))]
    x2 = [i for i in range(0,len(y2))]
    print (str(len(x1))+" : "+str(len(x2)))
    print (str(len(y1))+" : "+str(len(y2)))
    data = {"cnt1":{"day":x1,"case":y1},"cnt2":{"day":x2,"case":y2}}
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)