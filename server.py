from flask import Flask, render_template, request, rediret
app = Flask(__name__)

@app.route('/')
def Main():
    return 'Main Page'

@app.route('Another Page')
def hello():
    return 'Hello World'

if __name__ == '__main__':
    app.run(debug=True)
