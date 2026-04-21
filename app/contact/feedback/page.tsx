export default function Feedback() {
    return (
        <main className="max-w-2xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-8">意見反應</h1>
            <p className="mb-8 text-gray-600">您的寶貴意見是我們進步的動力，請告訴我們您的想法。</p>
            <form className="space-y-4">
                <textarea className="w-full p-4 border rounded-xl h-40" placeholder="請輸入您的建議..." />
                <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold">送出意見</button>
            </form>
        </main>
    );
}