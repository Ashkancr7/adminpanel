import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nam: '',
    lname: '',
    phone: '',
    address: ''
  });
  const [newUserData, setNewUserData] = useState({
    nam: '',
    lname: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.get('https://mystore-pbfe.onrender.com/api/auth/users');
    setUsers(res.data);
  } catch (err) {
    console.error('خطا در دریافت کاربران:', err);
    setError('خطا در دریافت کاربران');
  } finally {
    setLoading(false);
  }
};

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setEditFormData({
      nam: user.nam || '',
      lname: user.lname || '',
      phone: user.phone || '',
      address: user.address || ''
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://mystore-pbfe.onrender.com/api/auth/users/${editUserId}`, editFormData);
      fetchUsers(); // refresh data
      setEditUserId(null); // close edit mode
    } catch (err) {
      console.error('خطا در ویرایش کاربر:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('آیا از حذف این کاربر مطمئن هستید؟')) {
      try {
        await axios.delete(`https://mystore-pbfe.onrender.com/api/auth/users/${id}`);
        setUsers(prev => prev.filter(user => user._id !== id));
      } catch (error) {
        console.error('خطا در حذف کاربر:', error);
      }
    }
  };

  const handleNewUserChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://mystore-pbfe.onrender.com/api/auth/register', newUserData);
      fetchUsers(); // refresh data
      setNewUserData({ nam: '', lname: '', phone: '', address: '' }); // clear form
    } catch (err) {
      console.error('خطا در اضافه کردن کاربر:', err);
    }
  };

  const filteredUsers = users.filter(user =>
    (user.nam || '').toLowerCase().includes(search.toLowerCase()) ||
    (user.lname || '').toLowerCase().includes(search.toLowerCase()) ||
    (user.phone || '').includes(search)
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">لیست کاربران ثبت‌نام شده</h2>

      {/* جستجو */}
      <input
        type="text"
        placeholder="جستجو بر اساس نام، نام خانوادگی یا شماره"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* فرم اضافه کردن کاربر جدید */}
      <h3 className="text-lg font-bold mb-2">افزودن کاربر جدید</h3>
      <form onSubmit={handleAddUserSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="nam"
          placeholder="نام"
          value={newUserData.nam}
          onChange={handleNewUserChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="lname"
          placeholder="نام خانوادگی"
          value={newUserData.lname}
          onChange={handleNewUserChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="phone"
          placeholder="شماره تلفن"
          value={newUserData.phone}
          onChange={handleNewUserChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="address"
          placeholder="آدرس"
          value={newUserData.address}
          onChange={handleNewUserChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          افزودن کاربر
        </button>
      </form>

      {/* جدول کاربران */}
      <div className="overflow-x-auto">
        {loading && <p className="text-center text-blue-500 my-4">در حال بارگذاری...</p>}
        {error && <p className="text-center text-red-500 my-4">{error}</p>}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 border">ردیف</th>
              <th className="py-2 px-4 border">نام</th>
              <th className="py-2 px-4 border">نام خانوادگی</th>
              <th className="py-2 px-4 border">شماره تلفن</th>
              <th className="py-2 px-4 border">آدرس</th>
              <th className="py-2 px-4 border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">کاربری یافت نشد</td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="py-2 px-4 border">{index + 1}</td>

                  {editUserId === user._id ? (
                    <>
                      <td className="py-2 px-4 border">
                        <input
                          name="nam"
                          value={editFormData.nam}
                          onChange={handleEditChange}
                          className="border px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <input
                          name="lname"
                          value={editFormData.lname}
                          onChange={handleEditChange}
                          className="border px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <input
                          name="phone"
                          value={editFormData.phone}
                          onChange={handleEditChange}
                          className="border px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <input
                          name="address"
                          value={editFormData.address}
                          onChange={handleEditChange}
                          className="border px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 border space-x-1 space-x-reverse">
                        <button
                          onClick={handleEditSubmit}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          ذخیره
                        </button>
                        <button
                          onClick={() => setEditUserId(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          انصراف
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 border">{user.nam || '-'}</td>
                      <td className="py-2 px-4 border">{user.lname || '-'}</td>
                      <td className="py-2 px-4 border">{user.phone}</td>
                      <td className="py-2 px-4 border">{user.address || '-'}</td>
                      <td className="py-2 px-4 border space-x-1 space-x-reverse">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          حذف
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
