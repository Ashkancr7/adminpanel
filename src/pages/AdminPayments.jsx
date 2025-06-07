import React, { useEffect, useState } from "react";

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await fetch("https://mystore-pbfe.onrender.com/api/payment/all");
                const data = await res.json();
                console.log("Payments Response:", data);
                setPayments(data);
            } catch (err) {
                console.error("خطا در دریافت پرداخت‌ها", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">لیست پرداخت‌ها</h2>
            {loading ? (
                <p>در حال بارگذاری....</p>
            ) : (
                <div className="overflow-auto">
                    <table className="w-full border text-sm text-center">
                        <thead className="bg-gray-100">
                            <tr>
                               

                                <th className="p-2 border">کاربر</th>
                                <th className="p-2 border">مبلغ</th>
                                <th className="p-2 border">وضعیت</th>
                                <th className="p-2 border">کد رهگیری</th>
                                <th className="p-2 border">Authority</th>
                                <th className="p-2 border">تاریخ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((p) => (
                                <tr key={p._id} className="border-t">
                                    <td>{p.receiverName}</td>
                                 
                                    <td className="p-2 border">{p.amount.toLocaleString()} تومان</td>
                                    <td className="p-2 border">
                                        {p.isPaid ? 'موفق' : 'ناموفق'}
                                    </td>
                                    <td className="p-2 border">{p.refId || "-"}</td>
                                    <td className="p-2 border">{p.authority}</td>
                                    <td className="p-2 border">
                                        {new Date(p.createdAt).toLocaleDateString("fa-IR")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPayments;
