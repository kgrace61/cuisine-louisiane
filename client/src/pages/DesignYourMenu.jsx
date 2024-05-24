import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Hors d\'oeuvres' },
  { id: 2, name: 'Entrees' },
  { id: 3, name: 'Accompaniments' },
  { id: 4, name: 'Desserts' }
];

export default function DesignYourMenu({ user, updateUser }) {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuItems, setMenuItems] = useState([]);
  const [userMenu, setUserMenu] = useState([]);
  const [guestCount, setGuestCount] = useState(1);
  const [menuName, setMenuName] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`http://localhost:5555/menu-items?menu_id=${selectedCategory}&page=${currentPage}&per_page=${itemsPerPage}&search=${searchQuery}`);
        const data = await response.json();
        setMenuItems(data.menu_items);
        setTotalItems(data.total_items);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };
  
    fetchMenuItems();
  }, [selectedCategory, currentPage, searchQuery]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchQuery(''); // Clear the search query when category changes
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);  // Reset to the first page on a new search
  };

  const handleAddToMenu = (item) => {
    setUserMenu([...userMenu, item]);
    setSearchQuery('');  // Clear the search query
  };

  const handleRemoveFromMenu = (itemId) => {
    setUserMenu(userMenu.filter(item => item.id !== itemId));
  };

  const handleSaveMenu = async () => {
    try {
      const response = await fetch('http://localhost:5555/user_menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: menuName,
          guest_count: guestCount,
          user_id: user.id,
          subtotal: subtotal.toFixed(2),
          tax: tax.toFixed(2),
          total: total.toFixed(2),
          items: userMenu.map(item => item.id)
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Saved menu:', data);
      } else {
        console.error('Failed to save menu:', await response.json());
      }
    } catch (error) {
      console.error('Error saving menu:', error);
    }
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const subtotal = userMenu.reduce((sum, item) => sum + item.price * guestCount, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="px-4 pt-[2in] font-julius text-sm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-center space-x-4 mb-4">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 ${selectedCategory === category.id ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex justify-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search menu items..."
              className="p-2 border rounded w-full"
            />
          </div>

          <div>
            {filteredMenuItems.map(item => (
              <div key={item.id} className="p-4 border-b flex justify-between items-start">
                <div className="flex-1 max-w-md">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="break-words">{item.description}</p>
                  <p>${item.price.toFixed(2)} per person</p>
                </div>
                <button
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleAddToMenu(item)}
                >
                  Add to menu
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-gray-200"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button
              className="px-4 py-2 bg-gray-200"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Your Menu</h2>
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="Menu Name"
            className="mb-2 p-2 border rounded w-full"
          />
          <label className="block mb-2 font-bold">Please enter anticipated guest count for your event</label>
          <input
            type="number"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            placeholder="Guest Count"
            className="mb-4 p-2 border rounded w-full"
          />
          <div>
            {userMenu.map(item => (
              <div key={item.id} className="p-4 border-b flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p>${item.price.toFixed(2)} per person</p>
                </div>
                <button
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveFromMenu(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3>Estimated Pricing:</h3>
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
            <h3>Tax: ${tax.toFixed(2)}</h3>
            <h3>Total: ${total.toFixed(2)}</h3>
            <br></br>
            <h3>These prices are subject to change. Please contact us for a quote.</h3>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleSaveMenu}
          >
            Save Menu
          </button>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold"></h2>
            <Link to="/savedmenus">
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                View Saved Menus
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}