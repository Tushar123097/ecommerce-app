import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaRupeeSign, FaHeart } from 'react-icons/fa';

function ProductCard({ product, onAddToCart }) {
  const [showBuyNow, setShowBuyNow] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleProceedToBuy = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Here you would typically navigate to a checkout page
    console.log('Proceeding to buy:', { ...product, size: selectedSize, quantity });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block flex-1">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              New
            </span>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-red-500">
              ₹{product.price.toLocaleString()}
            </span>
            <button 
              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <FaHeart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0 flex flex-col gap-2">
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white 
            py-3 px-4 rounded-md font-medium text-sm sm:text-base
            transform transition-all duration-300 
            hover:from-red-600 hover:to-red-700 
            hover:shadow-lg hover:shadow-red-200
            active:scale-95
            flex items-center justify-center gap-2
            border border-transparent hover:border-red-700
            shadow-sm"
        >
          <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Add to Cart</span>
        </button>
        <button
          onClick={handleBuyNow}
          className="w-full bg-white text-red-500 
            py-3 px-4 rounded-md font-medium text-sm sm:text-base
            transform transition-all duration-300 
            hover:bg-red-50
            active:scale-95
            border-2 border-red-500 hover:border-red-600
            hover:shadow-lg hover:shadow-red-100
            shadow-sm"
        >
          Buy Now
        </button>
      </div>

      {/* Buy Now Modal */}
      {showBuyNow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            
            {/* Size Selection */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Select Size</h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-colors ${
                      selectedSize === size
                        ? 'border-red-500 text-red-500'
                        : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500"
                >
                  +
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mb-4 space-y-2 text-sm text-gray-600">
              <p>✓ Free Delivery on orders above ₹999</p>
              <p>✓ 7 Days Easy Returns</p>
              <p>✓ Genuine Product Guarantee</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleProceedToBuy}
                className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Proceed to Buy
              </button>
              <button
                onClick={() => setShowBuyNow(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard; 