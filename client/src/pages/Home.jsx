import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const Home = () => {
  const { data, isLoading, error } = useGetProductsQuery({ keyword: '', page: 1 });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
        <div className="container mx-auto px-4 py-24 relative flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              New Arrival
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Discover Next-Gen <br className="hidden md:block" /> Electronics
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Upgrade your lifestyle with our premium selection of smartphones, headphones, and smart home devices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8">
                Shop Now
              </Link>
              <Link to="/deals" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8">
                View Deals
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Placeholder for Hero Image */}
            <div className="w-full max-w-md aspect-square bg-gradient-to-tr from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center shadow-2xl relative">
                <img src="/images/airpods.jpg" alt="Featured Product" className="object-cover rounded-full w-4/5 h-4/5 shadow-xl border-8 border-background" />
                
                {/* Floating Elements */}
                <div className="absolute top-10 right-10 bg-background p-3 rounded-xl shadow-lg border animate-bounce">
                  <span className="font-bold text-lg">Save 20%</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On all orders over $100</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">100% secure payment</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <RefreshCcw className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">30 Days Return</h3>
              <p className="text-sm text-muted-foreground">If goods have problems</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Dedicated support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Top quality electronics handpicked for you.</p>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center text-primary font-medium hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="bg-muted rounded-xl aspect-square w-full"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              {error?.data?.message || error.error}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
             <Link to="/shop" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-transparent h-10 px-4 w-full">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
