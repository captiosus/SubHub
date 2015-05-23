from flask import Flask, render_template, request, rediret
app = Flask(__name__)

@app.route('/')
def Home():
    return 'Home Page'

@app.route('/Create')
def hello():
    return '...'

@app.route('/Explore')
def explore():
    return '...'

@app.route('/About')
def about():
    return '...'

if __name__ == '__main__':
    app.run(debug=True)
