'use client'

import React from "react";
import StarBorder from "../reactbits/StarBorder";
import { motion } from "motion/react";

const Info = () => {
  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{duration: 3, ease: "backInOut"}}>
      <StarBorder
        as="span"
        className="text-gray-500 text-sm"
        color="#991ef9"
        speed="3s"
      >
        Authentication and Authorization will be added soon
      </StarBorder>
    </motion.div>
  );
};

export default Info;
