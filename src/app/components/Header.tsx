"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleAccordion = (index: number) => {
        setActiveMenu(activeMenu === index ? null : index);
    };

    return (
        <header className="w-full bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <a href="/" className="text-xl font-bold">Entrenador AZ-900</a>
                </div>

                {/* Botón de menú para móviles */}
                <button onClick={toggleMenu} className="lg:hidden">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Menú */}
                <nav className={`absolute lg:static top-16 left-0 w-full bg-blue-600 lg:flex lg:items-center lg:w-auto transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
                    <ul className="lg:flex">
                        {menuItems.map((item, index) => (
                            <li key={index} className="relative">
                                {item.submenu ? (
                                    <>
                                        <button
                                            onClick={() => toggleAccordion(index)}
                                            className="flex items-center w-full p-3 text-left lg:px-4 hover:bg-blue-700"
                                        >
                                            {item.title}
                                            <ChevronDown size={18} className="ml-2" />
                                        </button>
                                        {/* Submenú */}
                                        {activeMenu === index && (
                                            <ul className="bg-blue-700 lg:absolute lg:top-full lg:left-0 lg:w-48 shadow-md">
                                                {item.submenu.map((subItem, subIndex) => (
                                                    <li key={subIndex} className="p-3 hover:bg-blue-800">
                                                        <Link href={subItem.url}>{subItem.label}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link href={item.url} className="block p-3 lg:px-4 hover:bg-blue-700">
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

// Datos del menú con URLs
const menuItems = [
    { title: "Inicio", url: "/" },
    // { title: "Ingles", url: "/az900-english" },
    { title: "Versiones", submenu: [
            { label: "Ingles", url: "/english" },
            { label: "Spanish", url: "/spanish" },
            // { label: "Desarrollo", url: "/servicios/desarrollo" },
            // { label: "SEO", url: "/servicios/seo" }
        ]
    },
    // { title: "Contacto", url: "/contacto" }
];
