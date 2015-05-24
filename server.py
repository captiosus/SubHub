from flask import Flask, render_template_string, render_template, request, redirect
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
    
sortByType("Sandwich")
for x in range(0,len(Sandwiches)):
    if Sandwiches[x].Type=="Sandwich":
        print Sandwiches[x].name
sortByType("Classic")
for x in range(0,len(Sandwiches)):
    if Sandwiches[x].Type=="Classic":
        print Sandwiches[x].name
sortByNewest()
for x in range(0,len(Sandwiches)):
    print Sandwiches[x].name
sortByLikes()
for x in range(0,len(Sandwiches)):
    print Sandwiches[x].name
    
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
        Sandwiches.append(Sandwich(sep[0],sep[1],sep[2],sep[3].split(','),sep[4],sep[5]))
    for x in range(0,len(Sandwiches)):
        s +='        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">\n'
        s +='          <div class="sandwich">\n'
        s +='            <h2 class="sandwich-name">'
        s +=Sandwiches[x].name
        s +='</h2>\n'
        s +='<h2 class="creator-name">Creator: '
        s +=Sandwiches[x].creator
        s +='</h2>\n'
        s +='            <div class="sandwich-picture"></div>\n'
        for y in range(0,len(Sandwiches[x].ingredients)):
            s+='<div class="' + Sandwiches[x].ingredients[y] + '"></div>\n'
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

