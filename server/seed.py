
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Menu, MenuItem, UserMenu, User, user_menu_items
import json
from os.path import join, dirname

def seed_menus_and_items():
    # Define your menu categories
    categories = ["hors d'oeuvres", "entrees", "accompaniments", "sides"]
    
    # Create and save menu categories
    for category in categories:
        new_menu = Menu(name=category)
        db.session.add(new_menu)
    db.session.commit()
    
    # Load menu items from JSON
    file_path = join(dirname(__file__), '../client/src/assets/TEST.json')
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            
            for item in data:
                # Find the corresponding Menu entry by category name
                menu = Menu.query.filter_by(name=item['category']).first()
                if menu:
                    # Create a new MenuItem with the foreign key set to the Menu's ID
                    menu_item = MenuItem(
                        name=item['name'],
                        description=item['description'],
                        price=item['price'],
                        menu_id=menu.id  # Use the ID of the found Menu
                    )
                    db.session.add(menu_item)
                else:
                    print(f"Category {item['category']} not found.")
            
            db.session.commit()
    except FileNotFoundError:
        print(f"The file at {file_path} was not found.")

if __name__ == "__main__":
    with app.app_context():
        seed_menus_and_items()