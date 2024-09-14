from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from groq import Groq


load_dotenv()

app = Flask(__name__)
CORS(app)  


client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        
        # Create a chat completion request
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": user_message},
            ],
            model="llama3-8b-8192",
        )
        
        response_message = chat_completion.choices[0].message.content
        return jsonify({'response': response_message})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'response': "Sorry, I couldn't process your request."}), 500

if __name__ == '__main__':
    app.run(port=5001)
