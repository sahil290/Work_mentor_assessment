import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useProducts } from '../hooks/useProducts';
import { useStats } from '../hooks/useStats';
import { useCategories } from '../hooks/useCategories';
import StatsBar from '../components/ui/StatsBar';
import SearchBar from '../components/ui/SearchBar';
import CategoryFilter from '../components/ui/CategoryFilter';
import ProductCard from '../components/ui/ProductCard';
import ProductModal from '../components/modals/ProductModal';
import DeleteModal from '../components/modals/DeleteModal';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';

const SKELETON = Array.from({ length: 8 }, (_, i) => i);

function CardSkeleton() {
  return (
    <div className="card p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex justify-between gap-2">
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-10" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 bg-gray-100 rounded w-20" />
        <div className="h-5 bg-gray-100 rounded w-16" />
      </div>
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-3/4" />
      <div className="border-t border-gray-100 pt-3 flex justify-between">
        <div className="h-5 bg-gray-100 rounded w-20" />
        <div className="h-4 bg-gray-100 rounded w-14" />
      </div>
    </div>
  );
}

export default function InventoryPage({ registerOpenAdd }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [statsKey, setStatsKey] = useState(0);

  const debouncedSearch = useDebounce(search, 350);
  const filters = {
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(category && { category }),
    page,
    limit: 20,
  };

  const { products, total, loading, error, refetch, create, update, remove } = useProducts(filters);
  const { stats, loading: statsLoading } = useStats(statsKey);
  const categories = useCategories(statsKey);

  const handleSearch = useCallback((val) => { setSearch(val); setPage(1); }, []);
  const handleCategory = useCallback((val) => { setCategory(val); setPage(1); }, []);
  const refreshAll = () => setStatsKey((k) => k + 1);

  const handleSave = async (data) => {
    try {
      if (editProduct?._id) await update(editProduct._id, data);
      else await create(data);
      refreshAll();
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      refreshAll();
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const openAdd = () => { setEditProduct(null); setShowProductModal(true); };
  const openEdit = (p) => { setEditProduct(p); setShowProductModal(true); };
  const closeModal = () => { setShowProductModal(false); setEditProduct(null); };

  useEffect(() => { registerOpenAdd?.(openAdd); }, []);

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <StatsBar stats={stats} loading={statsLoading} />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={handleSearch} />
        </div>
      </div>

      {categories.length > 0 && (
        <CategoryFilter categories={categories} selected={category} onChange={handleCategory} />
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-400 font-medium">
            {loading ? (
              <span className="inline-flex items-center gap-1.5 text-gray-400"><Spinner size={12} /> Loading...</span>
            ) : (
              <>
                {total === 0 ? 'No products' : `${total} product${total !== 1 ? 's' : ''}`}
                {(debouncedSearch || category) ? ' found' : ' total'}
              </>
            )}
          </p>
        </div>

        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SKELETON.map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            title={debouncedSearch || category ? 'No products match your filters' : 'No products yet'}
            description={debouncedSearch || category ? 'Try clearing your search or filters.' : 'Add your first product to get started.'}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} onEdit={openEdit} onDelete={setDeleteProduct} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="btn-secondary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  Previous
                </button>
                <span className="text-xs text-gray-400 px-2">Page {page} of {totalPages}</span>
                <button className="btn-secondary" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                  Next
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showProductModal && (
        <ProductModal product={editProduct} categories={categories} onSave={handleSave} onClose={closeModal} />
      )}
      {deleteProduct && (
        <DeleteModal product={deleteProduct} onConfirm={handleDelete} onClose={() => setDeleteProduct(null)} />
      )}
    </div>
  );
}