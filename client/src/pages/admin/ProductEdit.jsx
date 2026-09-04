import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';
import { ArrowLeft } from 'lucide-react';
// import { useUploadProductImageMutation } from '../../slices/apiSlice'; // Implement if time permits

const ProductEdit = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDiscountPrice(product.discountPrice);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        discountPrice,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      navigate('/admin/productlist');
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/admin/productlist" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
      </Link>

      <div className="bg-card rounded-xl border shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
             <div className="h-10 bg-muted rounded w-full"></div>
             <div className="h-10 bg-muted rounded w-full"></div>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            {error?.data?.message || error.error}
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount Price (0 for none)</label>
                <input
                  type="number"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(Number(e.target.value))}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">Enter a valid URL or path (e.g., /images/sample.jpg)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Count In Stock</label>
              <input
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loadingUpdate}
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 shadow hover:bg-primary/90 mt-4 disabled:opacity-50"
            >
              {loadingUpdate ? 'Updating...' : 'Update Product'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEdit;
