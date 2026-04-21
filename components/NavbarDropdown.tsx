"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function NavbarDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* 觸發按鈕 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 hover:text-blue-600 transition font-medium"
            >
                聯絡我們 <ChevronDown size={16} />
            </button>

            {/* 下拉選單 */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-50 py-2">
                    <Link
                        href="/contact/feedback"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                        意見反應
                    </Link>
                    <Link
                        href="/contact/proposal"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                        合作提案
                    </Link>
                </div>
            )}
        </div>
    );
}