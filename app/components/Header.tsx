"use client"

import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./LogoutButton";

export default function Header() {
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const showMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    useOutsideClick(menuRef, () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    });

    return (
        <header className="px-4">
            <div className="header-content flex justify-between align-center py-2 max-w-7xl mx-auto">
                <Link href={"/"}>
                    <Image src={"/images/logo.jpg"} alt='Logo' width={40} height={40} className='rounded-full' />
                </Link>
                <FaBars id="menu-button" className="sm:hidden cursor-pointer fixed right-3 top-4" onClick={showMenu} />
                {isMenuOpen ? (
                    <div ref={menuRef}>
                        <nav className="dropdown absolute w-50 top-10 right-3 text-center z-50 bg-[var(--background)] border border-[var(--foreground)] rounded-md p-4">
                            <ul className="flex-col">
                                <li className="py-1">
                                    <Link href="/" className={path === "/" ? "active" : ""} onClick={closeMenu}>
                                        Home
                                    </Link>
                                </li>
                                <li className="py-1">
                                    <Link href="/blog" className={path === "/blog" ? "active" : ""} onClick={closeMenu}>
                                        Blog
                                    </Link>
                                </li>
                                <li className="py-1">
                                    <LogoutButton />
                                </li>
                            </ul>
                        </nav>
                    </div>
                ) : (
                    <nav className="visible flex justify-center place-items-center">
                        <ul className="sm:flex hidden gap-2 justify-center mt-12 mb-4 mr-2 sm:mt-1 align-center">
                            <li className="py-1">
                                <Link href="/" className={path === "/" ? "active" : ""}>
                                    Home
                                </Link>
                            </li>
                            <li className="py-1">
                                <Link href="/blog" className={path === "/blog" ? "active" : ""}>
                                    Blog
                                </Link>
                            </li>
                            <li className="py-1">
                                <LogoutButton />
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}