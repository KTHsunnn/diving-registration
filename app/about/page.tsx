export default function About() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-black text-blue-900 mb-6">關於 JorDiving</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    跳水不僅是競技，更是一場與重力對話的藝術。我們致力於將專業跳水推廣給每一位追求卓越的人。
                </p>
            </div>

            {/* 品牌核心理念 */}
            <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="bg-blue-50 p-8 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-4 text-blue-900">我們的初衷</h2>
                    <p className="text-gray-700 leading-relaxed">
                        JorDiving 由專業國家級教練團隊創立。我們深知跳水運動對心理與生理的深度挑戰，因此我們建立了一套系統化的教學流程，讓無論是零基礎的學員，或是目標競技的選手，都能在安全的環境下突破自我極限。
                    </p>
                </div>
                <div className="h-64 bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500">

                </div>
            </section>

            {/* 核心價值模組 */}
            <section className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">為何選擇我們？</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "國家級師資", desc: "教練群擁有奧運、亞運及全運會競賽經驗，傳授最紮實的技術。" },
                        { title: "極致安全性", desc: "採用高規格教學設備，嚴格執行安全防護標準，讓學員無後顧之憂。" },
                        { title: "系統化訓練", desc: "從基礎入門到高階競技，量身打造專屬您的訓練課表。" }
                    ].map((item, i) => (
                        <div key={i} className="p-6 border rounded-2xl hover:border-blue-300 transition">
                            <h3 className="text-xl font-bold mb-3 text-blue-900">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 願景 */}
            <section className="bg-gray-900 text-white p-12 rounded-3xl text-center">
                <h2 className="text-3xl font-bold mb-6">我們的願景</h2>
                <p className="text-lg opacity-90 max-w-xl mx-auto">
                    我們不只是在教跳水，我們是在培養對生活的熱情。透過每次入水的挑戰，讓每一位來到 JorDiving 的學員，都能看見更勇敢的自己。
                </p>
            </section>
        </main >
    );
}