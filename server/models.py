from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# association table to store many-to-many relationship between UserMenu and MenuItem (UserMenuItem will have one UserMenu & one MenuItem)
user_menu_items = db.Table('user_menu_items',
                           db.Column('user_menu_id', db.Integer, db.ForeignKey('user_menus.id'), primary_key=True),
                           db.Column('menu_item_id', db.Integer, db.ForeignKey('menu_items.id'), primary_key=True)
                           )

class Menu(db.Model, SerializerMixin):
    __tablename__ ='menus'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    
    
    items = db.relationship('MenuItem', back_populates='menu')
    
    serialize_rules = ('-items',)

class MenuItem(db.Model, SerializerMixin):
    __tablename__ ='menu_items'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)

    
    menu_id = db.Column(db.Integer, db.ForeignKey('menus.id'))
    
    menu = db.relationship('Menu', back_populates='items')
    user_menus = db.relationship('UserMenu', secondary=user_menu_items, back_populates='menu_items')
    
    serialize_rules = ('-menu','-user_menus')
    
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
    
    serialize_rules = ('-user',)
    
class User(db.Model, SerializerMixin):
    __tablename__ ='users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    
    user_menus = db.relationship('UserMenu', back_populates='user', cascade='all, delete-orphan')
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )
    
    
    
    
    

    
