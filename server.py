from flask import Flask, render_template_string, render_template, request, redirect
import string
app = Flask(__name__)

class Sandwich(object):
    def __init__(self, name = "", creator = "", Type = "", ingredients = [], likes = 0, dislikes = 0):
        self.name = name
        self.creator = creator
        self.Type = Type
        self.ingredients = ingredients
        self.likes = likes
        self.dislikes = dislikes

Sandwiches = []
f = open("SandwichList.txt", 'r')
SList = f.readlines()
f.close()
for x in range(0,len(SList)):
    sep = SList[x].split('::')
    Sandwiches.append(Sandwich(sep[0],sep[1],sep[2],sep[3].split(','),sep[4],sep[5]))

def swap(a,b,l):
    c = l[a]
    l[a] = l[b]
    l[b] = c

def partition(a,start,end):
    s = start
    e = end
    pivot = int(a[start].likes)-int(a[start].dislikes)
    while s < e:
        while int(a[s].likes)-int(a[s].dislikes)<pivot:
            s+=1
        while int(a[e].likes)-int(a[e].dislikes)>pivot:
            e-=1
        if s < e:
            swap(s,e,a)
            s+=1
            e-=1
    return e

def quickSort( l, start, end):
    if start < end:
        n = partition(l,start,end)
        quickSort(l,start,n)
        quickSort(l,n+1,end)
        
def sortByNewest():
    f = open("SandwichList.txt",'r')
    SList = f.readlines()
    f.close()
    for x in range(0,len(SList)):
        sep = SList[x].split('::')
        Sandwiches[x]=Sandwich(sep[0],sep[1],sep[2],sep[3].split(','),sep[4],sep[5])

def sortByDislikes():
    sortByNewest()
    quickSort(Sandwiches,0,len(Sandwiches)-1)

def sortByLikes():
    sortByNewest()
    sortByDislikes()
    Sandwiches.reverse()

def sortByType(param):
    sortByNewest()
    i = 0
    while i < len(Sandwiches):
        if Sandwiches[i].Type==param:
            Sandwiches.insert(0,Sandwiches.pop(i))
        i+=1
    
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

@app.route('/Success')
def success():
    print request.args['ingredients']
    rawIngredients = request.args['ingredients']
    Sname = request.args['name']
    Smaker = request.args['user']
    choppedIng = rawIngredients.split(', ')
    choppedIng = choppedIng[0:len(choppedIng)-1]
    f = open('SandwichList.txt','a')
    s = ""
    s += Sname+"::"+Smaker+"::"+choppedIng[0]+"::"
    for x in range(1,len(choppedIng)):
        if x == 1:
            choppedIng[x] = string.replace(choppedIng[x],"-"," ")
            i = choppedIng[x].find(' ')
            choppedIng[x] = choppedIng[x][i+1::]
        s += choppedIng[x]
        if x!=len(choppedIng)-1:
            s+=","
    s +="::0::0\n"
    f.write(s)
    return render_template('Success/index.html')

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
        Sandwiches.append(Sandwich(sep[0],sep[1],sep[2],sep[3].split(','),sep[4],sep[5]))
    for x in range(0,len(Sandwiches)):
        s +='        <div class="col-md-4 col-sm-6 col-xs-12">\n'
        s +='          <div class="sandwich">\n'
        s +='            <div class="sandwich-picture">'
        s +='            <div class="ing-contain">'
        if Sandwiches[x].ingredients[0]=="White":
            s+='<div id="classic-white-small"></div>'
        elif Sandwiches[x].ingredients[0]=="Plain":
            s+='<div id="bagel-top-small"></div>'
        elif Sandwiches[x].ingredients[0]=="Italian":
            s+='<div id="hero-italian-small"></div>'
        elif Sandwiches[x].ingredients[0]=="Sesame":
            s+='<div id="burger-sesame-small"></div>'
        for y in range(1,len(Sandwiches[x].ingredients)):
            s+='<div id="' + Sandwiches[x].ingredients[y].lower() + '-display-small"></div>'
        if Sandwiches[x].ingredients[0]=="White":
            s+='<div id="classic-white-small"></div>'
        elif Sandwiches[x].ingredients[0]=="Plain":
            s+='<div id="bagel-bot-small"></div>'
        elif Sandwiches[x].ingredients[0]=="Italian":
            s+='<div id="hero-italian-bot-small"></div>'
        elif Sandwiches[x].ingredients[0]=="Sesame":
            s+='<div id="burger-bot-small"></div>'
        s +='</div>\n'
        s +='</div>\n'
        s +='            <h2 class="sandwich-name">' + Sandwiches[x].name + '</h2>\n'
        s +='            <div class="sandwich-receipt">\n'
        s +='              <h2 class="receipt-title">SubHub</h2>\n'
        s +='              <h2 class="server-name">'+'Server: ' +Sandwiches[x].creator+'</h2>\n'
        s +='              <h2 class="rating">' + 'Rating: ' + str(int(Sandwiches[x].likes)-int(Sandwiches[x].dislikes)) + '</h2>\n'
        s +='              <h2 class="ingredients">Ingredients</h2>\n'
        s +='              <ul class="ingredients-list">\n'
        for y in range(0,len(Sandwiches[x].ingredients)):
            s +='<li>'
            if y == 0:
                s +='Bread: '
            s +=Sandwiches[x].ingredients[y]+'</li>\n'
        s +='</ul>\n'
        s +='            </div>\n'
        s +='          </div>\n'
        s +='        </div>\n'
        if (x + 1)%3 == 0:
            s+='      </div>'
            s+='      <div class="row">'
    g += s
    g += render_template('Gallery/footers.html')
    return g

if __name__ == '__main__':
    app.run(debug=True)

