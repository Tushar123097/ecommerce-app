import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTimes } from 'react-icons/fa';

const ProductFilters = ({ products, onFilterChange }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = [
    { id: 'mens', name: "Men's Fashion" },
    { id: 'ladies', name: "Women's Fashion" },
    { id: 'kids', name: "Kids' Collection" },
    { id: 'gym', name: "Gym & Sports" },
    { id: 'electronics', name: "Electronics" },
    { id: 'summer', name: "Summer Sales" }
  ];

  const subcategories = {
    mens: ['T-Shirts', 'Shirts', 'Jeans', 'Formal Wear', 'Sports Wear'],
    ladies: ['Dresses', 'Tops', 'Jeans', 'Traditional', 'Sports Wear'],
    kids: ['Boys', 'Girls', 'Infants', 'Toys', 'Accessories'],
    gym: ['Fitness', 'Yoga', 'Running', 'Sports', 'Accessories'],
    electronics: ['Phones', 'Laptops', 'Accessories', 'Gadgets'],
    summer: ['Accessories', 'Footwear', 'Clothing', 'Electronics']
  };

  const priceRanges = [
    { id: '0-1000', name: 'Under ₹1,000' },
    { id: '1000-2000', name: '₹1,000 - ₹2,000' },
    { id: '2000-5000', name: '₹2,000 - ₹5,000' },
    { id: '5000+', name: 'Above ₹5,000' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low-high', name: 'Price: Low to High' },
    { id: 'price-high-low', name: 'Price: High to Low' },
    { id: 'newest', name: 'Newest First' }
  ];

  // Filter products based on search query and other filters
  useEffect(() => {
    let filteredProducts = [...products];

    // Apply search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === selectedCategory
      );
    }

    // Apply subcategory filter
    if (selectedSubcategory) {
      filteredProducts = filteredProducts.filter(product => 
        product.subcategory === selectedSubcategory
      );
    }

    // Apply price range filter
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product => 
        product.price >= min && (!max || product.price <= max)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        // featured - no sorting needed
        break;
    }

    onFilterChange(filteredProducts);
  }, [searchQuery, selectedCategory, selectedSubcategory, selectedPriceRange, sortBy, products, onFilterChange]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedPriceRange('');
    setSortBy('featured');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-800">
          <FaFilter className="text-xl" />
          <h2 className="text-xl font-bold">Filters</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:text-red-600 flex items-center space-x-1"
        >
          <FaTimes className="text-xs" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-red-500 text-white font-bold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {selectedCategory && subcategories[selectedCategory] && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Subcategories</h3>
          <div className="space-y-2">
            {subcategories[selectedCategory].map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => setSelectedSubcategory(subcategory)}
                className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                  selectedSubcategory === subcategory
                    ? 'bg-red-500 text-white font-bold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedPriceRange(range.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                selectedPriceRange === range.id
                  ? 'bg-red-500 text-white font-bold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {range.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                sortBy === option.id
                  ? 'bg-red-500 text-white font-bold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 