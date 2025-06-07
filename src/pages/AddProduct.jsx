import { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

const AddProduct = () => {
  const [message, setMessage] = useState(null);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    discountPercentage: '',
    stock: '',
    colors: '',
    sizes: '',
    isFeatured: false,
    isActive: true,
    image: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...product,
      price: Number(product.price),
      discountPercentage: Number(product.discountPercentage),
      stock: Number(product.stock),
      colors: product.colors.split(',').map(c => c.trim()),
      sizes: product.sizes.split(',').map(s => s.trim())
    };

    try {
      await axios.post('https://mystore-pbfe.onrender.com/api/products', payload);
      setMessage('✅ محصول با موفقیت اضافه شد!');
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      setMessage('❌ خطا در افزودن محصول!');
    }
  };

  return (
    <div dir="rtl" className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">افزودن محصول جدید</h2>

        {message && (
          <div className="mb-4 text-center text-sm text-green-600 font-semibold">
            {message}
          </div>
        )}

        {/* نام */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">عنوان محصول</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="مثلاً: مانتو تابستانی"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* دسته‌بندی */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">دسته‌بندی</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">انتخاب کنید</option>
            <option value="زنانه">👩 زنانه</option>
            <option value="مردانه">👨 مردانه</option>
            <option value="بچگانه">🧒 بچگانه</option>
            <option value="تخفیف خورده">💸 تخفیف خورده</option>
          </select>
        </div>

        {/* قیمت */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">قیمت (تومان)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="مثلاً: ۱۸۵۰۰۰"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* درصد تخفیف */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">درصد تخفیف</label>
          <input
            type="number"
            name="discountPercentage"
            value={product.discountPercentage}
            onChange={handleChange}
            placeholder="مثلاً: ۲۰"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* تعداد موجودی */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">تعداد موجودی</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="مثلاً: ۱۰"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* رنگ‌ها */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">رنگ‌ها (با کاما جدا کنید)</label>
          <input
            type="text"
            name="colors"
            value={product.colors}
            onChange={handleChange}
            placeholder="مثلاً: قرمز, آبی, مشکی"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* سایزها */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">سایزها (با کاما جدا کنید)</label>
          <input
            type="text"
            name="sizes"
            value={product.sizes}
            onChange={handleChange}
            placeholder="مثلاً: S, M, L"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* لینک تصویر */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">لینک تصویر</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* چک‌باکس‌ها */}
        <div className="mb-4 flex flex-col gap-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={product.isFeatured}
              onChange={handleChange}
              className="ml-2"
            />
            <span>محصول ویژه</span>
          </label>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={product.isActive}
              onChange={handleChange}
              className="ml-2"
            />
            <span>فعال باشد</span>
          </label>
        </div>

        {/* دکمه افزودن */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 transition"
        >
          <FaPlus /> افزودن محصول
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
