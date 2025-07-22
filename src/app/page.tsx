import Info from "@/components/animation_components/Info";
import Intro2 from "@/components/animation_components/Intro2";
import IntroText from "@/components/animation_components/IntroText";

export default function Home() {
  return (
    <div className="w-full max-w-full flex flex-col items-center mx-auto px-3">
      <IntroText />
      <Info/>
      <Intro2/>
    </div>
  );
}
