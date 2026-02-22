// Simple test for EditProduct page
console.log('🧪 EditProduct page test starting...');

// Test 1: Check if EditProduct component loads
try {
    const EditProduct = require('./pages/EditProduct');
    console.log('✅ EditProduct component loaded successfully');
} catch (error) {
    console.error('❌ EditProduct component failed to load:', error);
}
