from flask import Flask, jsonify, request, render_template_string, render_template
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
# CORS(app, support_credentials=True)
# CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)

df = pd.read_excel("https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-geographic-disbtribution-worldwide-2020-03-23.xlsx")
# df = pd.read_excel("./COVID-19-geographic-disbtribution-worldwide-2020-03-22.xlsx")
df = df.rename({'Countries and territories':'location'},axis="columns")

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
# @app.route('/',methods=['GET','POST'])
# def search():
#     languages = [{'name':'c++'},{'name':'javascript'},{'name':'python'}]
#     # df = pd.read_excel("https://www.ecdc.europa.eu/sites/default/files/documents/COVID-19-geographic-disbtribution-worldwide-2020-03-22.xlsx")
#     # df = df.rename({'Countries and territories':'location'},axis="columns")
#     country=request.form
#     date = df[df['location']==str(country['country'])]['DateRep'].tolist()[::-1]
#     cases = df[df['location']==str(country['country'])]['Cases'].tolist()[::-1]
#     deaths = df[df['location']==str(country['country'])]['Deaths'].tolist()[::-1]
#     case = cumulative(cases)
#     death = cumulative(deaths)
#     # print(case)
#     # langs = [language for language in languages if language['name']==name]
#     return jsonify({'date':date,'cases':case,'deaths':death})

@app.route('/country/<string:name>',methods=['GET'])
@cross_origin(supports_credentials=True)
def data(name):
    dates = df[df['location']==str(name)]['DateRep'].tolist()[::-1]
    date = [i.date() for i in dates]
    cases = df[df['location']==str(name)]['Cases'].tolist()[::-1]
    deaths = df[df['location']==str(name)]['Deaths'].tolist()[::-1]
    case = cumulative(cases)
    death = cumulative(deaths)
    return jsonify({'date':date,'cases':case,'deaths':death})

if __name__ == '__main__':
    app.run(debug=True)