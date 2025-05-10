import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import { FaFilter, FaTimes } from 'react-icons/fa';

const Products = ({ products = [], onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Initialize filtered products when products prop changes
  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  // Update filtered products when search query changes
  useEffect(() => {
    if (products && products.length > 0) {
      if (searchQuery) {
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }
  }, [searchQuery, products]);

  const handleFilterChange = (filtered) => {
    setFilteredProducts(filtered);
  };

  // Add console logs for debugging
  console.log('Products:', products);
  console.log('Filtered Products:', filteredProducts);
  console.log('Search Query:', searchQuery);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No products available
        </h3>
        <p className="text-gray-600">
          Please check back later for new products
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 
          bg-white py-3 px-4 rounded-lg shadow-sm border border-gray-200
          hover:bg-gray-50 transition-colors duration-200"
      >
        {isFilterOpen ? (
          <>
            <FaTimes className="text-gray-600" />
            <span className="font-medium text-gray-700">Hide Filters</span>
          </>
        ) : (
          <>
            <FaFilter className="text-gray-600" />
            <span className="font-medium text-gray-700">Show Filters</span>
          </>
        )}
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Hidden on mobile by default, shown when toggled */}
        <div className={`
          lg:w-64 transition-all duration-300 ease-in-out
          ${isFilterOpen ? 'block' : 'hidden lg:block'}
        `}>
          <ProductFilters 
            products={products} 
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {searchQuery && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                Found {filteredProducts.length} products
              </p>
            </div>
          )}
          
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                {searchQuery 
                  ? `No products match your search "${searchQuery}"`
                  : "No products available in this category"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products; 