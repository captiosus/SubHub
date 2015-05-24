from flask import Flask, render_template_string, render_template, request, redirect
app = Flask(__name__)

class Sandwich(object):
    def __init__(self, name = "", creator = "", ingredients = [], rating = 0):
        self.name = name
        self.creator = creator
        self.ingredients = ingredients
        self.rating = rating

Sandwiches = []
f = open("SandwichList.txt", 'r')
SList = f.readlines()
f.close()
for x in range(0,len(SList)):
    sep = SList[x].split('::')
    Sandwiches.append(Sandwich(sep[0],sep[1],sep[2].split(','),sep[3]))

def swap(a,b,l):
    c = l[a]
    l[a] = l[b]
    l[b] = c

def partition(a,start,end,param):
    pivot = a[start].param
    s = start
    e = end
    while s < e:
        while a[s].param<pivot:
            s+=1
        while a[e].param>pivot:
            e-=1
        if s < e:
            swap(s,e,a)
            s+=1
            e-=1
    return e

def quickSort( l, start, end, param ):
    if start < end:
        n = partition(l,start,end,param)
        quickSort(l,start,n,param)
        quickSort(l,n+1,end,param)

def nameCheck(n):
    for x in range(0,len(Sandwiches)):
        if Sandwiches[x].name==n:
            return False
    return True

def ingredCheck(l):
    for x in range(0,len(Sandwiches)):
        if len(l)==len(Sandwiches[x]):
            for y in range(0,len(Sandwiches[x])):
                if not l[y] in Sandwiches[x]:
                    return True
    return False
            
@app.route('/')
def Home():
    return render_template('index.html')

@app.route('/Create', methods=['POST', 'GET'])
def create():
    if request.method=='GET':
        return render_template('Create/index.html')
    #else:
        #if request.form["name"]=="" or request.form["creator"]=="":
            #return render_template('Create/error.html')
        #elif !nameCheck()
        #elif ingredCheck()
        #else:
            #f = open('SandwichList.txt','a')
            #f.write(stuff)
            #f.close()
            #return render_template('Create/success.html')

@app.route('/About')
def about():
    return render_template('About/index.html')

@app.route('/Gallery')
def gallery():
    g = ""
    g += render_template('Gallery/headers.html')
    s = ""
    Sandwiches = []
    f = open("SandwichList.txt", 'r')
    SList = f.readlines()
    f.close()
    for x in range(0,len(SList)):
        sep = SList[x].split('::')
        Sandwiches.append(Sandwich(sep[0],sep[1],sep[2].split(','),sep[3]))
    for x in range(0,len(Sandwiches)):
        s +='        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">\n'
        s +='          <div class="sandwich">\n'
        s +='            <h2 class="sandwich-name">'
        s +=Sandwiches[x].name
        s +='</h2>\n'
        s +='            <div class="sandwich-picture"></div>\n'
        s +='            <h2 class="ingredients">Ingredients</h2>\n'
        s +='            <p class="ingredients-list">'
        for y in range(0,len(Sandwiches[x].ingredients)):
            s+=Sandwiches[x].ingredients[y]
            if y != len(Sandwiches[x].ingredients)-1:
                s+=", "
        s +='</p>\n'
        s +='          </div>\n'
        s +='        </div>\n'
        if (x + 1)%4 == 0:
            s+='      </div>'
            s+='      <div class="row">'
    g += s
    g += render_template('Gallery/footers.html')
    return g

if __name__ == '__main__':
    app.run(debug=True)

