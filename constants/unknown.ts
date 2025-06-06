import { TagTypeEnum } from "@prisma/client";

/** 空数据文案 */
export const PLACEHOLDER_TEXT = "N/A";

export const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",");

export const TAG_TYPES = [
  TagTypeEnum.ALL,
  TagTypeEnum.BLOG,
  TagTypeEnum.NOTE,
  TagTypeEnum.SNIPPET,
];

export const TAG_TYPE_MAP = {
  [TagTypeEnum.ALL]: "通用",
  [TagTypeEnum.BLOG]: "博客",
  [TagTypeEnum.NOTE]: "笔记",
  [TagTypeEnum.SNIPPET]: "碎碎念",
};

export enum PUBLISHED_ENUM {
  ALL = "all",
  PUBLISHED = "published",
  NO_PUBLISHED = "no_published",
}

export const PUBLISHED_LABEL_MAP = {
  [PUBLISHED_ENUM.ALL]: "全部",
  [PUBLISHED_ENUM.PUBLISHED]: "已发布",
  [PUBLISHED_ENUM.NO_PUBLISHED]: "未发布",
};

export const PUBLISHED_MAP = {
  [PUBLISHED_ENUM.ALL]: undefined,
  [PUBLISHED_ENUM.PUBLISHED]: true,
  [PUBLISHED_ENUM.NO_PUBLISHED]: false,
};

interface NavItem {
  link: string;
  label: string;
}

export const navItems: NavItem[] = [
  { label: "首页", link: "/" },
  { label: "博客", link: "/blog" },
  { label: "碎碎念", link: "/snippet" },
  { label: "关于我", link: "/about" },
];
