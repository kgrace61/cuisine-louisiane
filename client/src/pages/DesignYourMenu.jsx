import React, { useState, useEffect } from 'react';

const categories = [
  { id: 1, name: 'Hors d\'oeuvres' },
  { id: 2, name: 'Entrees' },
  { id: 3, name: 'Accompaniments' },
  { id: 4, name: 'Desserts' }
];

export default function DesignYourMenu() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuItems, setMenuItems] = useState([]);
  const [userMenu, setUserMenu] = useState([]);
  const [guestCount, setGuestCount] = useState(1);
  const [menuName, setMenuName] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 16; // Number of items to display per page

  // Fetch menu items based on selected category and current page
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`http://localhost:5555/menu-items?menu_id=${selectedCategory}&page=${currentPage}&per_page=${itemsPerPage}`);
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging statement
        setMenuItems(data.menu_items);
        setTotalItems(data.total_items);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    };

    fetchMenuItems();
  }, [selectedCategory, currentPage]);

  // Handlers for changing category and pagination
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddToMenu = (item) => {
    setUserMenu([...userMenu, item]);
  };

  const handleRemoveFromMenu = (itemId) => {
    setUserMenu(userMenu.filter(item => item.id !== itemId));
  };

  const handleSaveMenu = async () => {
    const response = await fetch('http://localhost:5555/user_menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: menuName,
        guest_count: guestCount,
        items: userMenu.map(item => item.id)
      }),
    });
    const data = await response.json();
    console.log('Saved menu:', data);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const subtotal = userMenu.reduce((sum, item) => sum + item.price * guestCount, 0);

  return (
    <div className="px-[2in] pt-[1in] font-julius">
      {/* Mini navbar for categories */}
      <div className="flex justify-center space-x-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 ${selectedCategory === category.id ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Display menu items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => handleAddToMenu(item)}>Add to menu</button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-8">
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

      {/* User's menu */}
      <div className="mt-8">
        <h2>Your Menu</h2>
        <input
          type="text"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="Menu Name"
        />
        <input
          type="number"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          placeholder="Guest Count"
        />
        <div>
          {userMenu.map((item) => (
            <div key={item.id} className="p-4 border rounded shadow">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => handleRemoveFromMenu(item.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div>
          <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        </div>
        <button onClick={handleSaveMenu}>Save Menu</button>
      </div>
    </div>
  );
}