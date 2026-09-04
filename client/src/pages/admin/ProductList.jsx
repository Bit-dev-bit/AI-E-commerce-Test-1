import { Link } from 'react-router-dom';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ProductList = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery({ page: 1, keyword: '' });

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <button 
          onClick={createProductHandler}
          disabled={loadingCreate}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-10 px-4 shadow hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Product
        </button>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3,4].map(i => <div key={i} className="h-16 bg-muted rounded-md w-full"></div>)}
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          {error?.data?.message || error.error}
        </div>
      ) : (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">NAME</th>
                  <th className="px-6 py-4 font-semibold">PRICE</th>
                  <th className="px-6 py-4 font-semibold">CATEGORY</th>
                  <th className="px-6 py-4 font-semibold">BRAND</th>
                  <th className="px-6 py-4 font-semibold text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.products.map((product) => (
                  <tr key={product._id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{product._id}</td>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/admin/product/${product._id}/edit`} className="inline-flex p-2 text-primary hover:bg-primary/10 rounded-md transition-colors mr-2">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => deleteHandler(product._id)}
                        disabled={loadingDelete}
                        className="inline-flex p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
