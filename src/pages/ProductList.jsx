import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('زنانه');
  const [categories] = useState(['زنانه', 'مردانه', 'بچگانه', 'تخفیف خورده']);
  const [editProduct, setEditProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    if (!category) return;
    axios.get(`https://mystore-pbfe.onrender.com/api/products/category/${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [category]);

  const handleDelete = async (id) => {
    if (window.confirm('آیا از حذف این محصول مطمئن هستید؟')) {
      await axios.delete(`https://mystore-pbfe.onrender.com/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      sizes: product.sizes,
      colors: product.colors,
      image: product.image,
      category: product.category,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://mystore-pbfe.onrender.com/api/products/${editProduct._id}`, editFormData);
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        await axios.put(`https://mystore-pbfe.onrender.com/api/products/${editProduct._id}/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      setEditProduct(null);
      setImageFile(null);
      setProducts(prev => prev.map(p => p._id === editProduct._id ? { ...p, ...editFormData } : p));
    } catch (err) {
      console.error('خطا در ویرایش محصول:', err);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (typeof valueA === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">لیست محصولات</h1>

      <div className="mb-4">
        <label className="block mb-2 font-medium">انتخاب دسته‌بندی:</label>
        <select
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-xs"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="جستجو بر اساس نام محصول..."
        className="mb-6 px-4 py-2 border border-gray-300 rounded w-full max-w-md"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />

      {editProduct && (
        <form onSubmit={handleEditSubmit} className="mb-6">
          <h2 className="text-xl font-bold mb-4">ویرایش محصول</h2>
          <div className="mb-4">
            <label className="block">نام محصول</label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditChange}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">توضیحات</label>
            <input
              type="text"
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">قیمت</label>
            <input
              type="number"
              name="price"
              value={editFormData.price}
              onChange={handleEditChange}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">موجودی</label>
            <input
              type="number"
              name="stock"
              value={editFormData.stock || ''}
              onChange={handleEditChange}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">سایزها (با , جدا کن)</label>
            <input
              type="text"
              name="sizes"
              value={editFormData.sizes?.join(', ') || ''}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  sizes: e.target.value.split(',').map(s => s.trim()),
                })
              }
              className="px-4 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">رنگ‌ها (با , جدا کن)</label>
            <input
              type="text"
              name="colors"
              value={editFormData.colors?.join(', ') || ''}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  colors: e.target.value.split(',').map(c => c.trim()),
                })
              }
              className="px-4 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">آدرس تصویر</label>
            <input
              type="text"
              name="image"
              value={editFormData.image || ''}
              onChange={handleEditChange}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">دسته‌بندی</label>
            <select
              name="category"
              value={editFormData.category}
              onChange={handleEditChange}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block">آپلود تصویر جدید</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="px-4 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            ذخیره تغییرات
          </button>
        </form>
      )}


      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-right">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>نام</th>
              <th className="p-3">توضیحات</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('price')}>قیمت</th>
              <th className="p-3">دسته‌بندی</th>
              <th className="p-3">موجودی</th>
              <th className="p-3">سایزها</th>
              <th className="p-3">رنگ‌ها</th>
              <th className="p-3">تصویر</th>
              <th className="p-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.description}</td>
                <td className="p-3">{product.price} تومان</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.sizes?.join(', ')}</td>
                <td className="p-3">{product.colors?.join(', ')}</td>
                <td className="p-3">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  ) : '---'}
                </td>
                <td className="p-3 flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
            {currentProducts.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center p-4 text-gray-400">محصولی یافت نشد</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2 space-x-reverse">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
