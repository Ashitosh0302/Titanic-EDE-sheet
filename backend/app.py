from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load Titanic dataset (make sure titanic.csv is in backend/data/)
df = pd.read_csv("data/titanic.csv")

@app.route("/")
def home():
    return jsonify({"message": "Titanic EDA Backend Running!"})

@app.route("/summary")
def summary():
    summary_stats = df.describe(include="all").to_dict()
    return jsonify(summary_stats)

@app.route("/columns")
def columns():
    return jsonify({"columns": list(df.columns)})

@app.route("/preview")
def preview():
    return jsonify(df.head(10).to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)
