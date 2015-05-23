from flask import Flask, render_template_string, render_template, request, redirect
app = Flask(__name__)

@app.route('/')
def Home():
    return render_template('index.html')

@app.route('/Create')
def hello():
    return render_template('Create/index.html')

@app.route('/About')
def about():
    return render_template('About/index.html')

@app.route('/Gallery')
def gallery():
    return render_template('Gallery/index.html')

if __name__ == '__main__':
    app.run(debug=True)
