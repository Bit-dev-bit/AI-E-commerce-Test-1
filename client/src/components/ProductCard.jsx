import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <Link to={`/product/${product._id}`} className="group relative rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md flex flex-col h-full overflow-hidden p-3">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-white mb-3 rounded-lg">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain w-full h-full mix-blend-multiply transition-transform duration-300 group-hover:scale-105 p-4"
        />
        {/* Wishlist Heart always visible like in design */}
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors" aria-label="Add to wishlist">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow text-left">
        <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-2 text-gray-900">{product.name}</h3>
        <span className="text-sm font-bold text-gray-900 mb-2">${product.discountPrice > 0 ? product.discountPrice : product.price}</span>
        
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
             <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.numReviews})</span>
        </div>
        
        <div className="mt-auto">
          <button 
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-full hover:bg-blue-700 transition-colors text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
