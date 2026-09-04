import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sp = new URLSearchParams(location.search);
  
  const [keyword, setKeyword] = useState(sp.get('keyword') || '');
  const [category, setCategory] = useState(sp.get('category') || '');
  const [brand, setBrand] = useState(sp.get('brand') || '');
  const [sort, setSort] = useState(sp.get('sort') || 'newest');
  
  const { data, isLoading, error } = useGetProductsQuery({
    keyword: sp.get('keyword') || '',
    category: sp.get('category') || '',
    brand: sp.get('brand') || '',
    sort: sp.get('sort') || 'newest',
  });

  const submitHandler = (e) => {
    e.preventDefault();
    let query = `/shop?keyword=${keyword}&sort=${sort}`;
    if (category) query += `&category=${category}`;
    if (brand) query += `&brand=${brand}`;
    navigate(query);
  };

  useEffect(() => {
    setKeyword(sp.get('keyword') || '');
    setCategory(sp.get('category') || '');
    setBrand(sp.get('brand') || '');
    setSort(sp.get('sort') || 'newest');
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <div className="bg-card rounded-xl border shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 pl-9 text-sm shadow-sm"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                >
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home & Kitchen</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price: High to Low</option>
                  <option value="toprated">Top Rated</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 shadow hover:bg-primary/90"
              >
                Apply Filters
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-transparent h-10 px-4 shadow-sm hover:bg-accent"
              >
                Clear All
              </button>
            </form>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4">
          <h1 className="text-2xl font-bold mb-6">Shop Products</h1>
          
          {isLoading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-muted rounded-xl animate-pulse"></div>)}
             </div>
          ) : error ? (
             <div className="bg-destructive/10 text-destructive p-4 rounded-md">
               {error?.data?.message || error.error}
             </div>
          ) : data.products.length === 0 ? (
             <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
               <h2 className="text-lg font-semibold mb-2">No products found</h2>
               <p className="text-muted-foreground">Try adjusting your search or filters.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
