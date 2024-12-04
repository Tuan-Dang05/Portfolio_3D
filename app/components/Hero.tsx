"use client";
import { motion } from "framer-motion";
import React from "react";
import { ComputersCanvas } from "./canvas";
import { useTranslation } from "react-i18next";

const Hero = () => {
	const { t } = useTranslation();

	// Text animation variants for left-to-right reveal
	const textVariants = {
		hidden: {
			opacity: 0,
			x: -50, // Start from the left side
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 10,
				staggerChildren: 0.1, // Slight stagger between characters
			},
		},
	};

	const letterVariants = {
		hidden: {
			opacity: 0,
			x: -10, // Each letter starts further left
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 15,
			},
		},
	};

	return (
		<section className="relative w-full h-screen mx-auto">
			<div className="paddingX absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5">
				<div className="flex flex-col justify-center items-center mt-5">
					<div className="w-5 h-5 rounded-full bg-[#915EFF]" />
					<div className="w-1 sm:h-80 h-40 violet-gradient" />
				</div>
				<div>
					<motion.h1
						className="heroHeadText text-white"
						variants={textVariants}
						initial="hidden"
						animate="visible"
					>
						{/* Animate text from left to right */}
						{t("hero.greeting")
							.split("")
							.map((char, index) => (
								<motion.span
									key={`${char}-${index}`}
									variants={letterVariants}
									style={{
										display: "inline-block",
										marginRight: char === " " ? "0.3em" : "0",
										willChange: "transform, opacity", // Optimize animation performance
										fontSize: '50px'
									}}
								>
									{char === " " ? "\u00A0" : char}
								</motion.span>
							))}
					</motion.h1>
					<motion.p
						className="heroSubText"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							delay: 0.8,
							type: "spring",
							stiffness: 100,
							damping: 10,
						}}
					>
						{t("hero.description")}
					</motion.p>
				</div>
			</div>
			<ComputersCanvas />
			<div className="absolute xs:bottom-2 bottom-32 w-full flex justify-center items-center">
				<a href="#about">
					<div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
						<motion.div
							animate={{ y: [0, 24, 0] }}
							transition={{
								duration: 1.5,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "loop",
							}}
							className="w-3 h-3 rounded-full bg-secondary mb-1"
						/>
					</div>
				</a>
			</div>
		</section>
	);
};

export default Hero;
