import Link from 'next/link';
import { Noto_Sans_TC } from 'next/font/google';
import NavbarDropdown from '@/components/NavbarDropdown';
import Footer from '@/components/Footer';
import './globals.css';

const noto = Noto_Sans_TC({ subsets: ['latin'], weight: ['400', '700', '900'] });

// --- SEO 與 Google 驗證區 ---
export const metadata = {
  title: 'JORDIVING | 專業跳水教學',
  description: '跳水課程報名、跳水課程，學跳水。',
  verification: {
    // 當您在 Google Search Console 取得驗證碼後，請替換下方字串
    google: '<meta name="google-site-verification" content="eyng6DtwIU8kn_QX1tHPgqczmuWRXbGZlm5eksvc11A" />',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={noto.className}>
      <body className="bg-white text-gray-900" suppressHydrationWarning>
        <nav className="sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
            <Link href="/" className="text-2xl font-black text-blue-900">
              JOR<span className="text-blue-600">DIVING</span>
            </Link>
            <div className="flex gap-8 font-medium items-center">
              <Link href="/" className="hover:text-blue-600 transition">首頁</Link>
              <Link href="/about" className="hover:text-blue-600 transition">關於我們</Link>
              <Link href="/coaches" className="hover:text-blue-600 transition">教練簡介</Link>

              {/* 下拉選單 */}
              <NavbarDropdown />

              <Link href="/register" className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition">立即報名</Link>
            </div>
          </div>
        </nav>

        {children}

        <Footer />
      </body>
    </html>
  );
}