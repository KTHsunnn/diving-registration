import { supabase } from '@/lib/supabase';

export default async function AdminDashboard() {
    // 並行抓取兩張表的資料數量
    const [inquiries, registrations] = await Promise.all([
        supabase.from('contact_proposals').select('*', { count: 'exact', head: true }),
        supabase.from('registrations').select('*', { count: 'exact', head: true })
    ]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">管理後台總覽</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-gray-500">總合作提案數</h3>
                    <p className="text-4xl font-bold mt-2 text-blue-900">{inquiries.count || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="text-gray-500">總報名人數</h3>
                    <p className="text-4xl font-bold mt-2 text-green-700">{registrations.count || 0}</p>
                </div>
            </div>
        </div>
    );
}