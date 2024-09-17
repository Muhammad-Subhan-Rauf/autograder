'use client';

import Calendar from "@/components/gui/Calendar";
import Link from "next/link";

export default function Home() {

    return (
        <div className="flex bg-gray-200 items-start justify-center min-h-screen w-full pb-20">
                
            {/* Clickable Link */}
            <Link href="/pages/portal" className="fixed top-0 left-0 m-5 p-4 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 font-extrabold text-1xl border border-transparent rounded-lg shadow-lg z-10">
                Student Portal
            </Link>

            <Calendar />
        </div>
    );
}
