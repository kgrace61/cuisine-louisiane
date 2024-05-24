import React from 'react';

const MenuList = ({ menuItems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {menuItems.map((item) => (
        <div key={item.id} className="p-4 border rounded shadow">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p className="text-sm">{item.description}</p>
          <p className="text-sm">${item.price.toFixed(2)} per person</p>
        </div>
      ))}
    </div>
  );
};

export default MenuList;