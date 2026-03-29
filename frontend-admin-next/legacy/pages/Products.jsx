import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminProducts, deleteProduct, ASSET_BASE_URL } from '../services/api';
import { FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getAdminProducts({});
            setProducts(response.data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (productId) => {
        console.log('✏️ Edit product:', productId);
        navigate(`/products/edit/${productId}`);
    };

    const handleDelete = async (id) => {
        console.log('🗑️ Attempting to delete product:', id);
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                console.log('📤 Sending delete request for ID:', id);
                const response = await deleteProduct(id);
                console.log('📦 Delete response:', response);
                console.log('📦 Response status:', response.status);
                console.log('📦 Response data:', response.data);
                
                if (response.data && response.data.success) {
                    alert('Product deleted successfully');
                    fetchProducts();
                } else {
                    alert('Failed to delete product: ' + (response.data?.error || 'Unknown error'));
                }
            } catch (error) {
                console.error('❌ Error deleting product:', error);
                console.error('❌ Error response:', error.response);
                alert('Failed to delete product: ' + error.message);
            }
        }
    };

    // Pagination calculations
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    const startItem = startIndex + 1;
    const endItem = Math.min(endIndex, totalProducts);

    // Generate page numbers array
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <button 
                    onClick={() => navigate('/products/add')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <FiPlus /> Add Product
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <img
                                        src={`${ASSET_BASE_URL}${product.image_url}`}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded"
                                        onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4">{product.product_code || '-'}</td>
                                <td className="px-6 py-4">BDT {parseFloat(product.price).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        product.stock_quantity > 0 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => {
                                                console.log('🔵 EDIT BUTTON CLICKED for product:', product.id);
                                                handleEditClick(product.id);
                                            }}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEdit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-6 space-y-4">
                        {/* Showing text */}
                        <p className="text-sm text-gray-500 text-center">
                            Showing {startItem}–{endItem} of {totalProducts} products
                        </p>

                        {/* Pagination buttons */}
                        <div className="flex justify-center items-center gap-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                            >
                                <FiChevronLeft size={16} />
                                Previous
                            </button>

                            {/* Page Numbers */}
                            <div className="flex gap-1">
                                {getPageNumbers().map(pageNum => (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition ${
                                            currentPage === pageNum
                                                ? 'bg-black text-white'
                                                : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                            >
                                Next
                                <FiChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
