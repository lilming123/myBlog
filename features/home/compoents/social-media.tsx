import {
  IconBrandBilibili,
  IconBrandGithub,
  IconLogoJuejin,
  IconSkillGmailDark,
  IconSkillGmailLight,
} from "@/components/icons";

import { BILIBILI_PAGE, EMAIL, GITHUB_PAGE, JUEJIN_PAGE } from "@/constants";

export interface SplitItem {
  icon: React.ReactNode;
  label: string;
  link: string; 
}

export const socialMediaList: SplitItem[] = [
  {
    icon: <IconBrandGithub />,
    label: "Github",
    link: GITHUB_PAGE,
  },
  {
    icon: (
      <>
        <IconSkillGmailDark className=" dark:hidden" />
        <IconSkillGmailLight className="hidden dark:inline-block" />
      </>
    ),
    label: "Gmail",
    link: `mailto:${EMAIL}`,
  },
  {
    icon: <IconBrandBilibili className={`text-[#00AEEC]`} />,
    label: "Bilibili",
    link: BILIBILI_PAGE,
  },
  {
    icon: <IconLogoJuejin className={`text-[#2985fc]`} />,
    label: "掘金",
    link: JUEJIN_PAGE,
  },
];
