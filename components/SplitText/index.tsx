"use client";


import { useSprings, animated, SpringValue } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import GraphemeSplitter from "grapheme-splitter";
import { easeCubicInOut,easeLinear, easeElastic, easeBackIn, easeBackInOut, easeBounce, easeCubicOut, easeBackOut, easeCubicIn } from 'd3-ease';

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

interface SplitTextProps {
  text?: string;
  className?: string;
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

const SplitText: React.FC<SplitTextProps> = ({
                                               text = "",
                                               className = "",
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
  const splitter = new GraphemeSplitter();
  
  const words = text.split(" ").map((w) => splitter.splitGraphemes(w));  
  const letters = words.flat();
  
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
    letters.length,
    letters.map((_, i) => ({
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
      className={`split-parent ${className}`}
      style={{
        textAlign: textAlign,
        overflow: "hidden",
        display: "inline",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.map((letter, lIdx) => {
            const index =
              words.slice(0, wIdx).reduce((acc, w) => acc + w.length, 0) + lIdx;
            
            return (
              <animated.span
                key={index}
                style={
                  {
                    ...springs[index],
                    display: "inline-block",
                    willChange: "transform, opacity",
                  } as unknown as Record<string, SpringValue | string | number>
                }
              >
                {letter}
              </animated.span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>
            &nbsp;
          </span>
        </span>
      ))}
    </p>
  );
};

export default SplitText;
