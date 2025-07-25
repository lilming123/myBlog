import {
  IconSkillCSS,
  IconSkillHTML,
  IconSkillJavaScript,
  IconSkillMysqlDark,
  IconSkillMysqlLight,
  IconSkillNextjsDark,
  IconSkillNextjsLight,
  IconSkillPrisma,
  IconSkillReactDark,
  IconSkillReactLight,
  IconSkillTailwindcssDark,
  IconSkillTailwindcssLight,
  IconSkillTypeScript,
} from "@/components/icons";

import {NICKNAME, SOCIAL_MEDIA_MAP} from "@/constants";
import {SocialIcon} from "@/features/home/components/SocialIcon";

export const revalidate = 60;

export default function Page() {
  let delay = 0;

  // 每次调用，增加延时
  const getDelay = () => (delay += 200);

  return (
    <div className="flex w-full flex-col justify-center px-6 pb-24 pt-8">
      <section className="w-screen-wrapper prose prose-neutral mx-auto max-w-screen-wrapper dark:prose-invert">
        <h2 className="text-3xl font-bold md:text-4xl">关于</h2>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>我是谁</h2>
          <p>
            Hi~ 我是一名前端开发工程师，你可以叫我{NICKNAME}
          </p>
          <p>
            25届杭电，先后在字节和小米实习，目前在携程工作，喜欢 Coding 、hiphop、打游戏（炉石传说和绝区零）
          </p>
        </div>
        
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>我的技能</h2>
        </div>

        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>前端</h3>
          <ul>
            <li>
              熟练掌握
              <IconSkillHTML className="mx-1 translate-y-0.5"/> HTML +
              <IconSkillCSS className="mx-1 translate-y-0.5"/>CSS +
              <IconSkillJavaScript className="mx-1 translate-y-0.5"/>JavaScript +
              <IconSkillTypeScript className="mx-1 translate-y-0.5"/>TypeScript
              +
              <>
                <IconSkillTailwindcssDark className="mx-1 translate-y-0.5 dark:hidden"/>
                <IconSkillTailwindcssLight className="mx-1 hidden translate-y-0.5 dark:inline-block"/>
              </>
              Tailwind CSS
            </li>
            <li>
              熟练使用
              <>
                <IconSkillReactDark className="mx-1 translate-y-0.5 dark:hidden"/>
                <IconSkillReactLight className="mx-1 hidden translate-y-0.5 dark:inline-block"/>
              </>
              React &
              <>
                <IconSkillNextjsDark className="mx-1 translate-y-0.5 dark:hidden"/>
                <IconSkillNextjsLight className="mx-1 hidden translate-y-0.5 dark:inline-block"/>
              </>
              Next.js ，并深入理解 <>
              <IconSkillReactDark className="mx-1 translate-y-0.5 dark:hidden"/>
              <IconSkillReactLight className="mx-1 hidden translate-y-0.5 dark:inline-block"/>
            </> React 核心原理            
            </li>
            <li>
              具备 Vue 基础开发能力，可快速上手项目开发
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>后端</h3>
          <ul>
            <li>
              熟悉 Java (Spring Boot) 和 Golang 基础开发，能独立完成 CRUD 业务
            </li>
            <li>
              熟练使用
              <>
                <IconSkillNextjsDark className="mx-1 translate-y-0.5 dark:hidden"/>
                <IconSkillNextjsLight className="mx-1 hidden translate-y-0.5 dark:inline-block"/>
              </>
              Next.js + <IconSkillPrisma className="mx-1 translate-y-0.5" />
              Prisma +
              <>
                <IconSkillMysqlDark className="mx-1 translate-y-0.5 dark:hidden" />
                <IconSkillMysqlLight className="mx-1 hidden translate-y-0.5 dark:inline-block" />
              </>
              MySQL 进行全栈应用开发。
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>太懒了，这几天都在旅游，后面想到什么再补充吧</h3>
        </div>
        

        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>联系我</h2>
          <p>你可以通过👇下面任意一种方式联系我</p>
          <ul className="!mb-0 flex !list-none items-center gap-x-4 !pl-0 flex-wrap	">
            {
              Object.entries(SOCIAL_MEDIA_MAP).map(([type, href], index)=>{
                if (!href) return null;
                return (
                  <li key={index}>
                    <SocialIcon type={type} href={href} />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </section>
    </div>
  );
}
