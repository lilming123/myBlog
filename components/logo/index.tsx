import * as React from "react";

import { ImageAssets, WEBSITE } from "@/constants";
import { cn } from "@/lib/utils";
interface Props {
  className?: string;
}
import './index.css'

export const Logo = ({ className }: Props) => {
  return (
    <div className="mask mask-squircle overflow-hidden">
      <img
        src={ImageAssets.logoLight}
        className={cn("w-8 h-8 hidden dark:block", className)}
        alt={WEBSITE}
      />{" "}
      <img
        src={ImageAssets.logoDark}
        className={cn("w-8 h-8 dark:hidden", className)}
        alt={WEBSITE}
      />
    </div>
  );
};
