import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Store, Menu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/shop?keyword=${keyword}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a1128] text-white border-b border-transparent shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 hover:text-primary transition-colors">
          <Store className="h-7 w-7 text-primary" /> E-MART
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
            Shop
          </Link>
          <Link to="/shop?category=Electronics" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link to="/shop?sort=newest" className="text-sm font-medium hover:text-primary transition-colors">
            Deals
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={searchHandler} className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-48 lg:w-64 pl-10 pr-4 py-2 rounded-full text-sm bg-white/10 border-transparent focus:bg-white focus:text-black focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </form>

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link to="/cart" className="relative p-2 hover:text-primary transition-colors text-gray-300">
            <ShoppingCart className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {/* User / Auth */}
          {userInfo ? (
            <div className="flex items-center gap-4">
              {userInfo.isAdmin && (
                <div className="flex items-center gap-3 mr-2">
                  <Link to="/admin/productlist" className="text-xs font-bold text-primary hover:text-white transition-colors bg-primary/10 px-2 py-1 rounded">
                    Products
                  </Link>
                  <Link to="/admin/orderlist" className="text-xs font-bold text-primary hover:text-white transition-colors bg-primary/10 px-2 py-1 rounded">
                    Orders
                  </Link>
                  <Link to="/admin/userlist" className="text-xs font-bold text-primary hover:text-white transition-colors bg-primary/10 px-2 py-1 rounded">
                    Users
                  </Link>
                </div>
              )}
              <Link to="/profile" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline-block">{userInfo.name}</span>
              </Link>
              <button onClick={logoutHandler} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                Logout
              </button>
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
