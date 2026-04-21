"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function InquiriesPage() {
    const [proposals, setProposals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    const fetchData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_proposals')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('讀取失敗:', error);
        if (data) setProposals(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('確定要刪除這筆提案嗎？')) return;
        const { error } = await supabase.from('contact_proposals').delete().eq('id', id);
        if (error) alert('刪除失敗：' + error.message);
        else fetchData();
    };

    const startEdit = (item: any) => {
        setEditingId(item.id);
        setEditForm(item);
    };

    const handleSave = async (id: string) => {
        const { error } = await supabase
            .from('contact_proposals')
            .update(editForm)
            .eq('id', id);

        if (error) alert('儲存失敗：' + error.message);
        else {
            setEditingId(null);
            fetchData();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="p-10 text-center">載入中...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">合作提案管理</h1>

            <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4">聯絡人姓名</th>
                            <th className="p-4">公司名稱</th>
                            <th className="p-4">聯絡資訊</th>
                            <th className="p-4">意見留言</th>
                            <th className="p-4">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposals.map((item) => (
                            <tr key={item.id} className="border-b align-top">
                                {editingId === item.id ? (
                                    <>
                                        {/* 修正：input name 改為 contact_name */}
                                        <td className="p-2"><input name="contact_name" value={editForm.contact_name || ''} onChange={handleInputChange} className="border p-1 w-20" /></td>
                                        <td className="p-2"><input name="company_name" value={editForm.company_name || ''} onChange={handleInputChange} className="border p-1 w-24" /></td>
                                        <td className="p-2">
                                            <input name="email" value={editForm.email || ''} onChange={handleInputChange} className="border p-1 w-full mb-1" placeholder="Email" />
                                            <input name="phone" value={editForm.phone || ''} onChange={handleInputChange} className="border p-1 w-full" placeholder="Phone" />
                                        </td>
                                        <td className="p-2"><textarea name="message" value={editForm.message || ''} onChange={handleInputChange} className="border p-1 w-full h-20" /></td>
                                        <td className="p-2 space-y-2">
                                            <button onClick={() => handleSave(item.id)} className="block text-blue-600 font-bold">儲存</button>
                                            <button onClick={() => setEditingId(null)} className="block text-gray-500">取消</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        {/* 修正：顯示 item.contact_name */}
                                        <td className="p-4 font-medium">{item.contact_name}</td>
                                        <td className="p-4">{item.company_name}</td>
                                        <td className="p-4 text-gray-600">{item.email}<br />{item.phone}</td>
                                        <td className="p-4 text-gray-600 max-w-xs">{item.message}</td>
                                        <td className="p-4 space-y-2">
                                            <button onClick={() => startEdit(item)} className="block text-blue-600 hover:underline">編輯</button>
                                            <button onClick={() => handleDelete(item.id)} className="block text-red-600 hover:underline">刪除</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {proposals.length === 0 && <div className="p-8 text-center text-gray-500">目前沒有合作提案</div>}
            </div>
        </div>
    );
}