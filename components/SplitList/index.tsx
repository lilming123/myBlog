"use client";

import { useEffect, useRef, useState } from "react";



import { SpringValue, animated, useSprings } from "@react-spring/web";
import {
  easeBackIn,
  easeBackInOut,
  easeBackOut,
  easeBounce,
  easeCubicIn,
  easeCubicInOut,
  easeCubicOut,
  easeElastic,
  easeLinear,
} from "d3-ease";



import { SplitItem } from "@/features/home/components";


// 通过 as const 获取精确的键名类型
const easingMap = {
  easeCubicInOut,
  easeLinear,
  easeElastic,
  easeBackIn,
  easeBackInOut,
  easeBounce,
  easeCubicOut,
  easeBackOut,
  easeCubicIn,
} as const;
// 自动生成联合类型（无需手动维护）
type EasingType = keyof typeof easingMap;

interface SplitListProps {
  list: SplitItem[];
  parentClassName?: string;
  itemClassName?: string;
  padding?: string;
  delay?: number;
  startDelay?: number; // 新增参数
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  easingType?: EasingType;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
  onLetterAnimationComplete?: () => void;
}

const SplitList: React.FC<SplitListProps> = ({
                                               list = [],
                                               parentClassName = "",
                                               itemClassName="",
                  padding='0px',
                                               delay = 100,
                                               startDelay = 0, // 默认值设为0
                                               animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
                                               animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
                                               easingType = 'easeCubicInOut',
                                               duration = undefined, 
                                               threshold = 0.1,
                                               rootMargin = "-100px",
                                               textAlign = "center",
                                               onLetterAnimationComplete,
                                             }) => {
  const easing = easingMap[easingType] || easeCubicInOut;
  
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 新增定时器ref
  
  
  useEffect(() => {
    if (!ref.current) return;
    
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 使用startDelay延迟触发动画
          timerRef.current = setTimeout(() => {
            setInView(true);
            obs.unobserve(ref.current as Element);
          }, startDelay);
        }
      },
      { threshold, rootMargin }
    );
    
    obs.observe(ref.current);
    return () => {
      obs.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current); // 清除定时器
    };}, [threshold, rootMargin, startDelay]);
  
  const springs = useSprings(
    list.length,
    list.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (
          next: (step: Record<string, string | number>) => Promise<void>
        ) => {
          await next(animationTo);
          animatedCount.current += 1;
          if (
            animatedCount.current === letters.length &&
            onLetterAnimationComplete
          ) {
            onLetterAnimationComplete();
          }
        }
        : animationFrom,
      delay: i * delay,
      config: {
        duration,
        easing 
      }
    }))
  );
  
  return (
    <p
      ref={ref}
      className={`split-parent ${parentClassName}`}
      style={{
        textAlign: textAlign,
        overflow: "hidden",
        display: "inline",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
        <span
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {list.map((item, index) => {
            const isLast = index === list.length - 1;
            return (
              <animated.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={
                  {
                    ...springs[index],
                    display: "inline-block",
                    willChange: "transform, opacity",
                    marginRight: isLast ? 0 : padding,
                  } as unknown as Record<string, SpringValue | string | number>
                }
                className={itemClassName}
              >
                {item.icon}
              </animated.a>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>
            &nbsp;
          </span>
        </span>
    </p>
  );
};

export default SplitList;
