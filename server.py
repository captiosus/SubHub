from flask import Flask, render_template_string, render_template, request, redirect
app = Flask(__name__)







@app.route('/')
def Home():
    return render_template('index.html')

@app.route('/Create', methods=['POST', 'GET'])
def create():
    return render_template('Create/index.html')
    if request.method == 'POST':
        Sandwich = request.form['sandwich']
        Ingredients = request.form['ingredients']

@app.route('/About')
def about():
    return render_template('About/index.html')

@app.route('/Gallery')
def gallery():
    f = open("SandwichList.txt", 'r')
    SList = f.readlines();
    f.close();
    g = ""
    g += render_template('Gallery/headers.html')
    s = ""
    for x in range(0,len(SList)):
        separate = SList[x].split(':')
        s +='        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">\n'
        s +='          <div class="sandwich">\n'
        s +='            <h2 class="sandwich-name">'
        s +=separate[0]
        s +='</h2>\n'
        s +='            <div class="sandwich-picture"></div>\n'
        s +='            <h2 class="ingredients">Ingredients</h2>\n'
        s +='            <p class="ingredients-list">'
        s +=separate[1]
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

