#!/usr/bin/env python3

# Standard library imports
import ipdb

# Remote library imports
from flask import Flask, request, make_response, session, jsonify  
from flask_restful import Resource


# Local imports
from config import app, db, api
# Add your model imports
from models import Menu, MenuItem, UserMenu, User

# Views go here!

@app.route('/menu-items', methods=['GET'])
def get_menu_items():
    menu_id = request.args.get('menu_id')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 16))
    search_query = request.args.get('search', '')

    menu_items_query = MenuItem.query.filter_by(menu_id=menu_id)

    if search_query:
        menu_items_query = menu_items_query.filter(
            MenuItem.name.ilike(f'%{search_query}%') |
            MenuItem.description.ilike(f'%{search_query}%')
        )

    total_items = menu_items_query.count()
    menu_items = menu_items_query.paginate(page=page, per_page=per_page, error_out=False).items

    return jsonify({
        'total_items': total_items,
        'menu_items': [item.to_dict() for item in menu_items]
    }), 200


# # DOES THIS NEED TO BE MENU ITEMS BY MENU ID ?? 
# # accessing menu items by menu_id to populate the menu page by 'category' except category does not exist // would be menu_id
# class MenuItemsById(Resource):
#     def get(self, id):
#         menu_item = MenuItem.query.filter_by(id=id).first()
#         if menu_item:
#             return make_response(jsonify(menu_item.to_dict()), 200)
#         return make_response({'message': 'Menu item not found'}, 404)
# api.add_resource(MenuItemsById, '/menu-items/<int:id>')

# routes for login and user authentication 
@app.route('/users', methods=['POST']) #sign up route
def manage_users():
        data = request.json
        new_user = User(username=data.get('username')) #create new user instance 
        new_user.password_hash = data.get('password')  # Set the password_hash using the setter
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id #set session hash to user id to keep logged in
        response = make_response(new_user.to_dict())
        response.set_cookie('user_id', str(new_user.id))
        return response, 201

@app.route('/logout', methods=["GET"])
def logout():
    session['user_id'] = None #clear session hash
    response = make_response({})
    response.delete_cookie('user_id')
    return response, 200

@app.route('/authenticate-session') #route for authentication 
def authorize():
    cookie_id = request.cookies.get('user_id')  
    if cookie_id:
        user = User.query.filter_by(id=cookie_id).first() #check to see if cookie matches current user id
        if user:
            return make_response(user.to_dict(only=['id', 'username'])), 200
    return make_response({'message': 'failed to authenticate'}), 401

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first() #check to see if username exists in db
    password = data.get('password') 
    if user and user.authenticate(password): #check entered password against encrypted password in db 
        session['user_id'] = user.id 
        response = make_response(user.to_dict())
        response.set_cookie('user_id', str(user.id))
        return response, 200
    return jsonify({'message': 'Invalid username or password'}), 401


#route to access user info and delete user 
class UsersById(Resource):
    def get(self, id):
        user = User.query.filter(User.id==id).first()
        if user:
            return make_response(user.to_dict())
        else:
            return make_response({'error': 'User not found'}, 404)
        
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        else:
            try:
                for attr in request.json:
                    setattr(user, attr, request.json.get(attr))
                
                db.session.add(user)
                db.session.commit()

                return make_response(user.to_dict(), 202)
            except:
                return make_response({"errors": ["validation errors"]}, 400)
           
    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        else:
            db.session.delete(user)
            db.session.commit()

            return make_response({}, 204)

api.add_resource(UsersById, '/users/<int:id>')

# route to access all menus
class MenuList(Resource):
    def get(self):
        # query all menus from the database
        menus = Menu.query.all()
        # serialize the menus to a list of dictionaries
        menus_list = [menu.to_dict() for menu in menus]
        return menus_list, 200

# add the MenuList resource to the API
api.add_resource(MenuList, '/menus')

# route to retrieve menus by users
class UserMenuList(Resource):
    def get(self, user_id):
        # query all UserMenu instances for the give user_id
        user_menus = UserMenu.query.filter_by(user_id=user_id).all()
        # serialize the UserMenu instances to a list of dictionaries
        user_menus_list = [user_menu.to_dict() for user_menu in user_menus]
        return make_response(user_menus_list, 200)

# add the UserMenuList resource to the API
api.add_resource(UserMenuList, '/users/<int:user_id>/menus')

# retrieve, update, or delete a specific user menu instance
class UserMenuResource(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        guest_count = data.get('guest_count')
        user_id = data.get('user_id')
        tax = data.get('tax')
        subtotal = data.get('subtotal')
        total = data.get('total')
        
        if not user_id:
            return make_response({'message': 'Unauthorized'}, 401)
        
        try:
            new_user_menu = UserMenu(
                name=name, 
                guest_count=guest_count, 
                user_id=user_id, 
                tax=tax, 
                subtotal=subtotal, 
                total=total
            )
            db.session.add(new_user_menu)
            db.session.commit()

            # Add menu items to the user menu
            for item_id in data.get('items', []):
                menu_item = MenuItem.query.get(item_id)
                if menu_item:
                    new_user_menu.menu_items.append(menu_item)

            db.session.commit()

            return make_response(new_user_menu.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
            
    def get(self):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'message': 'Unauthorized'}), 401

        user_menus = UserMenu.query.filter_by(user_id=user_id).all()
        return jsonify([user_menu.to_dict() for user_menu in user_menus]), 200
    
    def delete(self, id):
        user_menu = UserMenu.query.get(id)
        if not user_menu:
            return make_response({'message': 'UserMenu not found'}, 404)
        
        db.session.delete(user_menu)
        db.session.commit()
        return make_response({}, 204)
    
api.add_resource(UserMenuResource, '/user_menus')

class UserMenuDetailResource(Resource):
    def delete(self, user_id, menu_id):
        user_menu = UserMenu.query.filter_by(id=menu_id, user_id=user_id).first()
        if not user_menu:
            return make_response({'message': 'UserMenu not found'}, 404)
        
        db.session.delete(user_menu)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(UserMenuDetailResource, '/users/<int:user_id>/menus/<int:menu_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


