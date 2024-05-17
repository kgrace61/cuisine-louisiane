#!/usr/bin/env python3

# Standard library imports


# Remote library imports
from flask import Flask, request, make_response, session, jsonify  
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Menu, MenuItem, UserMenu, User

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'



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
    def get(self, id):
        # query all UserMenu instances for the give user_id
        user_menus = UserMenu.query.filter_by(id=id).all()
        # serialize the UserMenu instances to a list of dictionaries
        user_menus_list = [user_menu.to_dict() for user_menu in user_menus]
        return user_menus_list, 200

# add the UserMenuList resource to the API
api.add_resource(UserMenuList, '/users/<int:user_id>/menus')

# retrieve, update, or delete a specific user menu instance
class UserMenuResource(Resource):
    def get(self, user_menu_id):
        # Query the UserMenu instance by ID
        user_menu = UserMenu.query.get(user_menu_id)
        if user_menu:
            return user_menu.to_dict(), 200
        else:
            return {"error": "UserMenu not found"}, 404

    def put(self, user_menu_id):
        # Query the UserMenu instance by ID
        user_menu = UserMenu.query.get(user_menu_id)
        if not user_menu:
            return {"error": "UserMenu not found"}, 404
        
        # Update the UserMenu instance with the provided data
        data = request.get_json()
        for key, value in data.items():
            if hasattr(user_menu, key):
                setattr(user_menu, key, value)
        
        db.session.commit()
        return user_menu.to_dict(), 200

    def delete(self, user_menu_id):
        # Query the UserMenu instance by ID
        user_menu = UserMenu.query.get(user_menu_id)
        if not user_menu:
            return {"error": "UserMenu not found"}, 404
        
        db.session.delete(user_menu)
        db.session.commit()
        return {"message": "UserMenu deleted successfully"}, 200

# Add the UserMenuResource resource to the API
api.add_resource(UserMenuResource, '/user_menus/<int:user_menu_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

