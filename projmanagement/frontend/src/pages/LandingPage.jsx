import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { HeroScene } from "../components/3d/HeroScene.jsx";
import { Header } from "../components/ui/header-2.jsx";
import Footer from "../components/ui/Footer.jsx";

export function LandingPage() {
  const [dark, setDark] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);

  return (
    <main className="min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_76%_28%,rgba(79,31,180,.14),transparent_32%),var(--bg)] relative">
      <Header />
      <div className="fixed inset-0 pointer-events-none opacity-[.035] z-[8] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_180_180%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.9%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%22.8%22/%3E%3C/svg%3E')]" aria-hidden="true" />

      <section className="relative grid items-center mx-auto min-h-[700px] max-w-[1440px] isolate max-md:min-h-[720px] max-sm:min-h-[760px]" id="top">
        <HeroScene />
        <div className="absolute inset-0 -z-10 pointer-events-none bg-[linear-gradient(90deg,var(--bg)_0%,rgba(5,6,8,.94)_29%,rgba(5,6,8,.26)_61%,rgba(5,6,8,.08)_100%),radial-gradient(ellipse_at_75%_55%,transparent_0%,rgba(5,6,8,.24)_68%,var(--bg)_100%)] max-md:bg-[linear-gradient(180deg,var(--bg)_0%,rgba(5,6,8,.72)_40%,rgba(5,6,8,.2)_100%)]" aria-hidden="true" />
        <div className="w-[min(1240px,calc(100%-64px))] mx-auto pt-[74px] pb-[80px] max-md:w-[min(100%-36px,620px)] max-md:pt-[62px]">
          <div className="inline-flex items-center gap-[7px] text-[#b695ff] text-[11px] font-semibold tracking-[.08em] uppercase"><Sparkles size={14} /> Plan, collaborate, ship.</div>
          <h1 className="max-w-[590px] mt-[18px] mb-[20px] font-bold text-[clamp(51px,6.2vw,92px)] leading-[.96] tracking-[-.08em] font-['Space_Grotesk'] max-md:text-[clamp(47px,14vw,74px)]">Where projects<br /><span className="text-[var(--accent-2)]">come together.</span></h1>
          <p className="max-w-[430px] text-[var(--muted)] text-[17px] leading-[1.7] mb-[30px] max-md:text-[15px]">Workloom is the modern workspace for planning, collaboration, and delivering work that matters.</p>
          <div className="flex gap-[12px] flex-wrap">
            <a className="inline-flex items-center justify-center gap-[9px] min-h-[48px] px-[20px] text-white bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] border border-[rgba(199,171,255,.28)] rounded-[11px] shadow-[0_14px_35px_rgba(95,40,214,.25)] text-[14px] font-semibold cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(95,40,214,.42)]" href="/signup">Get started for free <ArrowRight size={17} /></a>
            <button className="inline-flex items-center justify-center gap-[9px] min-h-[48px] px-[20px] text-inherit bg-[rgba(255,255,255,.045)] border border-[var(--line)] rounded-[11px] text-[14px] font-semibold cursor-pointer transition-all hover:-translate-y-[2px]" onClick={() => setShowVideo(true)}><Play size={15} fill="currentColor" /> See how it works</button>
          </div>
          <div className="flex items-center gap-[21px] flex-wrap mt-[82px] text-[#6d6d7b] text-[11px] max-md:mt-[46px]"><span>Trusted by fast-moving teams</span><span className="text-[#8a8897] max-sm:hidden">◈ northstar</span><span className="text-[#8a8897] max-sm:hidden">◈ pixelpeak</span><span className="text-[#8a8897] max-sm:hidden">◈ sequence</span></div>
        </div>
        <div className="absolute bottom-[26px] right-[32px] text-[#666573] text-[11px] flex items-center gap-[9px]"><span className="w-[5px] h-[5px] bg-[#7c3cff] rounded-full shadow-[0_0_12px_#7c3cff]" /> Scroll to explore</div>
      </section>

      <section className="w-[min(1240px,calc(100%-64px))] mx-auto pt-[54px] pb-[72px] border-t border-[var(--line)] grid grid-cols-4 gap-[28px] max-md:w-[min(100%-36px,620px)] max-md:grid-cols-2 max-md:gap-y-[30px] max-md:gap-x-[18px] max-sm:grid-cols-1 max-sm:gap-0 max-sm:p-0 max-sm:border-0 max-sm:py-[50px]" id="product">
        <div className="pr-[19px] border-r border-[var(--line)] max-md:[&:nth-child(2)]:border-0 max-sm:border-0 max-sm:p-0 max-sm:mb-8"><span className="w-[32px] h-[32px] grid place-items-center rounded-[9px] mb-[18px] bg-[rgba(124,60,255,.16)] text-[#a678ff]"><Check size={17} /></span><h2 className="font-semibold text-[15px] font-['Space_Grotesk'] mb-[9px]">Plan with clarity</h2><p className="text-[var(--muted)] text-[12px] leading-[1.6]">Break down complex work, set priorities, and align on what matters.</p></div>
        <div className="pr-[19px] border-r border-[var(--line)] max-md:[&:nth-child(2)]:border-0 max-sm:border-0 max-sm:p-0 max-sm:mb-8"><span className="w-[32px] h-[32px] grid place-items-center rounded-[9px] mb-[18px] bg-[rgba(25,197,255,.13)] text-[#41d1ff]"><Check size={17} /></span><h2 className="font-semibold text-[15px] font-['Space_Grotesk'] mb-[9px]">Collaborate seamlessly</h2><p className="text-[var(--muted)] text-[12px] leading-[1.6]">Share updates, keep context close, and move together without the noise.</p></div>
        <div className="pr-[19px] border-r border-[var(--line)] max-md:[&:nth-child(2)]:border-0 max-sm:border-0 max-sm:p-0 max-sm:mb-8"><span className="w-[32px] h-[32px] grid place-items-center rounded-[9px] mb-[18px] bg-[rgba(41,220,164,.12)] text-[#52e7bc]"><Check size={17} /></span><h2 className="font-semibold text-[15px] font-['Space_Grotesk'] mb-[9px]">Track in real time</h2><p className="text-[var(--muted)] text-[12px] leading-[1.6]">See progress as it happens with focused project views and activity.</p></div>
        <div className="pr-[19px] border-r border-[var(--line)] last:border-0 max-md:[&:nth-child(2)]:border-0 max-sm:border-0 max-sm:p-0 max-sm:mb-8"><span className="w-[32px] h-[32px] grid place-items-center rounded-[9px] mb-[18px] bg-[rgba(255,154,67,.13)] text-[#ffb46e]"><Check size={17} /></span><h2 className="font-semibold text-[15px] font-['Space_Grotesk'] mb-[9px]">Ship with confidence</h2><p className="text-[var(--muted)] text-[12px] leading-[1.6]">Turn good intentions into finished work, every time.</p></div>
      </section>

      <section className="w-[min(1240px,calc(100%-64px))] mx-auto py-[90px] border-t border-[var(--line)] flex justify-between items-end gap-[32px] max-md:w-[min(100%-36px,620px)] max-md:block max-md:py-[65px]" id="solutions">
        <div><div className="inline-flex items-center gap-[7px] text-[#b695ff] text-[11px] font-semibold tracking-[.08em] uppercase"><Sparkles size={14} /> Built for momentum</div><h2 className="max-w-[560px] font-semibold text-[clamp(32px,4vw,55px)] leading-none font-['Space_Grotesk'] tracking-[-.07em] my-[16px]">Your team’s best work has a place to land.</h2><p className="text-[var(--muted)] max-w-[520px] leading-[1.7]">One calm, connected space for projects, tasks, people, and the decisions that keep everything moving.</p></div>
        <a className="inline-flex items-center justify-center gap-[9px] min-h-[48px] px-[20px] text-white bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] border border-[rgba(199,171,255,.28)] rounded-[11px] shadow-[0_14px_35px_rgba(95,40,214,.25)] text-[14px] font-semibold cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(95,40,214,.42)] max-md:mt-[28px]" href="/signup">Build your workspace <ArrowRight size={17} /></a>
      </section>

      <Footer />

      {showVideo && <div className="fixed inset-0 z-20 bg-[rgba(0,0,0,.76)] grid place-items-center p-[24px] backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Workloom preview" onClick={() => setShowVideo(false)}><div className="w-[min(760px,100%)] aspect-[16/9] relative border border-[var(--line)] rounded-[18px] overflow-hidden bg-[#08070e]" onClick={(event) => event.stopPropagation()}><button className="absolute z-10 top-[14px] right-[14px] border-0 text-white bg-[rgba(0,0,0,.4)] w-[36px] h-[36px] rounded-full cursor-pointer hover:bg-[rgba(0,0,0,.6)] transition-colors" onClick={() => setShowVideo(false)}><X size={20} className="m-auto" /></button><video className="w-full h-full object-cover" autoPlay controls controlsList="nodownload" playsInline><source src="https://res.cloudinary.com/whupilj3/video/upload/v1786281956/demo-video.webm" type="video/webm" />Your browser does not support the video tag.</video></div></div>}
    </main>
  );
}
