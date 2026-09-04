import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const Home = () => {
  const { data, isLoading, error } = useGetProductsQuery({ keyword: '', page: 1 });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 uppercase leading-none">
              Empower <br /> Your Stride
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-md">
              Empower your active runner with our premium gear.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex h-12 items-center justify-center rounded-full bg-white text-blue-700 px-8 text-sm font-bold shadow hover:bg-gray-100 transition-colors uppercase"
            >
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
            {/* Placeholder for runner image */}
            <div className="w-96 h-96 bg-white/10 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <img 
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop" 
              alt="Runner" 
              className="relative z-10 w-full max-w-md h-[400px] object-cover object-top rounded-2xl shadow-2xl mix-blend-overlay opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Featured Collections Placeholder */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/shop?category=Running" className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800" alt="Running" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-xl">Running Shop &gt;</span>
              </div>
            </Link>
            <Link to="/shop?category=Yoga" className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800" alt="Yoga" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-xl">Yoga Shop &gt;</span>
              </div>
            </Link>
            <Link to="/shop?category=Training" className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800" alt="Training" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-xl">Training Shop &gt;</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
            <Link to="/shop" className="text-blue-600 font-medium hover:underline text-sm">
              Show all
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
        </div>
      </section>
    </div>
  );
};

export default Home;
