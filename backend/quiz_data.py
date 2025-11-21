# quiz_data.py

COFFEE_TYPES = {
    'espresso': {
        'name': 'Espresso',
        'desc': 'Strong, bold, and no-nonsense — you move with intensity and purpose.'
    },
    'latte': {
        'name': 'Latte',
        'desc': 'Comforting, mellow, and warm — you love soft vibes and emotional comfort.'
    },
    'cold_brew': {
        'name': 'Cold Brew',
        'desc': 'Refreshing, modern, and experimental — you enjoy trends and staying active.'
    },
    'cappuccino': {
        'name': 'Cappuccino',
        'desc': 'Balanced and elegant — you like routine with a hint of luxury.'
    },
    'mocha': {
        'name': 'Mocha',
        'desc': 'Sweet, playful, and dramatic — you mix comfort with excitement.'
    },
    'americano': {
        'name': 'Americano',
        'desc': 'Simple, practical, and adaptable — you value clarity and stability.'
    },
    'filter_coffee': {
        'name': 'South Indian Filter Coffee (Kappi)',
        'desc': 'Grounded, nostalgic, and soulful — you have tradition, warmth, and authenticity in your personality.'
    },
    'chai': {
        'name': 'Masala Chai',
        'desc': 'Warm, friendly, and expressive — you’re comforting, nostalgic, and full of stories.'
    }
}


QUIZ = [
    {
        'id': 1,
        'question': "It’s Monday morning. What’s your first instinct?",
        'options': [
            ('espresso', "Get up instantly and fix my life in 10 minutes."),
            ('latte', "Play soft music and pretend it’s Sunday."),
            ('cold_brew', "Hit the gym because discipline > feelings."),
            ('mocha', "Crave something sweet to restart my brain."),
            ('filter_coffee', "Hot kappi first. Everything else later."),
            ('chai', "Sip chai slowly and scroll through messages.")
        ]
    },
    {
        'id': 2,
        'question': "Pick a weather vibe that matches your energy:",
        'options': [
            ('espresso', "Cold, sharp winter morning."),
            ('latte', "Soft, cozy, drizzly rain."),
            ('cold_brew', "Bright sunny chaos — peak Indian summer."),
            ('chai', "Monsoon evening with pakoras."),
            ('filter_coffee', "Warm Chennai morning with the smell of kappi."),
            ('americano', "Thunderstorm drama but aesthetic.")
        ]
    },
    {
        'id': 3,
        'question': "What’s your go-to comfort activity?",
        'options': [
            ('latte', "Reading or journaling with light music."),
            ('mocha', "Watching a binge-worthy series."),
            ('cold_brew', "A long walk or solo scooty ride."),
            ('filter_coffee', "Talking with family or listening to old songs."),
            ('chai', "Gossiping with friends over chai time."),
            ('espresso', "Planning world domination at 2x speed.")
        ]
    },
    {
        'id': 4,
        'question': "Someone gives you a surprise day off. What do you do?",
        'options': [
            ('latte', "Sleep till my soul resets."),
            ('cappuccino', "Explore new cafés or cute places."),
            ('cold_brew', "Finish goals I kept avoiding."),
            ('mocha', "Hang out with friends and take aesthetic pics."),
            ('chai', "Chai stall + long heartfelt conversations."),
            ('filter_coffee', "Go for a peaceful nostalgic day — maybe temple visit or old playlist.")
        ]
    },
    {
        'id': 5,
        'question': "Pick an aesthetic that matches your soul:",
        'options': [
            ('cappuccino', "Minimal and clean — beige tones."),
            ('espresso', "Dark academia — intense and classy."),
            ('cold_brew', "Street style — cool, bold, unpredictable."),
            ('mocha', "Colorful, sweet, full of personality."),
            ('chai', "Cottagecore Indian edition — cozy + homely."),
            ('filter_coffee', "Traditional, earthy, soulful.")
        ]
    },
    {
        'id': 6,
        'question': "Choose a treat to go with your drink:",
        'options': [
            ('mocha', "Chocolate brownie."),
            ('latte', "Soft croissant or bun maska."),
            ('cappuccino', "Almond biscotti or something boujee."),
            ('filter_coffee', "Medu vada or hot idli."),
            ('chai', "Samosa or pakora, obviously."),
            ('americano', "Plain toast or anything simple.")
        ]
    },
    {
        'id': 7,
        'question': "How do you handle busy days?",
        'options': [
            ('espresso', "Face everything head-on with intensity."),
            ('americano', "Keep a steady, practical pace."),
            ('latte', "Take breaks to calm my mind."),
            ('cappuccino', "Organize everything aesthetically."),
            ('filter_coffee', "Stay steady — one thing at a time."),
            ('chai', "Talk to someone, reset, and continue.")
        ]
    }
]
RESULT_MESSAGE = "Hey {name}! Based on your choices, your coffee personality is {coffee_name}.\n\n{coffee_desc}"