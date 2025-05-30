/* eslint-disable @eslint-react/no-missing-key */
import type { ReactNode } from "react";
import { memo, useMemo } from "react";



import { Icon } from "@iconify/react";



import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



import { MotionButtonBase } from "@/components/button";
import { FloatPopover } from "@/components/float-popover";
import { BilibiliIcon } from "@/components/icons/platform/BilibiliIcon";
import { BlueskyIcon } from "@/components/icons/platform/BlueskyIcon";
import { NeteaseCloudMusicIcon } from "@/components/icons/platform/NeteaseIcon";
import { SteamIcon } from "@/components/icons/platform/SteamIcon";
import { XIcon } from "@/components/icons/platform/XIcon";
import styles from './social-icon.module.css'


import { cn } from "@/lib/utils";
import XiaohongshuIcon from "@/components/icons/platform/XiaohongshuIcon";


interface SocialIconProps {
  type: string;
  id?: string;
  href?: string;
}

const iconSet: Record<
  string,
  [string, ReactNode, string, (id: string) => string]
> = {
  juejin: [
    "掘金",
    <Icon icon="simple-icons:juejin" width={24} height={24} />,
    "#1E80FF",
    (id) => `https://juejin.cn/user/${id}`,
  ],
  github: [
    "Github",
    <Icon icon="mingcute:github-line" width={24} height={24} />,
    "#181717",
    (id) => `https://github.com/${id}`,
  ],
  twitter: [
    "Twitter",
    <Icon icon="mingcute:twitter-line" width={24} height={24} />,
    "#1DA1F2",
    (id) => `https://twitter.com/${id}`,
  ],
  x: [
    "X",
    <XIcon />, // 保留原有自定义组件
    "rgba(36,46,54,1.00)",
    (id) => `https://x.com/${id}`,
  ],
  telegram: [
    "Telegram",
    <Icon icon="mingcute:telegram-line" width={24} height={24} />,
    "#0088cc",
    (id) => `https://t.me/${id}`,
  ],
  mail: [
    "Email",
    <Icon icon="mingcute:mail-line" width={24} height={24} />,
    "#D44638",
    (id) => `mailto:${id}`,
  ],
  rss: [
    "RSS",
    <Icon icon="mingcute:rss-line" width={24} height={24} />,
    "#FFA500",
    (id) => id,
  ],
  bilibili: [
    "哔哩哔哩",
    <BilibiliIcon />, // 保留原有自定义组件
    "rgb(0, 161, 214)",
    (id) => `https://space.bilibili.com/${id}`,
  ],
  netease: [
    "网易云音乐",
    <NeteaseCloudMusicIcon />, // 保留原有自定义组件
    "#C20C0C",
    (id) => `https://music.163.com/#/user/home?id=${id}`,
  ],
  qq: [
    "QQ",
    <Icon icon="mingcute:qq-fill" width={24} height={24} />,
    "#1e6fff",
    (id) => `https://wpa.qq.com/msgrd?v=3&uin=${id}&site=qq&menu=yes`,
  ],
  wechat: [
    "微信",
    <Icon icon="mingcute:wechat-fill" width={24} height={24} />,
    "#2DC100",
    (id) => id,
  ],
  weibo: [
    "微博",
    <Icon icon="mingcute:weibo-line" width={24} height={24} />,
    "#E6162D",
    (id) => `https://weibo.com/${id}`,
  ],
  discord: [
    "Discord",
    <Icon icon="mingcute:discord-fill" width={24} height={24} />,
    "#7289DA",
    (id) => `https://discord.gg/${id}`,
  ],
  bluesky: [
    "Bluesky",
    <BlueskyIcon />, // 保留原有自定义组件
    "#0085FF",
    (id) => `https://bsky.app/profile/${id}`,
  ],
  steam: [
    "Steam",
    <SteamIcon />, // 保留原有自定义组件
    "#0F1C30",
    (id) => `https://steamcommunity.com/id/${id}`,
  ],
  xiaohongshu: [
    "小红书",
    <XiaohongshuIcon />, // 保留原有自定义组件
    "#ff2842",
 (id) => `https://www.xiaohongshu.com/user/profile/${id}`,   
  ],

  // 保持 getter 语法
  get email() {
    return this.mail!;
  },
  get feed() {
    return this.rss!;
  },
};
const icons = Object.keys(iconSet);

export const isSupportIcon = (icon: string) => icons.includes(icon);
export const SocialIcon = memo((props: SocialIconProps) => {
  const { id, type, href } = props;

  const [name, Icon, iconBg, hrefFn] = useMemo(() => {
    const [name, Icon, iconBg, hrefFn] = (iconSet as any)[type as any] || [];
    return [name, Icon, iconBg, hrefFn];
  }, [type]);
  console.log(name);

  if (!name) return null;

  return (
    <TooltipProvider delayDuration={100}> {/* 或 0 */}
      <Tooltip>
      <TooltipTrigger asChild={true}>
        <MotionButtonBase
          className={`center flex aspect-square size-10 rounded-full text-2xl text-white transition-transform duration-300 ${styles.social_icon}`}
          style={{
            background: iconBg,
          }}
        >
          <a
            target="_blank"
            href={href ?? hrefFn(id)}
            className="center flex"
            rel="noreferrer"
          >
            {Icon}
          </a>
        </MotionButtonBase>
      </TooltipTrigger>
      <TooltipContent side="bottom"
                      align="center"
                      className={cn(
                        "z-50 overflow-hidden rounded-md px-3 py-2 mt-1.5 text-sm",
                        "bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.08)]", // 白天模式：白底黑字阴影
                        "dark:shadow-none dark:bg-black dark:border  dark:text-white dark:border-white/20", // 暗黑模式：黑底白字白边
                        "animate-in fade-in-0 zoom-in-95",
                        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                        "data-[side=bottom]:slide-in-from-button-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      )}>{name}</TooltipContent>
    </Tooltip>
    </TooltipProvider>

    // <FloatPopover
    //   type="tooltip"
    //   triggerElement={
    //     <MotionButtonBase
    //       className="center flex aspect-square size-10 rounded-full text-2xl text-white"
    //       style={{
    //         background: iconBg,
    //         transform: 'none'
    //       }}
    //     >
    //       <a
    //         target="_blank"
    //         href={href ?? hrefFn(id)}
    //         className="center flex"
    //         rel="noreferrer"
    //       >
    //         {Icon}
    //       </a>
    //     </MotionButtonBase>
    //   }
    // >
    //   {name}
    // </FloatPopover>
  );
});
SocialIcon.displayName = "SocialIcon";
