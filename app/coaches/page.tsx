import Link from 'next/link';
import Image from 'next/image';
import { coaches } from '@/data/coaches';

export default function CoachesList() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-16 text-center">教練團隊</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {coaches.map((coach) => {
                    // 根據 ID 對應圖片，確保這裡的檔名與 public 資料夾內的一致
                    const imageSrc = coach.id === 'jordi' ? '/林昀蒂.jpg' :
                        coach.id === 'Melody' ? '/林珊亦.jpg' :
                            '/default-coach.jpg';

                    return (
                        <Link
                            href={`/coaches/${coach.id}`}
                            key={coach.id}
                            className="group block bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-6">
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <Image
                                        src={imageSrc}
                                        alt={coach.name}
                                        fill
                                        sizes="96px"
                                        className="object-cover rounded-full border border-gray-200"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-900 group-hover:text-blue-600 transition">
                                        {coach.name}
                                    </h2>
                                    <p className="text-orange-500 font-bold mb-2">{coach.title}</p>
                                    <p className="text-gray-600 text-sm line-clamp-2">{coach.bio}</p>
                                    <span className="text-blue-600 font-sm font-bold mt-2 block">了解更多 →</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}