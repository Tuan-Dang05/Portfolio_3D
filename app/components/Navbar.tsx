"use client";
// import { navLinks } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ResumeButton from "./ResumeButton";
import UK from "../../public/translate/united-kingdom.png";
import VN from "../../public/translate/vietnam.png";
import "../i18n.js";

const Navbar = () => {
	const [active, setActive] = useState("");
	const [toggle, setToggle] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
	const [currentLanguage, setCurrentLanguage] = useState("vi");
	const { t, i18n } = useTranslation();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 100);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		// Chỉ chạy trên phía client
		if (typeof window !== "undefined") {
			const savedLanguage = localStorage.getItem("i18nextLng") || "vi";
			setCurrentLanguage(savedLanguage);
		}
	}, []);

	const toggleLanguageDropdown = () => {
		setLanguageDropdownOpen((prev) => !prev);
	};



	const changeLanguage = (lang: 'en' | 'vi') => {
		i18n.changeLanguage(lang);
		setCurrentLanguage(lang);
		if (typeof window !== "undefined") {
			localStorage.setItem("i18nextLng", lang); // Lưu lựa chọn ngôn ngữ
		}
		setLanguageDropdownOpen(false);
	};
	return (
		<nav
			className={`paddingX w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary" : "bg-transparent"
				}`}
		>
			<div className="w-full flex justify-between items-center max-w-7xl mx-auto">
				{/* Logo */}
				<div
					className="flex items-center gap-2 cursor-pointer"
					onClick={() => {
						setActive("");
						window.scrollTo(0, 0);
					}}
				>
					<Link href="https://github.com/Tuan-Dang05">
						<Image
							src="/logo.png"
							width={80}
							height={80}
							alt="logo"
							priority
							className="object-contain"
						/>
					</Link>
					<p className="text-white text-[18px] font-bold flex">
						Anh Tuan &nbsp;
						<span className="sm:block hidden">| Tunzankies</span>
					</p>
				</div>

				{/* Navigation Links */}
				<ul className="list-none hidden sm:flex flex-row gap-10">
					{(t("navigation", { returnObjects: true }) as any[]).map((nav: any) => (
						<li
							key={nav.id}
							className={`${active === nav.title ? "text-white" : "text-secondary"
								} hover:text-white text-[18px] font-medium cursor-pointer`}
							onClick={() => setActive(nav.title)}
						>
							<Link href={`#${nav.id}`}>{nav.title}</Link>
						</li>
					))}
				</ul>
				{/* Resume Button and Language Dropdown */}
				<div className="hidden sm:flex items-center gap-4">
					{/* Resume Dropdown */}
					<div className="relative">

						<div className="mt-2">
							<ResumeButton />
						</div>
					</div>

					{/* Language Dropdown */}
					<div className="relative">
						<button
							onClick={toggleLanguageDropdown}
							className="flex items-center px-3 py-2 text-sm font-semibold bg-transparent rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
						>
							<Image
								src={currentLanguage === "vi" ? VN : UK}
								alt="Language flag"
								className="w-5 h-5 mr-2"
							/>
							{currentLanguage.toUpperCase()}
						</button>
						{languageDropdownOpen && (
							<div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border rounded-md shadow-lg">
								<button
									onClick={() => changeLanguage("vi")}
									className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
								>
									Tiếng Việt
								</button>
								<button
									onClick={() => changeLanguage("en")}
									className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
								>
									English
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Mobile Menu */}
				<div className="sm:hidden flex flex-1 justify-end items-center">
					<Image
						src={toggle ? "/close.svg" : "/menu.svg"}
						width={28}
						height={28}
						alt="menu"
						className="w-[28px] h-[28px] object-contain"
						onClick={() => setToggle((prev) => !prev)}
					/>

					<div
						className={`${!toggle ? "hidden" : "flex"
							} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
					>
						<ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
							{(t("navigation", { returnObjects: true }) as any[]).map((nav: any) => (
								<li
									key={nav.id}
									className={`${active === nav.title ? "text-white" : "text-secondary"
										} hover:text-white text-[18px] font-medium cursor-pointer`}
									onClick={() => setActive(nav.title)}
								>
									<Link href={`#${nav.id}`}>{nav.title}</Link>
								</li>
							))}
							{/* Resume Button */}
							<li>
								<div className="mt-2">
									<ResumeButton />
								</div>
							</li>

							{/* Language Dropdown */}
							<li>
								<div className="relative">
									<button
										onClick={toggleLanguageDropdown}
										className="flex items-center px-3 py-2 text-sm font-semibold bg-transparent rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
									>
										<Image
											src={currentLanguage === "vi" ? VN : UK}
											alt="Language flag"
											className="w-5 h-5 mr-2"
										/>
										{currentLanguage.toUpperCase()}
									</button>
									{languageDropdownOpen && (
										<div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border rounded-md shadow-lg">
											<button
												onClick={() => changeLanguage("vi")}
												className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
											>
												Tiếng Việt
											</button>
											<button
												onClick={() => changeLanguage("en")}
												className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
											>
												English
											</button>
										</div>
									)}
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
