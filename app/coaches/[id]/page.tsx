import { coaches } from '@/data/coaches';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function CoachDetail({ params }: { params: { id: string } }) {
    // 處理 params (Next.js 15+ 規範)
    const { id } = await params;
    const coach = coaches.find((c) => c.id === id);

    if (!coach) notFound();

    // 根據 ID 設定正確的照片路徑，確保與 public 資料夾內的檔名一致
    // Jordi -> 林昀蒂.jpg
    // Melody -> 林珊亦.jpg (您新上傳的照片)
    const imageSrc = coach.id === 'jordi' ? '/林昀蒂.jpg' :
        coach.id === 'Melody' ? '/林珊亦.jpg' :
            '/default-coach.jpg'; // 保底圖

    return (
        <main className="max-w-4xl mx-auto px-6 py-20">
            <div className="bg-white border rounded-3xl p-10 shadow-sm">

                {/* 教練基本資料區 */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">

                    {/* 教練大頭貼 */}
                    <div className="relative w-40 h-40 flex-shrink-0">
                        <Image
                            src={imageSrc} // 使用上面判斷好的正確圖片路徑
                            alt={coach.name}
                            fill
                            priority // 首要載入
                            sizes="(max-width: 768px) 160px, 160px" // 優化效能
                            className="object-cover rounded-full border-4 border-gray-100 shadow-inner"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold text-blue-900">{coach.name}</h1>
                        <p className="text-orange-500 font-bold text-xl mt-2 mb-4">{coach.title}</p>
                        <p className="text-gray-700 text-lg leading-relaxed">{coach.bio}</p>
                    </div>
                </div>

                {/* 證照與經歷區 (維持原樣) */}
                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                    <section className="bg-blue-50 p-6 rounded-2xl">
                        <h3 className="font-bold text-lg mb-4 text-blue-900 border-b border-blue-200 pb-2">專長證照</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {coach.certifications.map((c, i) => <li key={i}>● {c}</li>)}
                        </ul>
                    </section>
                    <section className="bg-gray-50 p-6 rounded-2xl">
                        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b border-gray-200 pb-2">專業經歷</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            {coach.experience.map((e, i) => <li key={i}>◆ {e}</li>)}
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}