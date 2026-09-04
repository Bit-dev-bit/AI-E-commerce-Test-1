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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a] text-white border-b border-white/10 shadow-sm h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded text-white font-bold text-xl leading-none">A</div>
          <span className="text-xl font-bold tracking-tight">Apex Athletics</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-white/90">
          <Link to="/shop" className="text-sm font-medium hover:text-white transition-colors">
            New
          </Link>
          <Link to="/shop?category=Men" className="text-sm font-medium hover:text-white transition-colors">
            Mens
          </Link>
          <Link to="/shop?category=Women" className="text-sm font-medium hover:text-white transition-colors">
            Womens
          </Link>
          <Link to="/shop?category=Training" className="text-sm font-medium hover:text-white transition-colors">
            Training
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-5 text-white/90">
          <form onSubmit={searchHandler} className="hidden sm:flex items-center relative text-black">
            <input 
              type="text" 
              placeholder="Search..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="h-9 w-48 rounded-full border-none bg-white/10 text-white placeholder-white/50 px-4 py-1 text-sm transition-all focus:w-64 focus:bg-white focus:text-black focus:outline-none"
            />
            <button type="submit" aria-label="Search" className="absolute right-3 text-white/70 hover:text-white">
              <Search className="w-4 h-4" />
            </button>
          </form>
          
          <Link to="/cart" className="relative hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="flex items-center gap-4">
              {userInfo.isAdmin && (
                <Link to="/admin/productlist" className="text-sm font-medium text-blue-400 hover:underline">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline-block">Account</span>
              </Link>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline-block">Account</span>
            </Link>
          )}

          <button className="md:hidden hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
