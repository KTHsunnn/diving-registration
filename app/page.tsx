import Image from 'next/image';

export default function Home() {
    return (
        <main>
            <section className="relative h-[70vh] flex items-center justify-center text-white">
                <Image src="/d2743159.jpg" alt="Hero" fill priority className="object-cover brightness-50" />
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">JorDiving 跳水俱樂部</h1>
                    <p className="text-xl md:text-2xl font-light mb-8">突破重力，與自我身心對話的兩秒鐘</p>
                    <a href="/register" className="bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-full text-lg font-bold transition shadow-xl">立即預約體驗</a>
                </div>
            </section>

            <section className="max-w-6xl mx-auto py-20 px-6">
                <h2 className="text-4xl font-bold text-center mb-16">三大核心承諾</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        { t: "安全至上", d: "專業教練全程監控，確保每一位學員的安全與姿勢正確。" },
                        { t: "精細教學", d: "小班制教學，依個人程度調整進度，絕不速成。" },
                        { t: "專業場地", d: "標準跳水設備，提供最接近實戰的訓練環境。" }
                    ].map((item, i) => (
                        <div key={i} className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-md transition">
                            <h3 className="text-2xl font-bold mb-4 text-blue-900">{item.t}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.d}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}