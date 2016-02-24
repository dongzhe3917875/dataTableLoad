# print("Content-type:text/html\r\n")

print("Content-type:application/json\r\n")
print('\n')
import cgi
import json
import codecs
with open("data/data.json","r",encoding= 'utf-8') as f:
    jsons = f.read()
# print(jsons)
print(json.dumps(json.loads(jsons)))
