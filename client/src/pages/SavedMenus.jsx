import React, { useState, useEffect } from 'react';

export default function SavedMenus({ user }) {
  const [savedMenus, setSavedMenus] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5555/users/${user.id}/menus`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched menus:', data); // Debug: Check the fetched data
          setSavedMenus(Array.isArray(data) ? data : []);
        })
        .catch(error => console.error('Error fetching saved menus:', error));
    }
  }, [user]);

  const handleDelete = (menuId) => {
    fetch(`http://localhost:5555/users/${user.id}/menus/${menuId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setSavedMenus(savedMenus.filter(menu => menu.id !== menuId));
      } else {
        console.error('Error deleting menu:', response);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center ">
        <div className="mt-[2in] font-julius text-xl">Please log in to view your saved menus.</div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-[2in] font-julius text-sm">
      <h1 className="text-2xl font-bold mb-4">Your Saved Menus</h1>
      {savedMenus.length > 0 ? (
        <ul>
          {savedMenus.map(menu => (
            <li key={menu.id} className="mb-4 p-4 border rounded">
              <h2 className="text-xl font-bold">{menu.name}</h2>
              <p>Guest Count: {menu.guest_count}</p>
              <p>Subtotal: ${menu.subtotal.toFixed(2)}</p>
              <p>Tax: ${menu.tax.toFixed(2)}</p>
              <p>Total: ${menu.total.toFixed(2)}</p>
              <ul className="mt-2">
                {menu.menu_items && menu.menu_items.length > 0 ? (
                  menu.menu_items.map(item => (
                    <li key={item.id} className="p-2 border-t">
                      {item.name} - ${item.price.toFixed(2)} per person
                    </li>
                  ))
                ) : (
                  <p>No items in this menu.</p>
                )}
              </ul>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(menu.id)}
              >
                Delete Menu
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no saved menus.</p>
      )}
    </div>
  );
}