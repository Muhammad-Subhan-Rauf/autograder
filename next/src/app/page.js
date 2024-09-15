
import CalendarHeader from "@/components/CalendarHeader";
import CalendarTable from "@/components/CalendarTable";
import Link from "next/link";

export default function Home() {

    return (
        <div className="flex bg-gray-200 items-start justify-center min-h-screen w-full pb-20">
                
            {/* Clickable Link */}
            <Link href="/pages/portal" className="fixed top-0 left-0 m-5 p-4 text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 font-extrabold text-2xl border border-transparent rounded-lg shadow-lg z-10">
                Student Portal
            </Link>


            <div className="p-8 bg-white rounded-lg shadow-lg max-w-[50%] w-full border border-blue-500 mt-10 md:mt-20">
                {/* <h1 className="text-2xl md:text-2xl font-bold text-center text-blue-500 mb-4">
                    Lab 1
                </h1> */}
                
                <CalendarHeader />

                <CalendarTable />

            </div>
        </div>
    );
}
