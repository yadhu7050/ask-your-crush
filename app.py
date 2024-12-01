from flask import Flask, render_template

app = Flask(__name__)

# Route for the main page (Ask Out Your Crush)
@app.route('/')
def home():
    return render_template('index.html')

# Route for the "Yes" response page
@app.route('/yes')
def yes():
    return render_template('yes.html')

# Route for the "No" response page
@app.route('/no')
def no():
    return render_template('no.html')

if __name__ == "__main__":
    app.run(debug=True)
