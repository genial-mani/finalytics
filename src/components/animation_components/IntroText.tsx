"use client";

import GradientText from "../reactbits/gradienttext";
import { motion } from "motion/react";
import Image from "next/image";
import BlurText from "../reactbits/BlurText";

const IntroText = () => {
  return (
    <motion.div
      className="w-full max-w-[1000px] flex flex-col justify-center items-center pt-16 sm:pt-20 gap-2"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "backInOut" }}
    >
      <div className="flex flex-wrap items-center gap-2 text-gray-400">
        <BlurText
          text="Precision Meets"
          delay={300}
          stepDuration={0.5}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-5xl mx-auto"
        />
        <GradientText
          animationSpeed={3}
          showBorder={false}
          className="text-center custom-class text-3xl sm:text-5xl"
        >
          Intelligence
        </GradientText>
      </div>
      <h2 className="sm:text-3xl flex sm:gap-2 items-center mx-auto flex-wrap justify-center">
        <BlurText
          text="Redefining the Future of Smarter Finance"
          delay={150}
          animateBy="words"
          direction="top"
          className="sm:text-3xl text-gray-500 text-center"
        />{" "}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotateY: 720 }}
          transition={{ delay: 0.5, duration: 2, ease: "backInOut" }}
          className="flex items-center justify-center text-center"
        >
          <Image
            alt="coin-1"
            src={"/3dicons-dollar-front-premium.png"}
            width={50}
            height={50}
            draggable={false}
          />
        </motion.div>
      </h2>
    </motion.div>
  );
};

export default IntroText;
