"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ title, children }: { title: string, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex justify-between items-center text-left font-bold text-lg hover:text-blue-600 transition"
            >
                {title}
                <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* 動畫開合區塊 */}
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="pb-4 text-gray-600 leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}