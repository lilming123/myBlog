'use client'

import { SOCIAL_MEDIA_MAP } from "@/constants";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {SocialIcon} from "@/features/home/components/SocialIcon";

export const Motto = () => {
  // 使用状态控制动画准备就绪
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // 确保在客户端 hydration 完成后才触发动画
    setIsReady(true);
  }, []);
  
  return (
    <div className="text-xl text-stone-600 dark:text-stone-300 nAtext-center ">
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={isReady ? {
              y: 0,
              opacity: 1,
              transition: {
                delay:  1.8, // 更直观的时间单位（秒）
                type: "spring",
                stiffness: 120,
                damping: 12
              }
            } : undefined}
            className="inline-block"
          >
            “🚀You can call me lilming. A software engineer. A lifelong learner. A dreamer.”
          </motion.p>
    </div>
  );
};