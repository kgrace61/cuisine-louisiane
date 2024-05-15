from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# association table to store many-to-many relationship between UserMenu and MenuItem (UserMenuItem will have one UserMenu & one MenuItem)
user_menu_items = db.Table('user_menu_items',
                           db.Column('user_menu_id', db.Integer, db.ForeignKey('user_menus.id'), primary_key=True),
                           db.Column('menu_item_id', db.Integer, db.ForeignKey('menu_items.id'), primary_key=True)
                           )

class Menu(db.Model, SerializerMixin):
    __tablename__ ='menus'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    
    items = db.relationship('MenuItem', back_populates='menu')

class MenuItem(db.Model, SerializerMixin):
    __tablename__ ='menu_items'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(255), nullable=False)
    
    menu_id = db.Column(db.Integer, db.ForeignKey('menus.id'))
    
    menu = db.relationship('Menu', back_populates='items')
    user_menus = db.relationship('UserMenu', secondary=user_menu_items, back_populates='menu_items')
    
    
class UserMenu(db.Model, SerializerMixin):
    __tablename__ ='user_menus'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    guest_count = db.Column(db.Integer, nullable=True)
    subtotal = db.Column(db.Float, nullable=True)
    tax = db.Column(db.Float, nullable=True)
    total = db.Column(db.Float, nullable=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    user = db.relationship('User', back_populates='user_menus')
    menu_items = db.relationship('MenuItem', secondary=user_menu_items, back_populates='user_menus')
    
    
class User(db.Model, SerializerMixin):
    __tablename__ ='users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    
    user_menus = db.relationship('UserMenu', back_populates='user', cascade='all, delete-orphan')
    
    
    

    
