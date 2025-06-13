'use client'
import { motion } from 'framer-motion';

import {useEffect, useState} from "react";
import Link from "next/link";
import {ShinyButton} from "@/components/ShinyButton";

export const EnterButtons = () => {
  // 使用状态控制动画准备就绪
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // 确保在客户端 hydration 完成后才触发动画
    setIsReady(true);
  }, []); 
  
  return (
    <motion.div
      initial={{y: 50, opacity: 0}}
      animate={isReady ? {
        y: 0,
        opacity: 1,
        transition: {
          delay: 1.8, // 更直观的时间单位（秒）
          type: "spring",
          stiffness: 120,
          damping: 12
        }
      } : undefined}
      className="inline-block "
    >
      <div
        className={
          "mt-8 gap-4 flex flex-wrap justify-center lg:justify-start"
        }
      >
        <Link href="/blog">
          <ShinyButton
            text="进入博客"
            disabled={false}
            speed={3}
          ></ShinyButton>
        </Link>
        <Link href={"/about"}>
          <ShinyButton
            text="关于我"
            disabled={false}
            speed={3}
          ></ShinyButton>
        </Link>
      </div>
    </motion.div>
)
}