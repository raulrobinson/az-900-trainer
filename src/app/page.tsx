'use client';

import { ToastContainer } from "react-toastify";
import { useRouter } from 'next/navigation';
import Flag from "react-world-flags";
import Footer from "@/app/components/Footer";

export default function QuizPage() {
    const router = useRouter();

    const goToSpanishPage = () => {
        router.push('/spanish');
    };

    const goToEnglishPage = () => {
        router.push('/english');
    }

    return (
        <div className="flex flex-col items-center justify-center px-2 py-2">
            <h1 className="text-2xl font-bold mb-4">AZ-900</h1>

            {/* Iconos de banderas */}
            <div className="flex space-x-6 mt-2">
                <button
                    onClick={ goToEnglishPage }
                    className="flex flex-col items-center space-y-2 group"
                >
                    <Flag code="gb" className="w-30 h-26 rounded-lg shadow-lg group-hover:scale-110 transition" />
                    <span className="text-gray-50 text-sm group-hover:text-gray-200">English</span>
                </button>
                <button
                    onClick={ goToSpanishPage }
                    className="flex flex-col items-center space-y-2 group"
                >
                    <Flag code="es" className="w-30 h-26 rounded-lg shadow-lg group-hover:scale-110 transition" />
                    <span className="text-gray-50 text-sm group-hover:text-gray-200">Español</span>
                </button>
            </div>

            <Footer/>
        </div>
    );
}
