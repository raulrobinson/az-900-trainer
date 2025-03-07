'use client';

import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {toast, ToastContainer} from "react-toastify";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";

interface Question {
    id: number;
    answer: string;
    pa: string;
    pb: string;
    pc: string;
    pd: string;
    ra: string;
    rb: string;
    rc: string;
    rd: string;
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
}

// Function to shuffle the array of questions
const shuffleArray = (array: Question[]) => {
    return array.sort(() => Math.random() - 0.5);
};

export default function SpanishPage() {
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: boolean }>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                setIsLoading(true);
                const response = await fetch('/api/answers-spanish');
                let data: Question[] = await response.json();
                data = shuffleArray(data);
                setQuestions(data);
                setQuestion(data[0]);
            } catch (err) {
                setError('No se pudieron cargar las preguntas');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
        setIsLoading(false);
    }, []);

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setQuestion(questions[currentIndex + 1]);
            setUserAnswers({});
        }
    };

    const handlePreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
            setQuestion(questions[currentIndex - 1]);
            setUserAnswers({});
        }
    };

    const checkAnswers = () => {
        if (!question) return;

        const correctAnswers = {
            a: question.a,
            b: question.b,
            c: question.c,
            d: question.d,
        };

        const userResponses = {
            a: !!userAnswers.a,
            b: !!userAnswers.b,
            c: !!userAnswers.c,
            d: !!userAnswers.d,
        };

        const isCorrect = Object.keys(correctAnswers).every(
            (option) => correctAnswers[option as keyof typeof correctAnswers] === userResponses[option as keyof typeof userResponses]
        );

        isCorrect ? toast.success('Respuesta correcta') : toast.error('Respuesta incorrecta');

        return isCorrect;
    };

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Header/>
            <main className="mt-4 w-full flex flex-col items-center justify-center px-2 py-2">
                {error && <p className="text-red-500">{error}</p>}

                {/* Pregunta */}
                {question && (
                    <div className="w-full max-w-lg border p-4 rounded shadow-lg">
                        <p className="font-medium text-lg">{question.answer}</p>

                        <div className="mt-4 space-y-3">
                            {["a", "b", "c", "d"].map((option) => {
                                const optionText = question[`p${option}` as keyof Question];
                                const optionValue = question[`r${option}` as keyof Question];

                                if (!optionText || !optionValue) return null; // Oculta opciones vacías

                                return (
                                    <label key={option} className="flex items-center space-x-3 p-3 rounded-md">
                                        <input
                                            type="checkbox"
                                            checked={!!userAnswers[option]}
                                            onChange={() =>
                                                setUserAnswers((prev) => ({
                                                    ...prev,
                                                    [option]: !prev[option],
                                                }))
                                            }
                                            className="w-5 h-5"
                                        />
                                        <span className="font-medium">
                                        {optionText}. {optionValue}
                                    </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Navegación entre preguntas */}
                {question && (
                    <div className="flex justify-between mt-4 w-full max-w-lg absolute bottom-5 sm:items-start">

                        {/* Botón para pregunta anterior */}
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentIndex === 0}
                            className={`px-4 py-2 rounded w-12 h-12 flex items-center justify-center text-2xl ${
                                currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
                            }`}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="text-white text-2xl"/>
                        </button>

                        {/* Indicador de Pregunta */}
                        <span className="text-lg font-bold flex items-center justify-center">
                        {currentIndex + 1} / {questions.length}
                    </span>

                        {/* Botón para siguiente pregunta */}
                        <button
                            onClick={() => {
                                const isCorrect = checkAnswers();
                                if (isCorrect) {
                                    setTimeout(() => handleNextQuestion(), 1000);
                                }
                            }}
                            disabled={currentIndex >= questions.length - 1}
                            className={`px-4 py-2 rounded w-12 h-12 flex items-center justify-center text-2xl ${
                                currentIndex >= questions.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
                            }`}
                        >
                            <FontAwesomeIcon icon={faArrowRight} className="text-white text-2xl"/>
                        </button>
                    </div>
                )}

                {/* Toast notifications */}
                <ToastContainer
                    autoClose={1000}
                    draggable={false}
                    position="top-right"
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnHover
                />
            </main>
        </div>
    );
}
