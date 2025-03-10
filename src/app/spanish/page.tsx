// 'use client';
//
// import { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import Loading from "@/app/components/Loading";
// import Header from "@/app/components/Header";
//
// interface Question {
//     id: number;
//     answer: string;
//     pa: string;
//     pb: string;
//     pc: string;
//     pd: string;
//     ra: string;
//     rb: string;
//     rc: string;
//     rd: string;
//     a: boolean;
//     b: boolean;
//     c: boolean;
//     d: boolean;
// }
//
// // Función para mezclar preguntas aleatoriamente
// const shuffleArray = (array: Question[]) => {
//     return array.sort(() => Math.random() - 0.5);
// };
//
// export default function SpanishPage() {
//     const [question, setQuestion] = useState<Question | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [questions, setQuestions] = useState<Question[]>([]);
//     const [userAnswers, setUserAnswers] = useState<{ [key: string]: boolean }>({});
//     const [feedback, setFeedback] = useState<{ [key: string]: 'correct' | 'incorrect' | null }>({});
//     const [answered, setAnswered] = useState(false);
//
//     useEffect(() => {
//         const fetchQuestions = async () => {
//             try {
//                 const response = await fetch('/api/answers-spanish');
//                 let data: Question[] = await response.json();
//                 data = shuffleArray(data);
//                 setQuestions(data);
//                 setQuestion(data[0]);
//             } catch (err) {
//                 setError('No se pudieron cargar las preguntas');
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchQuestions();
//     }, []);
//
//     const handleNextQuestion = () => {
//         if (!answered) return; // No permitir avanzar sin responder
//
//         if (currentIndex < questions.length - 1) {
//             setCurrentIndex((prevIndex) => prevIndex + 1);
//             setQuestion(questions[currentIndex + 1]);
//             setUserAnswers({});
//             setFeedback({});
//             setAnswered(false);
//         }
//     };
//
//     const handlePreviousQuestion = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex((prevIndex) => prevIndex - 1);
//             setQuestion(questions[currentIndex - 1]);
//             setUserAnswers({});
//             setFeedback({});
//             setAnswered(false);
//         }
//     };
//
//     const checkAnswers = () => {
//         if (!question) return;
//
//         const correctAnswers = {
//             a: question.a,
//             b: question.b,
//             c: question.c,
//             d: question.d,
//         };
//
//         let newFeedback: { [key: string]: 'correct' | 'incorrect' | null } = {};
//
//         Object.keys(correctAnswers).forEach((option) => {
//             const isCorrect = correctAnswers[option as keyof typeof correctAnswers];
//             const userSelected = !!userAnswers[option];
//
//             if (userSelected) {
//                 newFeedback[option] = isCorrect ? 'correct' : 'incorrect';
//             } else if (isCorrect) {
//                 newFeedback[option] = 'correct'; // Marcar la correcta si no fue seleccionada
//             } else {
//                 newFeedback[option] = null;
//             }
//         });
//
//         setFeedback(newFeedback);
//         setAnswered(true);
//     };
//
//     return (
//         <div className="flex flex-col items-center justify-center w-full">
//             <Header />
//             <main className="mt-4 w-full flex flex-col items-center justify-center px-2 py-2">
//                 {error && <p className="text-red-500">{error}</p>}
//
//                 {/* Pregunta */}
//                 {question && (
//                     <div className="w-full max-w-lg border p-4 rounded shadow-lg">
//                         <p className="font-medium text-lg">{question.answer}</p>
//
//                         <div className="mt-4 space-y-3">
//                             {["a", "b", "c", "d"].map((option) => {
//                                 const optionText = question[`p${option}` as keyof Question];
//                                 const optionValue = question[`r${option}` as keyof Question];
//
//                                 if (!optionText || !optionValue) return null; // Oculta opciones vacías
//
//                                 return (
//                                     <label
//                                         key={option}
//                                         className={`flex items-center space-x-3 p-3 rounded-md border ${
//                                             feedback[option] === 'correct' ? 'rounded-4xl text-green-500' :
//                                             feedback[option] === 'incorrect' ? 'rounded-4xl text-red-500' : 'bg-gray-900'
//                                         }`}
//                                     >
//                                         <input
//                                             type="checkbox"
//                                             checked={!!userAnswers[option]}
//                                             onChange={() =>
//                                                 setUserAnswers((prev) => ({
//                                                     ...prev,
//                                                     [option]: !prev[option],
//                                                 }))
//                                             }
//                                             //disabled={answered} // Deshabilitar después de responder
//                                             className="w-5 h-5"
//                                         />
//                                         <span className="font-medium text-gray-100">
//                                             {optionText}. {optionValue}
//                                         </span>
//                                     </label>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}
//
//                 {/* Navegación entre preguntas */}
//                 {question && (
//                     <div className="flex justify-between mt-4 w-full max-w-lg absolute bottom-5 sm:items-start">
//                         {/* Botón para pregunta anterior */}
//                         <button
//                             onClick={handlePreviousQuestion}
//                             disabled={currentIndex === 0}
//                             className={`px-4 py-2 rounded w-12 h-12 flex items-center justify-center text-2xl ${
//                                 currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
//                             }`}
//                         >
//                             <FontAwesomeIcon icon={faArrowLeft} className="text-white text-2xl" />
//                         </button>
//
//                         {/* Indicador de Pregunta */}
//                         <span className="text-lg font-bold flex items-center justify-center">
//                             {currentIndex + 1} / {questions.length}
//                         </span>
//
//                         {/* Botón para validar y avanzar */}
//                         <button
//                             onClick={() => {
//                                 if (!answered) {
//                                     checkAnswers();
//                                 } else {
//                                     handleNextQuestion();
//                                 }
//                             }}
//                             className={`px-4 py-2 rounded w-12 h-12 flex items-center justify-center text-2xl ${
//                                 currentIndex >= questions.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
//                             }`}
//                         >
//                             <FontAwesomeIcon icon={faArrowRight} className="text-white text-2xl" />
//                         </button>
//                     </div>
//                 )}
//
//                 {/* Loading spinner */}
//                 {loading && <Loading />}
//             </main>
//         </div>
//     );
// }
//

// 'use client';
//
// import { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
// import Loading from "@/app/components/Loading";
// import Header from "@/app/components/Header";
//
// interface Question {
//     id: number;
//     answer: string;
//     pa: string;
//     pb: string;
//     pc: string;
//     pd: string;
//     ra: string;
//     rb: string;
//     rc: string;
//     rd: string;
//     a: boolean;
//     b: boolean;
//     c: boolean;
//     d: boolean;
//     description: string; // Nueva propiedad para la explicación de la respuesta correcta
// }
//
// // Función para mezclar preguntas aleatoriamente
// const shuffleArray = (array: Question[]) => {
//     return array.sort(() => Math.random() - 0.5);
// };
//
// export default function SpanishPage() {
//     const [question, setQuestion] = useState<Question | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [questions, setQuestions] = useState<Question[]>([]);
//     const [userAnswers, setUserAnswers] = useState<{ [key: string]: boolean }>({});
//     const [feedback, setFeedback] = useState<{ [key: string]: 'correct' | 'incorrect' | null }>({});
//     const [answered, setAnswered] = useState(false);
//     const [modalOpen, setModalOpen] = useState(false); // Estado del modal
//     const [selectedExplanation, setSelectedExplanation] = useState<string | null>(null);
//     const [modalContent, setModalContent] = useState<string>("");
//
//     useEffect(() => {
//         const fetchQuestions = async () => {
//             try {
//                 const response = await fetch('/api/answers-spanish');
//                 let data: Question[] = await response.json();
//                 data = shuffleArray(data);
//                 setQuestions(data);
//                 setQuestion(data[0]);
//             } catch (err) {
//                 setError('No se pudieron cargar las preguntas');
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchQuestions();
//     }, []);
//
//     const handleNextQuestion = () => {
//         if (!answered) return; // No permitir avanzar sin responder
//
//         if (currentIndex < questions.length - 1) {
//             setCurrentIndex((prevIndex) => prevIndex + 1);
//             setQuestion(questions[currentIndex + 1]);
//             setUserAnswers({});
//             setFeedback({});
//             setAnswered(false);
//             setSelectedExplanation(null);
//         }
//     };
//
//     const handlePreviousQuestion = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex((prevIndex) => prevIndex - 1);
//             setQuestion(questions[currentIndex - 1]);
//             setUserAnswers({});
//             setFeedback({});
//             setAnswered(false);
//             setSelectedExplanation(null);
//         }
//     };
//
//     const checkAnswers = () => {
//         if (!question) return;
//
//         const correctAnswers = {
//             a: question.a,
//             b: question.b,
//             c: question.c,
//             d: question.d,
//         };
//
//         let newFeedback: { [key: string]: 'correct' | 'incorrect' | null } = {};
//
//         Object.keys(correctAnswers).forEach((option) => {
//             const isCorrect = correctAnswers[option as keyof typeof correctAnswers];
//             const userSelected = !!userAnswers[option];
//
//             if (userSelected) {
//                 newFeedback[option] = isCorrect ? 'correct' : 'incorrect';
//             } else if (isCorrect) {
//                 newFeedback[option] = 'correct'; // Marcar la correcta si no fue seleccionada
//             } else {
//                 newFeedback[option] = null;
//             }
//         });
//
//         setFeedback(newFeedback);
//         setAnswered(true);
//     };
//
//     return (
//         <div className="flex flex-col items-center justify-center w-full">
//             <Header />
//             <main className="mt-4 w-full flex flex-col items-center justify-center px-2 py-2">
//                 {error && <p className="text-red-500">{error}</p>}
//
//                 {/* Pregunta */}
//                 {question && (
//                     <div className="w-full max-w-lg border p-4 rounded shadow-lg">
//                         <p className="font-medium text-lg">{question.answer}</p>
//
//                         <div className="mt-4 space-y-3">
//                             {["a", "b", "c", "d"].map((option) => {
//                                 const optionText = question[`p${option}` as keyof Question];
//                                 const optionValue = question[`r${option}` as keyof Question];
//
//                                 if (!optionText || !optionValue) return null; // Oculta opciones vacías
//
//                                 return (
//                                     <div key={option} className="flex justify-between items-center">
//                                         <label
//                                             className={`flex items-center space-x-3 p-3 rounded-md border w-full ${
//                                                 feedback[option] === 'correct' ? 'border-green-500 text-green-500' :
//                                                     feedback[option] === 'incorrect' ? 'border-red-500 text-red-500' : 'bg-gray-900'
//                                             }`}
//                                         >
//                                             <input
//                                                 type="checkbox"
//                                                 checked={!!userAnswers[option]}
//                                                 onChange={() =>
//                                                     setUserAnswers((prev) => ({
//                                                         ...prev,
//                                                         [option]: !prev[option],
//                                                     }))
//                                                 }
//                                                 className="w-5 h-5"
//                                             />
//                                             <span className="font-medium text-gray-100">
//                                                 {optionText}. {optionValue}
//                                             </span>
//                                         </label>
//
//                                         {/* Botón de explicación solo para la opción correcta */}
//                                         {feedback[option] === 'correct' && (
//                                             <button
//                                                 onClick={() => {
//                                                     setSelectedExplanation(question.description);
//                                                     setModalOpen(true);
//                                                 }}
//                                                 className="ml-2 p-2 bg-blue-500 text-white rounded-full"
//                                             >
//                                                 <FontAwesomeIcon icon={faInfoCircle} />
//                                             </button>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}
//
//                 {/* Navegación entre preguntas */}
//                 {question && (
//                     <div className="flex justify-between mt-4 w-full max-w-lg">
//                         <button
//                             onClick={handlePreviousQuestion}
//                             disabled={currentIndex === 0}
//                             className={`px-4 py-2 rounded w-12 h-12 flex items-center justify-center text-2xl ${
//                                 currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
//                             }`}
//                         >
//                             <FontAwesomeIcon icon={faArrowLeft} />
//                         </button>
//
//                         <span className="text-lg font-bold flex items-center justify-center">
//                             {currentIndex + 1} / {questions.length}
//                         </span>
//
//                         <button
//                             onClick={() => {
//                                 if (!answered) {
//                                     checkAnswers();
//                                 } else {
//                                     handleNextQuestion();
//                                 }
//                             }}
//                             className="px-4 py-2 rounded w-12 h-12 flex items-center justify-center text-2xl bg-blue-500 text-white"
//                         >
//                             <FontAwesomeIcon icon={faArrowRight} />
//                         </button>
//                     </div>
//                 )}
//
//                 {/* Modal */}
//                 {modalOpen && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                         <div className="bg-white p-6 rounded-lg max-w-2xl w-full text-black">
//                             <h2 className="text-xl font-bold mb-4">Explicación</h2>
//                             <p>{modalContent}</p>
//                             <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setModalOpen(false)}>Cerrar</button>
//                         </div>
//                     </div>
//                 )}
//
//                 {loading && <Loading />}
//             </main>
//         </div>
//     );
// }

'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/app/components/Loading";
import Header from "@/app/components/Header";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

interface Question {
    id: number;
    answer: string;
    description: string; // Nueva propiedad para mostrar en el modal
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

// Función para mezclar preguntas aleatoriamente
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
    const [feedback, setFeedback] = useState<{ [key: string]: 'correct' | 'incorrect' | null }>({});
    const [answered, setAnswered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<string>("");

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
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
    }, []);

    const handleNextQuestion = () => {
        if (!answered) return; // No permitir avanzar sin responder

        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setQuestion(questions[currentIndex + 1]);
            setUserAnswers({});
            setFeedback({});
            setAnswered(false);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
            setQuestion(questions[currentIndex - 1]);
            setUserAnswers({});
            setFeedback({});
            setAnswered(false);
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

        let newFeedback: { [key: string]: 'correct' | 'incorrect' | null } = {};

        Object.keys(correctAnswers).forEach((option) => {
            const isCorrect = correctAnswers[option as keyof typeof correctAnswers];
            const userSelected = !!userAnswers[option];

            if (userSelected) {
                newFeedback[option] = isCorrect ? 'correct' : 'incorrect';
            } else if (isCorrect) {
                newFeedback[option] = 'correct'; // Marcar la correcta si no fue seleccionada
            } else {
                newFeedback[option] = null;
            }
        });

        setFeedback(newFeedback);
        setAnswered(true);
    };

    const openModal = (content: string) => {
        setModalContent(content);
        setModalOpen(true);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Header />
            <main className="mt-4 w-full flex flex-col items-center justify-center px-2 py-2">
                {error && <p className="text-red-500">{error}</p>}

                {/* Pregunta */}
                {question && (
                    <div className="w-full max-w-lg border p-4 rounded shadow-lg bg-gray-800 text-white">
                        <p className="font-medium text-lg whitespace-pre-line">{question.answer}</p>

                        <div className="mt-4 space-y-3">
                            {["a", "b", "c", "d"].map((option) => {
                                const optionText = question[`p${option}` as keyof Question];
                                const optionValue = question[`r${option}` as keyof Question];

                                if (!optionText || !optionValue) return null; // Oculta opciones vacías

                                return (
                                    <label
                                        key={option}
                                        className={`flex items-center justify-between space-x-3 p-3 rounded-md border w-full ${
                                            feedback[option] === 'correct' ? 'border-green-500 text-green-500' :
                                                feedback[option] === 'incorrect' ? 'border-red-500 text-red-500' : 'bg-gray-700'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
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
                                            <span className="font-medium text-white">
                                                {optionText}. {optionValue}
                                            </span>
                                        </div>

                                        {/* Botón para abrir el modal solo en respuestas correctas */}
                                        {feedback[option] === 'correct' && (
                                            <button
                                                onClick={() => openModal(question.description)}
                                                className="ml-2 text-green-500 rounded-full hover:text-white transition"
                                            >
                                                <FontAwesomeIcon icon={faInfoCircle} /> Info.
                                            </button>
                                        )}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Navegación entre preguntas */}
                {question && (
                    <div className="flex justify-between mt-4 w-full max-w-lg absolute bottom-5">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentIndex === 0}
                            className={`px-4 py-2 rounded w-12 h-12 flex items-center justify-center text-2xl ${
                                currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
                            }`}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>

                        <span className="text-lg font-bold">{currentIndex + 1} / {questions.length}</span>

                        <button
                            onClick={answered ? handleNextQuestion : checkAnswers}
                            className="px-4 py-2 rounded w-12 h-12 flex items-center justify-center text-2xl bg-blue-500 text-white"
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                )}

                {/* Loading spinner */}
                {loading && <Loading />}
            </main>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center mx-2">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full text-black">
                        <h2 className="text-xl font-bold mb-4">Explicación: </h2>
                        {/*<ReactMarkdown remarkPlugins={[remarkGfm]}>{modalContent}</ReactMarkdown>*/}
                        {/*<p className="whitespace-pre-line">*/}
                        {/*    /!*{modalContent}*!/*/}
                        {/*    */}
                        {/*</p>*/}
                        <div className="markdown-container">
                            <ReactMarkdown
                                components={{
                                    a: ({ node, ...props }) => (
                                        <a {...props} target="_blank" rel="noopener noreferrer">
                                            {props.children}
                                        </a>
                                    ),
                                }}
                                remarkPlugins={[remarkGfm]}
                            >
                                {modalContent}
                            </ReactMarkdown>
                        </div>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => setModalOpen(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
