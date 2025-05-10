import { motion } from 'framer-motion';
import { FaShoppingBag, FaTruck, FaHeadset, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaShoppingBag className="w-8 h-8" />,
      title: "Curated Collection",
      description: "Discover handpicked fashion items that blend style with comfort."
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep across India."
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our dedicated team is always ready to assist you."
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Shopping",
      description: "Shop with confidence with our secure payment system."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-red-500">Unique Bazar</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your one-stop destination for trendy fashion and lifestyle products. 
          We bring you the latest styles with unmatched quality and service.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-red-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="container mx-auto px-4 mt-20"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-gray-600">
                Founded with a passion for fashion and customer satisfaction, Unique Bazar has grown from a small boutique to a leading online fashion destination.
              </p>
              <p className="text-gray-600">
                We believe in providing not just products, but an experience that makes our customers feel special and confident in their style choices.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Our Store" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="container mx-auto px-4 mt-20 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality First</h3>
            <p className="text-gray-600">We never compromise on the quality of our products.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer Focus</h3>
            <p className="text-gray-600">Your satisfaction is our top priority.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
            <p className="text-gray-600">Constantly evolving to bring you the latest trends.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 