import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="fill-content relative z-[1] px-4 lg:px-24 md:px-10">{children}</main>
      <Footer />

      <BackToTop />
    </>
  );
}
