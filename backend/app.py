from flask import Flask, request, jsonify
import yfinance as yf


app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        symbol = request.json.get('text', '')
        symbol += ".NS"
        stock = yf.Ticker(symbol)
        df = stock.history(period="max")
        data = {}
        for date, price in df['Close'].items():
            data[date.strftime('%Y-%m-%d')] = price
        return jsonify(data)
    except (KeyError, TypeError, ValueError) as e:
        print(str(e))
        return jsonify({'error': 'An error occurred while processing the request'})


if __name__ == '__main__':
    app.run(debug=True)
