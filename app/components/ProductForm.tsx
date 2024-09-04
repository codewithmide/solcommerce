"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

interface Product {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageUrl(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = { name, price, quantity, imageUrl };

    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');

    const updatedProducts = [...existingProducts, newProduct];

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    setName('');
    setPrice(0);
    setQuantity(1);
    setImageUrl('');
    setImagePreview(null);

    router.push('/products/list');
  };

  return (
    <form onSubmit={handleAddProduct} className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Product</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          placeholder="Enter product price"
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          placeholder="Enter quantity"
          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition duration-200"
      >
        Add Product
      </button>
    </form>
  );
}
