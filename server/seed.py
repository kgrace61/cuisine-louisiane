
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Menu, MenuItem, UserMenu, User, user_menu_items
import json
from os.path import join, dirname

def create_menu():
    # construct the file path to JSON data
    file_path = join(dirname(__file__), '../client/src/assets/TEST.json')
    
    # load the JSON data
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            
            # iterate over items and add them to the database
            for item in data:
                menu_item = MenuItem(
                    id=item['id'],
                    name=item['name'],
                    description=item['description'],
                    price=item['price'],
                    category=item['category']
                )
                db.session.add(menu_item)
            
            # commit the changes to the database
            db.session.commit()
    except FileNotFoundError:
        print(f"The file at {file_path} was not found.")

with app.app_context():
    create_menu()