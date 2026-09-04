import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">E-COMMERCE</h3>
          <p className="text-sm text-muted-foreground">
            Your one-stop destination for premium products. We offer the best quality at the most competitive prices.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-foreground">Categories</Link></li>
            <li><Link to="/deals" className="hover:text-foreground">Flash Deals</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-foreground">Shipping</Link></li>
            <li><Link to="/returns" className="hover:text-foreground">Returns</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} E-Commerce Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
