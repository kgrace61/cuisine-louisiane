import React, { useState, useEffect } from 'react';
import MenuList from '../components/MenuList';

const categories = [
  { id: 1, name: 'Hors d\'oeuvres' },
  { id: 2, name: 'Entrees' },
  { id: 3, name: 'Accompaniments' },
  { id: 4, name: 'Desserts' }
];

export default function Menus({}) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuItems, setMenuItems] = useState([]);
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

  const totalPages = Math.ceil(totalItems / itemsPerPage);


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
      <MenuList menuItems={menuItems} />
        <div className="text-center mt-4">
         
          <h3>Prices are subject to change.</h3>
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
    </div>
  );
}