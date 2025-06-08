import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('https://mystore-pbfe.onrender.com/api/payment/all-orders');
                setOrders(res.data);
                setFilteredOrders(res.data);
            } catch (err) {
                console.error('خطا در گرفتن سفارش‌ها:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        let updated = [...orders];
        if (statusFilter !== 'all') {
            updated = updated.filter(order => order.paymentStatus === statusFilter);
        }
        if (searchQuery.trim()) {
            updated = updated.filter(order =>
                order.address?.receiverName?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredOrders(updated);
    }, [orders, searchQuery, statusFilter]);

    const renderStatusBadge = (status) => {
        const colorMap = {
            paid: 'bg-green-500',
            unpaid: 'bg-yellow-500',
            failed: 'bg-red-500',
        };
        const labelMap = {
            paid: 'پرداخت شده',
            unpaid: 'پرداخت نشده',
            failed: 'ناموفق',
        };
        return <span className={`px-2 py-1 rounded text-white ${colorMap[status]}`}>{labelMap[status]}</span>;
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm('آیا مطمئنی می‌خوای این سفارش رو حذف کنی؟')) return;
        try {
            await axios.delete(`https://mystore-pbfe.onrender.com/api/payment/order/${orderId}`);
            setOrders(prev => prev.filter(order => order._id !== orderId));
            alert('سفارش با موفقیت حذف شد.');
        } catch (err) {
            console.error('خطا در حذف سفارش:', err.message);
            alert('خطا در حذف سفارش!');
        }
    };

    const handleEditOrder = async () => {
        const { _id, paymentStatus, address } = selectedOrder;
        if (!paymentStatus || !address?.address || !address?.postCode) {
            alert('لطفاً تمام فیلدها را پر کنید.');
            return;
        }

        setSaving(true);
        try {
            await axios.put(`https://mystore-pbfe.onrender.com/api/payment/order/${_id}`, {
                paymentStatus,
                address,
            });

            setOrders((prev) =>
                prev.map(order => order._id === _id ? selectedOrder : order)
            );

            alert('سفارش با موفقیت ویرایش شد.');
            setEditMode(false);
            setShowModal(false);
            setSelectedOrder(null);
        } catch (err) {
            console.error('خطا در ویرایش سفارش:', err.message);
            alert('خطا در ویرایش سفارش!');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">مدیریت سفارش‌ها</h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="all">همه وضعیت‌ها</option>
                    <option value="paid">پرداخت شده</option>
                    <option value="unpaid">پرداخت نشده</option>
                    <option value="failed">ناموفق</option>
                </select>

                <input
                    type="text"
                    placeholder="جستجو بر اساس نام گیرنده"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border px-3 py-2 rounded w-full sm:w-64"
                />
            </div>

            {loading ? (
                <p>در حال بارگذاری سفارش‌ها...</p>
            ) : (
                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border">#</th>
                                <th className="px-4 py-2 border">گیرنده</th>
                                <th className="px-4 py-2 border">همراه</th>
                                <th className="px-4 py-2 border">محصولات</th>
                                <th className="px-4 py-2 border">مبلغ</th>
                                <th className="px-4 py-2 border">وضعیت</th>
                                <th className="px-4 py-2 border">تاریخ</th>
                                <th className="px-4 py-2 border hidden lg:table-cell">آدرس</th>
                                <th className="px-4 py-2 border hidden lg:table-cell">کدپستی</th>
                                <th className="px-4 py-2 border">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, index) => (
                                <tr key={order._id} className="text-center">
                                    <td className="border px-2 py-1">{index + 1}</td>
                                    <td className="border px-2 py-1">{order.address?.receiverName}</td>
                                    <td className="border px-2 py-1">{order.address?.receiverPhone}</td>
                                    <td className="border px-2 py-1">
                                        <ul className="list-disc pl-4 text-right">
                                            {order.items.map((item) => (
                                                <li key={item._id} className="flex items-center gap-2">
                                                    <img
                                                        src={item.productId?.image}
                                                        alt={item.productId?.name}
                                                        className="w-10 h-10 object-cover rounded"
                                                    />
                                                    {item.productId?.name} (x{item.quantity})
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="border px-2 py-1">{order.finalAmount} تومان</td>
                                    <td className="border px-2 py-1">{renderStatusBadge(order.paymentStatus)}</td>
                                    <td className="border px-2 py-1">{new Date(order.createdAt).toLocaleString('fa-IR')}</td>
                                    <td className="border px-2 py-1 hidden lg:table-cell">{order.address?.address}</td>
                                    <td className="border px-2 py-1 hidden lg:table-cell">{order.address?.postCode}</td>
                                    <td className="border px-2 py-1 space-x-2 space-x-reverse">
                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order);
                                                setShowModal(true);
                                            }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            جزئیات
                                        </button>
                                        <button
                                            onClick={() => handleDeleteOrder(order._id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredOrders.length === 0 && (
                        <p className="mt-4 text-gray-500">سفارشی یافت نشد.</p>
                    )}
                </div>
            )}

            {showModal && selectedOrder && (
                <Modal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setEditMode(false);
                        setSelectedOrder(null);
                    }}
                    title="جزئیات سفارش"
                >
                    <div className="space-y-2 text-right text-sm sm:text-base">
                        {editMode ? (
                            <>
                                <label>وضعیت پرداخت:</label>
                                <select
                                    value={selectedOrder.paymentStatus}
                                    onChange={(e) =>
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            paymentStatus: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="paid">پرداخت شده</option>
                                    <option value="unpaid">پرداخت نشده</option>
                                    <option value="failed">ناموفق</option>
                                </select>

                                <label>آدرس:</label>
                                <input
                                    type="text"
                                    value={selectedOrder.address?.address || ''}
                                    onChange={(e) =>
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            address: {
                                                ...selectedOrder.address,
                                                address: e.target.value,
                                            },
                                        })
                                    }
                                    className="border p-2 rounded w-full"
                                />

                                <label>کدپستی:</label>
                                <input
                                    type="text"
                                    value={selectedOrder.address?.postCode || ''}
                                    onChange={(e) =>
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            address: {
                                                ...selectedOrder.address,
                                                postCode: e.target.value,
                                            },
                                        })
                                    }
                                    className="border p-2 rounded w-full"
                                />
                            </>
                        ) : (
                            <>
                                <p>گیرنده: {selectedOrder.address?.receiverName}</p>
                                <p>مبلغ: {selectedOrder.finalAmount} تومان</p>
                                <p>وضعیت پرداخت: {renderStatusBadge(selectedOrder.paymentStatus)}</p>
                                <p>آدرس: {selectedOrder.address?.address}</p>
                                <p>کدپستی: {selectedOrder.address?.postCode}</p>
                            </>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        {editMode ? (
                            <>
                                <button
                                    onClick={handleEditOrder}
                                    disabled={saving}
                                    className={`bg-green-600 text-white px-4 py-2 rounded ${saving ? 'opacity-50' : ''}`}
                                >
                                    ذخیره
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    لغو
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    ویرایش
                                </button>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedOrder(null);
                                    }}
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                >
                                    بستن
                                </button>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Orders;
