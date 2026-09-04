import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?keyword=${keyword}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          E-COMMERCE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/shop" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Shop
          </Link>
          <Link to="/shop?category=Electronics" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Categories
          </Link>
          <Link to="/shop?sort=lowest" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Deals
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-5">
          <form onSubmit={searchHandler} className="hidden sm:flex items-center relative">
            <input 
              type="text" 
              placeholder="Search..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="h-9 w-48 rounded-full border border-input bg-muted/50 px-4 py-1 text-sm transition-all focus:w-64 focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button type="submit" aria-label="Search" className="absolute right-3 text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4" />
            </button>
          </form>
          
          <Link to="/cart" className="relative text-muted-foreground hover:text-foreground transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="flex items-center gap-4">
              {userInfo.isAdmin && (
                <Link to="/admin/productlist" className="text-sm font-medium text-primary hover:underline">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline-block">{userInfo.name}</span>
              </Link>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline-block">Sign In</span>
            </Link>
          )}

          <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
