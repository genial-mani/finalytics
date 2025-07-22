"use client";

import React, { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Icon } from "@iconify/react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
const FinAi = () => {
  const [questions, setQuestions] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const generateText = async () => {
    setOutput("");
    try {
      setLoading(true);
      const response = await fetch("/api/geminiai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt.trim() }),
      });

      const data = await response.json();
      console.log(data);
      setPrompt("");
      if (response.ok && data.output) {
        const cleaned = data.output.trim().replace(/^"|"$/g, "");
        setLoading(false);
        typeWriter(cleaned);
      } else {
        setLoading(false);
        setOutput(data.error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setPrompt("");
      setOutput("Something went wrong.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);
  };

  const typeWriter = (text: string) => {
    let index = 0;
    let current = "";

    setOutput("");

    const type = () => {
      if (index < text.length) {
        current += text[index];
        setOutput(current);
        index++;
        setTimeout(type, 20);
      }
    };

    type();
  };

  return (
    <div className="fixed bottom-5 right-5">
      <Dialog>
        <DialogTrigger className="cursor-pointer">
          <div className="rounded-full flex items-center justify-center size-12 bg-[#18181b]">
            <Icon
              icon="humbleicons:ai"
              width="2rem"
              height="2rem"
              style={{ color: "#991ef9" }}
            />
          </div>
        </DialogTrigger>
        <DialogContent
          className="custom-scroll overflow-y-scroll h-2/3 overflow-x-hidden text-slate-500 border-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139, 92, 246, 0.25), transparent 70%), #000000",
          }}
        >
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="w-full max-w-full flex flex-col gap-2">
            {output ? (
              <ReactMarkdown>{output}</ReactMarkdown>
            ) : loading === false ? (
              <div className="w-full h-fit max-w-full flex flex-row items-center justify-center">
                <h2 className="text-6xl flex items-baseline justify-center pt-10">
                Ask{" "}
                <Icon
                  icon="humbleicons:ai"
                  width="4rem"
                  height="4rem"
                  style={{ color: "#990ef9", marginLeft: "15px" }}
                />
                FinAI
              </h2>
                <Image alt={"panda-standing"} className="drop-shadow-[0_0_0_white]" src={'/panada-coding.png'} width={150} height={150} draggable={false}/>
              </div>
              
            ) : (
              <div className="w-full max-w-full flex items-baseline justify-center">
                <Image
                  alt="panda-thinking"
                  src={"/panda-thinking.png"}
                  width={200}
                  height={400}
                  draggable={false}
                />
                <div className="loader3 relative">
                  <div className="circle1 absolute -left-14 -bottom-0"></div>
                  <div className="circle1 absolute -bottom-0 -left-6"></div>
                  <div className="circle1 absolute -bottom-0 left-2"></div>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3 relative">
              <Image
                alt="panda-onwall"
                src={"/panda-seeing-left.png"}
                width={80}
                height={80}
                draggable={false}
                className="absolute right-3 bottom-[35px] transform-3d -rotate-z-8 cursor-default"
              />
              <Textarea
                placeholder="Fin is waiting for your question at the bottom right corner."
                className="resize-none w-full max-w-full min-h-32 mt-5 border-2"
                value={prompt}
                onChange={handleChange}
                autoFocus={true}
              />
              <Button
                onClick={generateText}
                className="bg-[#970ef9d0] text-slate-300 hover:bg-[#990ef9] cursor-pointer"
                disabled={prompt.trim() === ""}
              >
                <Icon
                  icon="humbleicons:ai"
                  width="2rem"
                  height="2rem"
                  style={{ color: "#cad5e2" }}
                />
                Ask
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinAi;
