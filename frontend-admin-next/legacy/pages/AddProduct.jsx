import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import { createProduct, getAdminBrands, uploadFile, ASSET_BASE_URL } from '../services/api';

const AddProduct = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        product_code: '',
        description: '',
        price: '',
        original_price: '',
        discount_percentage: 0,
        image_url: '',
        additional_images: [],
        stock_quantity: 0,
        brand_id: null,
        is_active: true,
        is_featured: false,
        second_badge_text: '',
        product_status: 'active',
        features: [],
    });

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await getAdminBrands();
                setBrands(response.data?.brands || []);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        try {
            const uploadResponse = await uploadFile(file, 'products');
            const uploadResult = uploadResponse.data;

            if (uploadResult?.success && uploadResult?.url) {
                setFormData((prev) => ({ ...prev, image_url: uploadResult.url }));
            } else {
                alert('Failed to upload image: ' + (uploadResult?.error || 'Unknown error'));
            }
        } catch (error) {
            alert('Failed to upload image: ' + error.message);
        }
    };

    const handleAdditionalImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        try {
            const uploadResponse = await uploadFile(file, 'products');
            const uploadResult = uploadResponse.data;

            if (uploadResult?.success && uploadResult?.url) {
                setFormData((prev) => {
                    const images = [...(prev.additional_images || [])];
                    images[index] = uploadResult.url;
                    return { ...prev, additional_images: images };
                });
            } else {
                alert('Failed to upload image: ' + (uploadResult?.error || 'Unknown error'));
            }
        } catch (error) {
            alert('Failed to upload image: ' + error.message);
        }
    };

    const handleRemoveAdditionalImage = (index) => {
        setFormData((prev) => {
            const images = [...(prev.additional_images || [])];
            images[index] = null;
            return { ...prev, additional_images: images.filter(Boolean) };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            additional_images: (formData.additional_images || []).filter(Boolean),
        };

        try {
            const response = await createProduct(payload);
            if (response.data?.success) {
                alert('Product created successfully!');
                navigate('/products');
            } else {
                alert('Failed to create product: ' + (response.data?.error || response.data?.message || 'Unknown error'));
            }
        } catch (error) {
            alert('Failed to create product: ' + (error.response?.data?.error || error.message || 'Unknown error'));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate('/products')}
                            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                        >
                            <FiArrowLeft className="mr-2" />
                            Back to Products
                        </button>
                        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Code</label>
                                    <input type="text" name="product_code" value={formData.product_code || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., MAV-001" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (BDT)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (BDT)</label>
                                    <input type="number" name="original_price" value={formData.original_price} onChange={handleChange} step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage (%)</label>
                                    <input type="number" name="discount_percentage" value={formData.discount_percentage} onChange={handleChange} min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                                    <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Status</label>
                                    <select name="is_active" value={String(formData.is_active)} onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.value === 'true' }))} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Details</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                    <select name="brand_id" value={formData.brand_id || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                        <option value="">Select Brand</option>
                                        {Array.isArray(brands) && brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma-separated)</label>
                                    <textarea
                                        name="features"
                                        value={formData.features.join(', ')}
                                        onChange={(e) => {
                                            const featuresArray = e.target.value.split(',').map((f) => f.trim()).filter(Boolean);
                                            setFormData((prev) => ({ ...prev, features: featuresArray }));
                                        }}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        placeholder="e.g., Swiss Movement, Water Resistant"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_featured"
                                        checked={formData.is_featured}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">Add to Featured List</label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Top Right Badge</label>
                                    <select
                                        name="second_badge_text"
                                        value={formData.second_badge_text}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">None</option>
                                        <option value="Sale">Sale</option>
                                        <option value="Best Seller">Best Seller</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Image</label>
                                    <input type="file" name="image_file" onChange={handleImageUpload} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                    {formData.image_url && (
                                        <img src={`${ASSET_BASE_URL}${formData.image_url}`} alt="Primary" className="mt-2 h-24 w-24 object-cover rounded border" />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images</label>
                                    <div className="space-y-3">
                                        {[0, 1, 2, 3].map((index) => (
                                            <div key={index} className="border border-gray-200 rounded-md p-3">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => handleAdditionalImageUpload(e, index)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                                    />
                                                    {formData.additional_images[index] && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveAdditionalImage(index)}
                                                            className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                                {formData.additional_images[index] && (
                                                    <img
                                                        src={`${ASSET_BASE_URL}${formData.additional_images[index]}`}
                                                        alt={`Additional ${index + 1}`}
                                                        className="mt-2 h-20 w-20 object-cover rounded border"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center">
                                {saving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="mr-2" />
                                        Create Product
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
