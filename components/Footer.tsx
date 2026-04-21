import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
            <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
                <p>© 2026 JorDiving 就跳水俱樂部. All Rights Reserved.</p>
                <p className="mt-2 opacity-80">Designed by T.H.K</p>
            </div>
        </footer >
    );
}