from flask import Flask, jsonify, request
from flask_cors import CORS
from quiz_data import QUIZ, COFFEE_TYPES

app=Flask(__name__)
CORS(app)

@app.route('/api/quiz', methods=['GET'])
def get_quiz():
    payload=[
        {
            'id': q['id'],
            'question': q['question'],
            'options': [{'key': opt[0], 'text': opt[1]} for opt in q['options']]
        }
        for q in QUIZ
    ]
    return jsonify({'quiz':payload})
@app.route('/api/result', methods=['POST'])
def compute_result():
    data=request.json or {}
    counts= {k:0 for k in COFFEE_TYPES.keys()}
    for q in QUIZ:
        key=data.get(f'q{q["id"]}')
        if key in counts:
            counts[key]+=1
    
    best=max(counts.items(),key=lambda kv:(kv[1],kv[0]))
    coffee_key=best[0]
    coffee=COFFEE_TYPES[coffee_key]

    return jsonify({
        'coffee_key': coffee_key,
        "coffee_name": coffee['name'],
        "coffee_desc": coffee['desc'],
        "counts": counts    
    })

if __name__=='__main__':
    app.run(debug=True) 

    
     