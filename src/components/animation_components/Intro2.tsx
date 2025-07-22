"use client";

import { motion } from "motion/react";
import React from "react";
import BlurText from "../reactbits/BlurText";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

const Intro2 = () => {
  return (
    <motion.div className="w-full max-w-[1000px] flex flex-col justify-center items-center pt-10 sm:pt-20 gap-2">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "backInOut" }}
        className=" text-center sm:text-xl text-gray-500"
      >
        Take Full Control of Your Finances.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: "backInOut" }}
        className=" text-center sm:text-xl text-gray-500"
      >
        Visual dashboards turn your transactions into clear, actionable
        insights.
      </motion.p>

      <div className="w-full max-w-full h-fit my-2 sm:my-5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 3, ease: "easeInOut" }}
        >
          <Image
            alt="dashboard-overview"
            src={"/dashboard-overview.png"}
            width={800}
            height={500}
            className="mx-auto rounded-lg"
            draggable={false}
          />
        </motion.div>
      </div>

      <div className="w-full max-w-full sm:pt-5 flex flex-col gap-2 mt-10">
        <h2 className="flex items-center justify-center text-center text-3xl sm:text-5xl text-gray-400">
          {"Meet Our FinAI"}
          <Icon
            icon="humbleicons:ai"
            width="3rem"
            height="3rem"
            style={{ color: "#991ef9" }}
          />
        </h2>
        <h2 className="text-center flex items-center justify-center text-xl text-gray-500 ">
          Your Personal AI Financial Advisor
        </h2>
        <div className="w-fit mx-auto">
          <Image alt="fin-ai" src={"/panda-ai.png"} width={200} height={200} draggable={false}/>
        </div>
      </div>
      <div className="flex space-x-1 text-gray-400 items-center justify-center">
        <BlurText
          text="No More Headaches."
          delay={300}
          stepDuration={0.5}
          animateBy="words"
          direction="top"
          className="text-3xl text-center sm:text-5xl flex items-center justify-center max-[380px]:text-xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1, ease: "linear" }}
        >
          <Image
            alt="finance-headache"
            src={"/headache-panda.png"}
            width={60}
            height={60}
            draggable={false}
          />
        </motion.div>
      </div>
      <h2 className="text-xl text-center sm:text-3xl flex gap-2 items-center justify-center">
        <BlurText
          text="Understand Your Finances Like Never Before."
          delay={150}
          animateBy="words"
          direction="top"
          className="flex items-center justify-center text-center text-xl sm:text-3xl text-gray-500 mx-auto"
        />{" "}
      </h2>
      <br color="white" className="h-1" />
      <div className="mt-10 sm:mt-20 mb-5 flex flex-col justify-center items-center">
        <h2 className="text-center text-gray-400 sm:text-4xl text-xl">
          FinAI Wishes You A Better Financial Year Ahead
        </h2>
        <div className="w-fit mx-auto">
          <Image
            alt={"finai-with-icon"}
            src={"/panda-with-icon.png"}
            width={150}
            height={300}
            draggable={false}
          />
        </div>
        <h2 className="flex items-center justify-center gap-2 text-gray-500">
          {"Happy Finance"}{" "}
          <motion.span
            animate={{scale: [1, 1.5, 1]}}
            transition={{duration: 1.5, ease: "linear", repeat: Infinity, repeatType: "reverse"}}
            
          >
            <Icon
              icon="fluent-emoji:purple-heart"
              width="1.2em"
              height="1.2em"
            />
          </motion.span>
        </h2>
      </div>
    </motion.div>
  );
};

export default Intro2;
