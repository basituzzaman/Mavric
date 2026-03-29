import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import {
    getAdminSliders,
    createSlider,
    updateSlider,
    deleteSlider,
    uploadFile,
    ASSET_BASE_URL
} from '../services/api';

const MAX_SLIDERS = 3;

const defaultForm = {
    title: '',
    description: '',
    link: '',
    image_url: '',
    order_position: 0,
    is_active: true,
};

const Sliders = () => {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingSlider, setEditingSlider] = useState(null);
    const [formData, setFormData] = useState(defaultForm);

    const activeCount = sliders.filter((slider) => slider.is_active).length;
    const canCreateMore = sliders.length < MAX_SLIDERS;

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        try {
            const response = await getAdminSliders();
            setSliders(response.data?.sliders || []);
        } catch (error) {
            console.error('Error fetching sliders:', error);
            setSliders([]);
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
        return `${ASSET_BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    };

    const openAddModal = () => {
        if (!canCreateMore) {
            alert(`Maximum ${MAX_SLIDERS} sliders allowed. Delete one to add a new slider.`);
            return;
        }
        setEditingSlider(null);
        setFormData({
            ...defaultForm,
            order_position: sliders.length,
        });
        setShowModal(true);
    };

    const openEditModal = (slider) => {
        setEditingSlider(slider);
        setFormData({
            title: slider.title || '',
            description: slider.description || '',
            link: slider.link || '',
            image_url: slider.image_url || '',
            order_position: slider.order_position ?? 0,
            is_active: slider.is_active ?? true,
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingSlider(null);
        setFormData(defaultForm);
    };

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
            setUploading(true);
            const response = await uploadFile(file, 'sliders');
            if (response.data?.success && response.data?.url) {
                setFormData((prev) => ({ ...prev, image_url: response.data.url }));
            } else {
                alert(response.data?.error || 'Failed to upload slider image');
            }
        } catch (error) {
            console.error('Slider upload error:', error);
            alert('Failed to upload slider image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image_url) {
            alert('Slider image is required');
            return;
        }

        if (formData.is_active && !editingSlider && activeCount >= MAX_SLIDERS) {
            alert(`Maximum ${MAX_SLIDERS} active sliders allowed.`);
            return;
        }

        if (
            formData.is_active
            && editingSlider
            && !editingSlider.is_active
            && activeCount >= MAX_SLIDERS
        ) {
            alert(`Maximum ${MAX_SLIDERS} active sliders allowed.`);
            return;
        }

        try {
            setSaving(true);
            const payload = {
                ...formData,
                order_position: Number(formData.order_position) || 0,
            };

            let response;
            if (editingSlider) {
                response = await updateSlider(editingSlider.id, payload);
            } else {
                response = await createSlider(payload);
            }

            if (response.data?.success) {
                closeModal();
                fetchSliders();
            } else {
                alert(response.data?.error || 'Failed to save slider');
            }
        } catch (error) {
            const message = error.response?.data?.error || 'Failed to save slider';
            alert(message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slider?')) return;
        try {
            const response = await deleteSlider(id);
            if (response.data?.success) {
                fetchSliders();
            } else {
                alert(response.data?.error || 'Failed to delete slider');
            }
        } catch (error) {
            console.error('Error deleting slider:', error);
            alert('Failed to delete slider');
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Slider Management</h1>
                    <p className="text-gray-600 mt-1">
                        Active sliders: {activeCount}/{MAX_SLIDERS}
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    disabled={!canCreateMore}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FiPlus /> Add Slider
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sliders.length === 0 && (
                            <tr>
                                <td className="px-6 py-6 text-gray-500 text-center" colSpan={5}>
                                    No sliders found.
                                </td>
                            </tr>
                        )}
                        {sliders.map((slider) => (
                            <tr key={slider.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <img
                                        src={getImageUrl(slider.image_url)}
                                        alt={slider.title || 'Slider'}
                                        className="w-24 h-14 object-cover rounded"
                                        onError={(e) => {
                                            e.target.src = '/placeholder.jpg';
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {slider.title || '-'}
                                </td>
                                <td className="px-6 py-4">{slider.order_position ?? 0}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        slider.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {slider.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(slider)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(slider.id)}
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
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">
                                {editingSlider ? 'Edit Slider' : 'Add Slider'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <FiX size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="Slider title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="Slider description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Link</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    placeholder="/products"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Order Position</label>
                                    <input
                                        type="number"
                                        min="0"
                                        name="order_position"
                                        value={formData.order_position}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </div>
                                <div className="flex items-center mt-7">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        checked={formData.is_active}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label className="text-sm font-medium text-gray-700">Active</label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Slider Image *</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                />
                                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                                {formData.image_url && (
                                    <img
                                        src={getImageUrl(formData.image_url)}
                                        alt="Slider Preview"
                                        className="mt-2 w-full h-40 object-cover border rounded"
                                    />
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving || uploading}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : editingSlider ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
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

export default Sliders;
