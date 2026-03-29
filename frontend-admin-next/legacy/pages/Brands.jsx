import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getAdminBrands, createBrand, updateBrand, deleteBrand, uploadFile, ASSET_BASE_URL } from '../services/api';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        logo_url: ''
    });
    const [uploading, setUploading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const brandsPerPage = 20;

    const getLogoUrl = (logoUrl) => {
        if (!logoUrl) return '';
        if (/^https?:\/\//i.test(logoUrl)) return logoUrl;
        return `${ASSET_BASE_URL}${logoUrl.startsWith('/') ? '' : '/'}${logoUrl}`;
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await getAdminBrands();
            console.log('🏷️ Brands API response:', response);
            setBrands(response.data.brands || response.data || []);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setBrands([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const response = await uploadFile(file, 'brands');
            setFormData({ ...formData, logo_url: response.data.url });
            alert('Logo uploaded successfully!');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload logo');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingBrand) {
                await updateBrand(editingBrand.id, formData);
                alert('Brand updated successfully!');
            } else {
                await createBrand(formData);
                alert('Brand created successfully!');
            }
            
            setShowModal(false);
            setEditingBrand(null);
            setFormData({ name: '', description: '', logo_url: '' });
            fetchBrands();
        } catch (error) {
            console.error('Error saving brand:', error);
            alert('Failed to save brand');
        }
    };

    const handleEdit = (brand) => {
        setEditingBrand(brand);
        setFormData({
            name: brand.name,
            description: brand.description || '',
            logo_url: brand.logo_url || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this brand?')) {
            try {
                await deleteBrand(id);
                alert('Brand deleted successfully');
                fetchBrands();
            } catch (error) {
                console.error('Error deleting brand:', error);
                alert('Failed to delete brand');
            }
        }
    };

    const handleAddNew = () => {
        setEditingBrand(null);
        setFormData({ name: '', description: '', logo_url: '' });
        setShowModal(true);
    };

    // Pagination calculations
    const totalBrands = brands.length;
    const totalPages = Math.ceil(totalBrands / brandsPerPage);
    const startIndex = (currentPage - 1) * brandsPerPage;
    const endIndex = startIndex + brandsPerPage;
    const currentBrands = brands.slice(startIndex, endIndex);
    const startItem = startIndex + 1;
    const endItem = Math.min(endIndex, totalBrands);

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
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Brand Management</h1>
                    <p className="text-gray-600 mt-1">Manage watch brands</p>
                </div>
                <button 
                    onClick={handleAddNew}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <FiPlus /> Add Brand
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Logo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentBrands.map((brand) => (
                            <tr key={brand.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    {brand.logo_url ? (
                                        <img
                                            src={getLogoUrl(brand.logo_url)}
                                            alt={brand.name}
                                            className="w-16 h-16 object-contain"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                                            No Logo
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{brand.name}</td>
                                <td className="px-6 py-4 text-gray-600">{brand.description || '-'}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        brand.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {brand.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleEdit(brand)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEdit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(brand.id)}
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
                            Showing {startItem}–{endItem} of {totalBrands} brands
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">
                                {editingBrand ? 'Edit Brand' : 'Add Brand'}
                            </h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Brand Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Rolex"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Luxury Swiss watches"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                />
                                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                                {formData.logo_url && (
                                    <img
                                        src={getLogoUrl(formData.logo_url)}
                                        alt="Preview"
                                        className="mt-2 w-24 h-24 object-contain border rounded"
                                    />
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    {editingBrand ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Brands;
