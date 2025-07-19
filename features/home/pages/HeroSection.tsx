import Image from "next/image";

import SplitText from "@/components/SplitText";

import { NICKNAME } from "@/constants";
import { EnterButtons } from "@/features/home/components/EnterButtons";
import { Motto } from "@/features/home/components/Motto";
import { SocialMediaList } from "@/features/home/components/SocialMediaList";
import { cn } from "@/lib/utils";

export const HeroSection = () => {

  return (
    <div
      className={
        "relative mx-auto block size-full min-w-0 max-w-[1800px] flex-col flex-wrap items-center lg:flex lg:flex-row"
      }
    >
      <div
        className={
          "center flex w-full flex-col lg:w-[60%] mt-[120px] lg:mt-0 lg:h-1/2 lg:items-start"
        }
      >
        <div className="relative max-w-full lg:max-w-2xl leading-[4] text-center lg:text-left">
          <div>
            <SplitText
              text="Hi, I'm"
              className="text-4xl text-center"
              delay={50}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              rootMargin="-50px"
              easingType={"easeLinear"}
            />
            <SplitText
              text={`${NICKNAME} 👋`}
              className="text-4xl font-semibold text-center "
              delay={40}
              startDelay={400}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              rootMargin="-50px"
              easingType={"easeLinear"}
            />
          </div>
          <div>
            <SplitText
              text={"A Front-End"}
              className="text-4xl text-center "
              delay={40}
              startDelay={800}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              rootMargin="-50px"
              easingType={"easeLinear"}
            />
            <SplitText
              text={"<Developer/>"}
              className="font-medium mx-1 text-3xl rounded bg-gray-200 dark:bg-gray-800/0 hover:dark:bg-gray-800/100 bg-opacity-0 hover:bg-opacity-100 transition-background duration-200"
              delay={40}
              startDelay={1200}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              rootMargin="-50px"
              easingType={"easeLinear"}
            />
          </div>
          <Motto />
          <SocialMediaList />
          <EnterButtons></EnterButtons>
        </div>
      </div>
      <div
        className={
          "center flex w-full flex-col lg:h-auto lg:w-[40%] lg:flex lg:justify-end lg:items-end"
        }
      >
        <div className={"relative max-w-full lg:max-w-2xl"}>
          <div className={"lg:size-[300px] size-[200px] mt-24 lg:mt-0"}>
            <Image
              height={300}
              width={300}
              src={"/uploads/lilming.jpg"}
              alt="Site Owner Avatar"
              className={cn("aspect-square rounded-full ", "w-full")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
