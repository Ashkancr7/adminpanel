// pages/EditProduct.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', category: '' });

  useEffect(() => {
    axios.get(`https://mystore-pbfe.onrender.com/api/products/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://mystore-pbfe.onrender.com/api/products/${id}`, form);
    alert('محصول ویرایش شد');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8 text-right" dir="rtl">
      <h2 className="text-2xl font-bold mb-6">ویرایش محصول</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 rounded-xl border" placeholder="نام" />
        <input name="price" value={form.price} onChange={handleChange} className="w-full p-3 rounded-xl border" placeholder="قیمت" />
        <input name="image" value={form.image} onChange={handleChange} className="w-full p-3 rounded-xl border" placeholder="لینک عکس" />
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-3 rounded-xl border" placeholder="توضیحات" />
        <select name="category" value={form.category} onChange={handleChange} className="w-full p-3 rounded-xl border">
          <option value="زنانه">زنانه</option>
          <option value="مردانه">مردانه</option>
          <option value="بچگانه">بچگانه</option>
          <option value="تخفیف‌خورده">تخفیف‌خورده</option>
        </select>
        <button className="w-full bg-green-600 text-white p-3 rounded-xl">ثبت تغییرات</button>
      </form>
    </div>
  );
};

export default EditProduct;