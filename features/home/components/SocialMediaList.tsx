'use client'

import { SOCIAL_MEDIA_MAP } from "@/constants";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {SocialIcon} from "@/features/home/components/SocialIcon";

export const SocialMediaList = () => {
  // 使用状态控制动画准备就绪
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // 确保在客户端 hydration 完成后才触发动画
    setIsReady(true);
  }, []);
  
  return (
    <ul className="center mx-[60px] mt-4 flex flex-wrap gap-6 lg:mx-auto lg:mt-14 lg:justify-start lg:gap-4">
      {Object.entries(SOCIAL_MEDIA_MAP).map(([type, href], index) => {
        if (!href) return null;
        
        return (
          <motion.li
            key={type}
            initial={{ y: 50, opacity: 0 }}
            animate={isReady ? {
              y: 0,
              opacity: 1,
              transition: {
                delay: index * 0.1 + 1.8, // 更直观的时间单位（秒）
                type: "spring",
                stiffness: 120,
                damping: 12
              }
            } : undefined}
            className="inline-block"
          >
            <SocialIcon href={href} type={type} />
          </motion.li>
        );
      })}
    </ul>
  );
};