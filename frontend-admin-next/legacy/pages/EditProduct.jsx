import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import { getAdminProducts, getProductById, updateProduct, getAdminBrands, uploadFile, ASSET_BASE_URL } from '../services/api';

// Test that EditProduct page is working
console.log('🧪 EditProduct page loaded successfully');

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
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
        features: []
    });

    useEffect(() => {
        console.log('🔄 EditProduct useEffect triggered with ID:', id);
        if (id) {
            fetchProduct();
        } else {
            console.log('⚠️ No ID provided, skipping fetch');
            setLoading(false);
        }
        fetchBrands();
    }, [id]);

    const fetchBrands = async () => {
        try {
            const response = await getAdminBrands();
            console.log('🏷️ Brands response:', response);
            setBrands(response.data.brands || []);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const fetchProduct = async () => {
        console.log('📡 Making API call to getProductById with ID:', id);
        try {
            const response = await getProductById(id);
            console.log('📦 API Response received:', response);

            if (response.data && response.data.product) {
                console.log('✅ Product found:', response.data.product);
                console.log('🔍 Available fields:', Object.keys(response.data.product));
                setProduct(response.data.product);

                // Try to get saved additional fields from localStorage
                const savedAdditionalFields = localStorage.getItem(`product_${id}_additional`);
                const additionalFields = savedAdditionalFields ? JSON.parse(savedAdditionalFields) : {};

                const newFormData = {
                    name: response.data.product.name || '',
                    product_code: response.data.product.product_code || additionalFields.product_code || '',
                    description: response.data.product.description || '',
                    price: response.data.product.price || '',
                    original_price: response.data.product.original_price || '',
                    discount_percentage: response.data.product.discount_percentage || 0,
                    image_url: response.data.product.image_url || '',
                    additional_images: response.data.product.additional_images || additionalFields.additional_images || [],
                    stock_quantity: response.data.product.stock_quantity || 0,
                    brand_id: response.data.product.brand_id || null,
                    is_active: response.data.product.is_active !== undefined ? response.data.product.is_active : true,
                    is_featured: response.data.product.is_featured !== undefined ? response.data.product.is_featured : false,
                    second_badge_text: response.data.product.second_badge_text || '',
                    product_status: response.data.product.product_status || 'active',
                    features: response.data.product.features || additionalFields.features || []
                };

                console.log('📝 Form data loaded:', newFormData);
                setFormData(newFormData);
            } else {
                console.error('❌ Product not found:', response);
                setProduct(null);
            }
        } catch (error) {
            console.error('❌ Error fetching product:', error);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log('🔄 Form field changed:', { name, value, type, checked });
        
        setFormData(prev => {
            const newData = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            };
            console.log('📝 New form data:', newData);
            return newData;
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log('📷 Image file selected:', file.name);

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        try {
            const uploadResponse = await uploadFile(file, 'products');
            const uploadResult = uploadResponse.data;

            if (uploadResult?.success && uploadResult?.url) {
                console.log('✅ Image uploaded successfully:', uploadResult.url);

                // Update the form data with the uploaded image URL
                setFormData(prev => ({
                    ...prev,
                    image_url: uploadResult.url // Backend returns 'url'
                }));

                alert('Primary image uploaded successfully!');
            } else {
                console.error('❌ Upload failed:', uploadResult.error);
                alert('Failed to upload image: ' + (uploadResult.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('❌ Upload error:', error);
            alert('Failed to upload image: ' + error.message);
        }
    };

    const handleAdditionalImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        console.log('📤 Uploading additional image:', file.name, 'at index:', index);

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        try {
            // Use the existing uploadFile function from api.js
            const uploadResult = await uploadFile(file, 'product');
            console.log('📤 Upload response:', uploadResult);

            if (uploadResult.data && uploadResult.data.success && uploadResult.data.url) {
                console.log('✅ Additional image uploaded successfully:', uploadResult.data.url);

                // Update form data with the uploaded image URL
                setFormData(prev => {
                    const newAdditionalImages = [...prev.additional_images];
                    newAdditionalImages[index] = uploadResult.data.url;
                    return {
                        ...prev,
                        additional_images: newAdditionalImages
                    };
                });

                alert(`Additional image ${index + 1} uploaded successfully!`);
            } else {
                console.error('❌ Upload failed:', uploadResult);
                alert('Failed to upload image: ' + (uploadResult.data?.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('❌ Upload error:', error);
            alert('Failed to upload image: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        console.log('💾 Submitting form data:', formData);
        
        try {
            const response = await updateProduct(id, formData);
            console.log('📦 Update response:', response);
            console.log('📦 Response status:', response.status);
            console.log('📦 Response data:', response.data);
            
            if (response.data && response.data.success) {
                alert('Product updated successfully!');
                
                // Save additional fields to localStorage for persistence
                const additionalFields = {
                    product_code: formData.product_code,
                    features: formData.features,
                    additional_images: formData.additional_images
                };
                localStorage.setItem(`product_${id}_additional`, JSON.stringify(additionalFields));
                console.log('💾 Saved additional fields to localStorage:', additionalFields);
                
                // Navigate back to products dashboard
                navigate('/products');
            } else {
                console.error('❌ Update failed:', response.data);
                console.error('❌ Error details:', response.data?.error);
                alert('Failed to update product: ' + (response.data?.error || response.data?.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('❌ Update error:', error);
            console.error('❌ Error response:', error.response);
            alert('Failed to update product: ' + (error.response?.data?.error || error.message || 'Unknown error'));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {/* Header */}
                        <div className="flex items-center mb-6">
                            <button
                                onClick={() => navigate('/admin/products')}
                                className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                            >
                                <FiArrowLeft className="mr-2" />
                                Back to Products
                            </button>
                            <h1 className="text-3xl font-bold text-gray-800">Product Not Found</h1>
                        </div>

                        {/* Error Message */}
                        <div className="text-center py-8">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-red-800 mb-2">Product Not Found</h2>
                                <p className="text-gray-600 mb-4">
                                    The product with ID "{id}" was not found.
                                </p>
                                <p className="text-gray-500 mb-4">
                                    Please check the product ID or go back to the products list.
                                </p>
                                <button
                                    onClick={() => navigate('/admin/products')}
                                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Back to Products
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    {/* Header */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate('/products')}
                            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
                        >
                            <FiArrowLeft className="mr-2" />
                            Back to Products
                        </button>
                        <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Code</label>
                                    <input
                                        type="text"
                                        name="product_code"
                                        value={formData.product_code || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., MAV-001"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (BDT)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (BDT)</label>
                                    <input
                                        type="number"
                                        name="original_price"
                                        value={formData.original_price}
                                        onChange={handleChange}
                                        step="0.01"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage (%)</label>
                                    <input
                                        type="number"
                                        name="discount_percentage"
                                        value={formData.discount_percentage}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                                    <input
                                        type="number"
                                        name="stock_quantity"
                                        value={formData.stock_quantity}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Status</label>
                                    <select
                                        name="is_active"
                                        value={formData.is_active}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Details</h2>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                    <select
                                        name="brand_id"
                                        value={formData.brand_id}
                                        onChange={(e) => {
                                            console.log('🎯 Brand changed to:', e.target.value);
                                            handleChange(e);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Brand</option>
                                        {Array.isArray(brands) && brands.map(brand => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma-separated)</label>
                                    <textarea
                                        name="features"
                                        value={Array.isArray(formData.features) ? formData.features.join(', ') : ''}
                                        onChange={(e) => {
                                            const featuresArray = e.target.value.split(',').map(f => f.trim()).filter(f => f);
                                            setFormData(prev => ({ ...prev, features: featuresArray }));
                                        }}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., Swiss Movement, Water Resistant, Leather Strap, Sapphire Glass"
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">None</option>
                                        <option value="Sale">Sale</option>
                                        <option value="Best Seller">Best Seller</option>
                                    </select>
                                </div>

                                {/* Image Upload Section */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Image (Main Product Image)</label>
                                        <input
                                            type="file"
                                            name="image_file"
                                            onChange={handleImageUpload}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {formData.image_url && (
                                            <div className="mt-2">
                                                <img 
                                                    src={`${ASSET_BASE_URL}${formData.image_url}`} 
                                                    alt="Primary product" 
                                                    className="w-32 h-32 object-cover rounded border"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images (Up to 4 more)</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[0, 1, 2, 3].map((index) => (
                                                <div key={index} className="space-y-2">
                                                    <input
                                                        type="file"
                                                        name={`additional_image_${index}`}
                                                        onChange={(e) => handleAdditionalImageUpload(e, index)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                                                    />
                                                    {formData.additional_images[index] && (
                                                        <img 
                                                            src={`${ASSET_BASE_URL}${formData.additional_images[index]}`} 
                                                            alt={`Additional image ${index + 1}`} 
                                                            className="w-full h-24 object-cover rounded border"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                            >
                                {saving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="mr-2" />
                                        Update Product
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

export default EditProduct;
