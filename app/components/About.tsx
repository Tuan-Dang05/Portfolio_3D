"use client";

import { SectionWrapper } from "./HigherOrderComponents";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { services } from "../constants";
import { fadeIn, textVariant } from "@/app/utils/motion";
import { useTranslation } from "react-i18next";

type ServiceCardProps = {
	index: number;
	title: string;
	icon: string;
};

const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
	const { t } = useTranslation();
	return (
		<Tilt
			options={{ max: 45, scale: 1, speed: 450 }}
			className="xs:w-[250px] w-full"
		>
			<motion.div
				variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
				className="w-full green-pink-gradient p-px rounded-[20px] shadow-card"
			>
				<div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
					<Image
						src={icon}
						width={64}
						height={64}
						alt={title}
						className="w-16 h-16 object-contain"
					/>
					<h3 className="text-white text-[20px] font-bold text-center">
						{title}
					</h3>
				</div>
			</motion.div>
		</Tilt>
	);
};

const About = () => {
	const { t } = useTranslation();

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className="sectionSubText">{t("about.introduction")}</p>
				<h2 className="styles.sectionHeadText">{t("about.overviewTitle")}</h2>
			</motion.div>

			<motion.p
				variants={fadeIn("", "", 0.1, 1)}
				className="mt-4 text-secondary text-[17px] max-w-[3xl] leading-[30px]"
			>
				{t("about.description")}
			</motion.p>
			<div className="mt-20 flex flex-wrap gap-10">
				{services.map((service, index) => (
					<ServiceCard key={service.title} index={index} {...service} />
				))}
			</div>
		</>
	);
};

export default SectionWrapper(About, "about");
