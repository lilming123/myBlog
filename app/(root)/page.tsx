import { IntroScrollMouse } from "@/components/intro-scroll-mouse";

import { HeroSection } from "@/features/home";

export const revalidate = 60;

export default function Page() {
  return (
    <div className="mx-auto mt-20 min-w-0 max-w-7xl lg:mt-[-4.5rem] lg:h-dvh lg:min-h-[800px] 2xl:px-28 xl:px-20  lg:px-0">
      <HeroSection />
      {/*<div className="absolute inset-x-0 bottom-8 grid place-content-center md:bottom-12">*/}
      {/*  <IntroScrollMouse />*/}
      {/*</div>*/}
    </div>
  );
}
