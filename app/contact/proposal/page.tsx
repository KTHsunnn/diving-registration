"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // 引入我們剛剛建立的 supabase 客戶端

export default function Proposal() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const data = {
            company_name: formData.get('company_name'),
            contact_name: formData.get('contact_name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        // 將資料存入 Supabase 的 contact_proposals 表格
        const { error } = await supabase
            .from('contact_proposals')
            .insert([data]);

        setLoading(false);

        if (error) {
            alert('送出失敗，請再試一次');
            console.error(error);
        } else {
            alert('送出成功！我們會盡快與您聯繫。');
            (event.target as HTMLFormElement).reset(); // 清空表單
        }
    }

    return (
        <main className="max-w-2xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-8">合作提案</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border shadow-sm">
                <div className="space-y-2">
                    <label className="block font-bold text-gray-700">公司名稱</label>
                    <input name="company_name" type="text" className="w-full p-4 border rounded-xl" required />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block font-bold text-gray-700">聯絡人姓名</label>
                        <input name="contact_name" type="text" className="w-full p-4 border rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                        <label className="block font-bold text-gray-700">連絡電話</label>
                        <input name="phone" type="tel" className="w-full p-4 border rounded-xl" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block font-bold text-gray-700">EMAIL</label>
                    <input name="email" type="email" className="w-full p-4 border rounded-xl" required />
                </div>

                <div className="space-y-2">
                    <label className="block font-bold text-gray-700">意見留言</label>
                    <textarea name="message" className="w-full p-4 border rounded-xl h-32"></textarea>
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition disabled:bg-gray-400"
                >
                    {loading ? '發送中...' : '送出合作提案'}
                </button>
            </form>
        </main>
    );
}