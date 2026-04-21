"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function RegistrationsPage() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    // 載入資料
    const fetchData = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('registrations')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setRegistrations(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 刪除功能
    const handleDelete = async (id: string) => {
        if (!confirm('確定要刪除這筆報名嗎？')) return;

        await supabase.from('registrations').delete().eq('id', id);
        fetchData(); // 重新整理列表
    };

    // 開始編輯
    const startEdit = (item: any) => {
        setEditingId(item.id);
        setEditForm(item);
    };

    // 儲存編輯
    const handleSave = async (id: string) => {
        await supabase.from('registrations').update(editForm).eq('id', id);
        setEditingId(null);
        fetchData();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="p-10 text-center">載入中...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">學員報名管理</h1>

            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4">姓名</th>
                            <th className="p-4">手機</th>
                            <th className="p-4">時段</th>
                            <th className="p-4">匯款後五碼</th>
                            <th className="p-4">經驗</th>
                            <th className="p-4">游泳</th>
                            <th className="p-4">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((item) => (
                            <tr key={item.id} className="border-b">
                                {editingId === item.id ? (
                                    <>
                                        <td className="p-2"><input name="name" value={editForm.name} onChange={handleInputChange} className="border p-1 w-20" /></td>
                                        <td className="p-2"><input name="phone" value={editForm.phone} onChange={handleInputChange} className="border p-1 w-24" /></td>
                                        <td className="p-2"><input name="timeslot" value={editForm.timeslot} onChange={handleInputChange} className="border p-1 w-24" /></td>
                                        <td className="p-2"><input name="bankaccount" value={editForm.bankaccount} onChange={handleInputChange} className="border p-1 w-16" /></td>
                                        <td className="p-2">
                                            <select name="hasexperience" value={editForm.hasexperience} onChange={handleInputChange}>
                                                <option value="yes">是</option><option value="no">否</option>
                                            </select>
                                        </td>
                                        <td className="p-2">
                                            <select name="swimmingability" value={editForm.swimmingability} onChange={handleInputChange}>
                                                <option value="yes">具備</option><option value="no">不具備</option>
                                            </select>
                                        </td>
                                        <td className="p-2 space-x-2">
                                            <button onClick={() => handleSave(item.id)} className="text-blue-600 font-bold">儲存</button>
                                            <button onClick={() => setEditingId(null)} className="text-gray-500">取消</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4">{item.phone}</td>
                                        <td className="p-4">{item.timeslot}</td>
                                        <td className="p-4">{item.bankaccount}</td>
                                        <td className="p-4">{item.hasexperience === 'yes' ? '是' : '否'}</td>
                                        <td className="p-4">{item.swimmingability === 'yes' ? '具備' : '不具備'}</td>
                                        <td className="p-4 space-x-3">
                                            <button onClick={() => startEdit(item)} className="text-blue-600">編輯</button>
                                            <button onClick={() => handleDelete(item.id)} className="text-red-600">刪除</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}