import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* 側邊導覽列 */}
            <aside className="w-64 bg-blue-900 text-white p-6">
                <h2 className="text-xl font-bold mb-8">管理後台</h2>
                <nav className="space-y-4">
                    <Link href="/admin" className="block p-2 hover:bg-blue-800 rounded">管理首頁</Link>
                    <Link href="/admin/registrations" className="block p-2 hover:bg-blue-800 rounded">報名管理</Link>
                    <Link href="/admin/inquiries" className="block p-2 hover:bg-blue-800 rounded">合作提案列表</Link>
                </nav>
            </aside>

            {/* 主內容區 */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}