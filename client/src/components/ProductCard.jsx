import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to product details when clicking the cart icon
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <Link to={`/product/${product._id}`} className="group relative rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md flex flex-col h-full overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isTrending && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">Trending</span>
          )}
          {product.discountPrice > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">Sale</span>
          )}
        </div>
        {/* Hover Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <button className="bg-background/90 backdrop-blur p-2 rounded-full shadow-sm hover:bg-background text-muted-foreground hover:text-foreground transition-colors" aria-label="Add to wishlist">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">${product.discountPrice > 0 ? product.discountPrice : product.price}</span>
            {product.discountPrice > 0 && (
              <span className="text-xs text-muted-foreground line-through">${product.price}</span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="bg-primary/10 text-primary p-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
