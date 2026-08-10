import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Play,
  Sparkles,
  X,
  Target,
  Users,
  Activity,
  Rocket,
  Folder,
  CheckSquare,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import WarpText from "../components/3d/WrapText.jsx";
import { HeroScene } from "../components/3d/HeroScene.jsx";
import { Header } from "../components/ui/header-2.jsx";
import Footer from "../components/ui/Footer.jsx";
import { MovingDotCard } from "../components/ui/moving-dot-card.jsx";
import { HighlightCard } from "../components/ui/highlight-card.jsx";
import { OrbitScene } from "../components/ui/orbit-scene.jsx";
import { FeaturesShowcase } from "../components/ui/features-showcase.jsx";
import { FadeIn } from "../components/ui/fade-in.jsx";

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
          <p className="max-w-[430px] text-[#a1a1aa] text-[17px] leading-[1.7] mb-[30px] max-md:text-[15px]">Workloom is the modern workspace for planning, collaboration, and delivering work that matters.</p>
          <div className="flex gap-[12px] flex-wrap">
            <a className="inline-flex items-center justify-center gap-[9px] min-h-[48px] px-[20px] text-white bg-[linear-gradient(135deg,#8b55ff,#5b28d9)] border border-[rgba(199,171,255,.28)] rounded-[11px] shadow-[0_14px_35px_rgba(95,40,214,.25)] text-[14px] font-semibold cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(95,40,214,.42)]" href="/signup">Get started for free <ArrowRight size={17} /></a>
            <button className="inline-flex items-center justify-center gap-[9px] min-h-[48px] px-[20px] text-inherit bg-[rgba(255,255,255,.045)] border border-[var(--line)] rounded-[11px] text-[14px] font-semibold cursor-pointer transition-all hover:-translate-y-[2px]" onClick={() => setShowVideo(true)}><Play size={15} fill="currentColor" /> See how it works</button>
          </div>
          <div className="flex items-center gap-[21px] flex-wrap mt-[82px] text-[#a1a1aa] text-[11px] max-md:mt-[46px]"><span>Trusted by fast-moving teams</span><span className="text-[#a1a1aa] max-sm:hidden">◈ northstar</span><span className="text-[#a1a1aa] max-sm:hidden">◈ pixelpeak</span><span className="text-[#a1a1aa] max-sm:hidden">◈ sequence</span></div>
        </div>
        <div className="absolute bottom-[26px] right-[32px] text-[#666573] text-[11px] flex items-center gap-[9px]"><span className="w-[5px] h-[5px] bg-[#7c3cff] rounded-full shadow-[0_0_12px_#7c3cff]" /> Scroll to explore</div>
      </section>

      <FadeIn direction="up" delay={0.1}>
      <section className="w-[min(1240px,calc(100%-64px))] mx-auto mt-[80px] grid grid-cols-4 gap-[24px] max-md:w-[min(100%-36px,620px)] max-md:grid-cols-2 max-sm:grid-cols-1 relative" id="product">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-10%] w-[300px] h-[300px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(166,120,255,0.1) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(65,209,255,0.1) 0%, transparent 70%)' }} />
          <div className="absolute top-[15%] left-[20%] w-[20px] h-[20px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #a678ff 0%, transparent 80%)', animation: 'float 7s ease-in-out infinite' }} />
          <div className="absolute top-[50%] left-[45%] w-[12px] h-[12px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #5c82ff 0%, transparent 80%)', animation: 'float 9s ease-in-out infinite 2s' }} />
          <div className="absolute top-[25%] right-[25%] w-[18px] h-[18px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #41d1ff 0%, transparent 80%)', animation: 'float 6s ease-in-out infinite 1s' }} />
          <div className="absolute bottom-[35%] right-[15%] w-[14px] h-[14px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #52e7bc 0%, transparent 80%)', animation: 'float 8s ease-in-out infinite 3s' }} />
          <div className="absolute top-[30%] left-[80%] w-[4px] h-[4px] bg-white/70 rounded-full will-change-transform" style={{ animation: 'float 5s ease-in-out infinite 1.5s' }} />
          <div className="absolute bottom-[20%] left-[15%] w-[5px] h-[5px] bg-[#a678ff]/70 rounded-full will-change-transform" style={{ animation: 'float 6s ease-in-out infinite 0.5s' }} />
          <div className="absolute top-[80%] left-[65%] w-[6px] h-[6px] bg-[#41d1ff]/70 rounded-full will-change-transform" style={{ animation: 'float 7s ease-in-out infinite 2.5s' }} />
          <div className="absolute top-[10%] left-[40%] w-[3px] h-[3px] bg-[#52e7bc]/70 rounded-full will-change-transform" style={{ animation: 'float 8s ease-in-out infinite 0.2s' }} />
        </div>

        <MovingDotCard className="h-full min-h-[220px]" dotColor="#a678ff" bgGlow="rgba(166,120,255,0.06)">
          <div className="flex items-center gap-[12px] mb-[16px]">
            <span className="w-[36px] h-[36px] grid place-items-center rounded-[10px] bg-[rgba(166,120,255,.16)] text-[#a678ff]">
              <Target size={18} />
            </span>
            <h2 className="font-semibold text-[17px] font-['Space_Grotesk'] text-[#a678ff]">Plan</h2>
          </div>
          <p className="text-[#a1a1aa] text-[14px] leading-[1.6]">Break down ideas into actionable plans and prioritize what matters.</p>
        </MovingDotCard>
        
        <MovingDotCard className="h-full min-h-[220px]" dotColor="#5c82ff" bgGlow="rgba(92,130,255,0.06)">
          <div className="flex items-center gap-[12px] mb-[16px]">
            <span className="w-[36px] h-[36px] grid place-items-center rounded-[10px] bg-[rgba(92,130,255,.16)] text-[#5c82ff]">
              <Users size={18} />
            </span>
            <h2 className="font-semibold text-[17px] font-['Space_Grotesk'] text-[#5c82ff]">Collaborate</h2>
          </div>
          <p className="text-[#a1a1aa] text-[14px] leading-[1.6]">Align your team with real-time updates and shared context.</p>
        </MovingDotCard>

        <MovingDotCard className="h-full min-h-[220px]" dotColor="#41d1ff" bgGlow="rgba(65,209,255,0.06)">
          <div className="flex items-center gap-[12px] mb-[16px]">
            <span className="w-[36px] h-[36px] grid place-items-center rounded-[10px] bg-[rgba(65,209,255,.16)] text-[#41d1ff]">
              <Activity size={18} />
            </span>
            <h2 className="font-semibold text-[17px] font-['Space_Grotesk'] text-[#41d1ff]">Track</h2>
          </div>
          <p className="text-[#a1a1aa] text-[14px] leading-[1.6]">Get full visibility into progress, roadblocks, and deadlines.</p>
        </MovingDotCard>

        <MovingDotCard className="h-full min-h-[220px]" dotColor="#52e7bc" bgGlow="rgba(82,231,188,0.06)">
          <div className="flex items-center gap-[12px] mb-[16px]">
            <span className="w-[36px] h-[36px] grid place-items-center rounded-[10px] bg-[rgba(82,231,188,.16)] text-[#52e7bc]">
              <Rocket size={18} />
            </span>
            <h2 className="font-semibold text-[17px] font-['Space_Grotesk'] text-[#52e7bc]">Ship</h2>
          </div>
          <p className="text-[#a1a1aa] text-[14px] leading-[1.6]">Deliver quality work faster with confidence and clarity.</p>
        </MovingDotCard>
      </section>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
      <section className="w-[min(1240px,calc(100%-64px))] mx-auto mt-[80px] flex gap-[24px] max-lg:flex-col relative" id="how-it-works">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(92,130,255,0.1) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(82,231,188,0.1) 0%, transparent 70%)' }} />
          <div className="absolute top-[20%] left-[15%] w-[16px] h-[16px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #a678ff 0%, transparent 80%)', animation: 'float 6s ease-in-out infinite' }} />
          <div className="absolute bottom-[30%] left-[35%] w-[22px] h-[22px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #5c82ff 0%, transparent 80%)', animation: 'float 8s ease-in-out infinite 1s' }} />
          <div className="absolute top-[25%] right-[15%] w-[14px] h-[14px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #41d1ff 0%, transparent 80%)', animation: 'float 7s ease-in-out infinite 2s' }} />
          <div className="absolute bottom-[20%] right-[25%] w-[20px] h-[20px] rounded-full will-change-transform" style={{ backgroundImage: 'radial-gradient(circle, #52e7bc 0%, transparent 80%)', animation: 'float 5s ease-in-out infinite 3s' }} />
          <div className="absolute top-[65%] right-[40%] w-[5px] h-[5px] bg-white/70 rounded-full will-change-transform" style={{ animation: 'float 9s ease-in-out infinite 1.5s' }} />
          <div className="absolute top-[15%] right-[45%] w-[4px] h-[4px] bg-[#a678ff]/70 rounded-full will-change-transform" style={{ animation: 'float 6s ease-in-out infinite 0.5s' }} />
          <div className="absolute bottom-[40%] left-[10%] w-[6px] h-[6px] bg-[#41d1ff]/70 rounded-full will-change-transform" style={{ animation: 'float 8s ease-in-out infinite 1.2s' }} />
          <div className="absolute top-[45%] left-[80%] w-[5px] h-[5px] bg-[#52e7bc]/70 rounded-full will-change-transform" style={{ animation: 'float 7s ease-in-out infinite 2.2s' }} />
        </div>

        <div className="w-[220px] shrink-0 pt-[16px] max-lg:w-full max-lg:pt-0 max-lg:mb-[16px]">
          <WarpText 
            text={"HOW\nIT WORKS"}
            color="#ffffff"
            fontSize="clamp(42px, 5vw, 64px)"
            fontWeight={800}
            lineHeight={0.9}
            className="w-full min-h-[180px] -ml-2"
          />
        </div>
        
        <div className="flex-1 relative">
          {/* Dotted connecting line behind cards */}
          <div className="absolute top-[50%] left-[20px] right-[20px] h-[1px] border-t border-dashed border-white/10 -translate-y-1/2 z-0 max-lg:hidden" />
          
          <div className="grid grid-cols-4 gap-[20px] relative z-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <HighlightCard className="h-full min-h-[200px]" glowColor="rgba(166,120,255,0.08)">
              <div className="flex items-center gap-[12px] mb-[16px]">
                <span className="w-[28px] h-[28px] grid place-items-center rounded-full border border-[rgba(166,120,255,.3)] bg-[#08070e] text-[12px] font-bold text-[#a1a1aa]">1</span>
                <h3 className="font-semibold text-[15px] font-['Space_Grotesk'] text-[#a678ff]">Create Project</h3>
              </div>
              <p className="text-[#a1a1aa] text-[13px] leading-[1.6] mb-[24px]">Start with a name, goal, and roadmap.</p>
              <div className="mt-auto">
                <span className="w-[36px] h-[36px] grid place-items-center rounded-[10px] bg-[rgba(166,120,255,.08)] text-[#a678ff]">
                  <Folder size={18} />
                </span>
              </div>
            </HighlightCard>

            <HighlightCard className="h-full min-h-[200px]" glowColor="rgba(92,130,255,0.08)">
              <div className="flex items-center gap-[12px] mb-[16px]">
                <span className="w-[28px] h-[28px] grid place-items-center rounded-full border border-[rgba(92,130,255,.3)] bg-[#08070e] text-[12px] font-bold text-[#a1a1aa]">2</span>
                <h3 className="font-semibold text-[15px] font-['Space_Grotesk'] text-[#5c82ff]">Add Team</h3>
              </div>
              <p className="text-[#a1a1aa] text-[13px] leading-[1.6] mb-[24px]">Invite members and set roles in seconds.</p>
              <div className="mt-auto">
                <span className="w-[36px] h-[36px] grid place-items-center rounded-[10px] bg-[rgba(92,130,255,.08)] text-[#5c82ff]">
                  <Users size={18} />
                </span>
              </div>
            </HighlightCard>

            <HighlightCard className="h-full min-h-[200px]" glowColor="rgba(65,209,255,0.08)">
              <div className="flex items-center gap-[12px] mb-[16px]">
                <span className="w-[28px] h-[28px] grid place-items-center rounded-full border border-[rgba(65,209,255,.3)] bg-[#08070e] text-[12px] font-bold text-[#a1a1aa]">3</span>
                <h3 className="font-semibold text-[15px] font-['Space_Grotesk'] text-[#41d1ff]">Assign Tasks</h3>
              </div>
              <p className="text-[#a1a1aa] text-[13px] leading-[1.6] mb-[24px]">Break work down and assign with context.</p>
              <div className="mt-auto">
                <span className="w-[36px] h-[36px] grid place-items-center rounded-[10px] bg-[rgba(65,209,255,.08)] text-[#41d1ff]">
                  <CheckSquare size={18} />
                </span>
              </div>
            </HighlightCard>

            <HighlightCard className="h-full min-h-[200px]" glowColor="rgba(82,231,188,0.08)">
              <div className="flex items-center gap-[12px] mb-[16px]">
                <span className="w-[28px] h-[28px] grid place-items-center rounded-full border border-[rgba(82,231,188,.3)] bg-[#08070e] text-[12px] font-bold text-[#a1a1aa]">4</span>
                <h3 className="font-semibold text-[15px] font-['Space_Grotesk'] text-[#52e7bc]">Track Progress</h3>
              </div>
              <p className="text-[#a1a1aa] text-[13px] leading-[1.6] mb-[24px]">Monitor updates and ship with confidence.</p>
              <div className="mt-auto">
                <span className="w-[36px] h-[36px] grid place-items-center rounded-[10px] bg-[rgba(82,231,188,.08)] text-[#52e7bc]">
                  <TrendingUp size={18} />
                </span>
              </div>
            </HighlightCard>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Orbit Scene Section */}
      <FadeIn direction="up" delay={0.1}>
      <section className="w-[min(1400px,calc(100%-64px))] mx-auto mt-[80px] flex items-center justify-between gap-[40px] max-lg:flex-col relative">
        <div className="absolute left-[10%] top-[30%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(166,120,255,0.03) 0%, transparent 70%)' }} />
        
        {/* Left Side Text */}
        <div className="w-[340px] shrink-0 max-lg:w-full z-10 pl-[40px] max-lg:pl-0 max-lg:mb-[40px]">
          <h2 className="text-[#a678ff] text-[12px] font-bold tracking-[0.1em] uppercase mb-[24px]">How Projects, Visualized</h2>
          <h3 className="text-white text-[26px] font-medium leading-[1.4] mb-[40px] tracking-tight">
            A dynamic workspace that adapts to your flow and keeps everything in perfect orbit.
          </h3>
          
          <ul className="space-y-[24px]">
            {['Real-time updates', 'Custom workflows', 'Unified project hub', 'AI-powered insights'].map((item) => (
              <li key={item} className="flex items-center gap-[16px] text-[#a1a1aa] text-[15px] font-medium transition-colors hover:text-white">
                <CheckCircle2 size={18} className="text-[#a1a1aa]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side 3D Scene */}
        <div className="flex-1 w-full relative z-10 max-w-[900px]">
          <OrbitScene />
        </div>
      </section>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <FeaturesShowcase onPlayVideo={() => setShowVideo(true)} />
      </FadeIn>

      {/* Old sections removed as requested, leaving only the footer below */}

      <Footer />

      {showVideo && <div className="fixed inset-0 z-20 bg-[rgba(0,0,0,.76)] grid place-items-center p-[24px] backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Workloom preview" onClick={() => setShowVideo(false)}><div className="w-[min(760px,100%)] aspect-[16/9] relative border border-[var(--line)] rounded-[18px] overflow-hidden bg-[#08070e]" onClick={(event) => event.stopPropagation()}><button className="absolute z-10 top-[14px] right-[14px] border-0 text-white bg-[rgba(0,0,0,.4)] w-[36px] h-[36px] rounded-full cursor-pointer hover:bg-[rgba(0,0,0,.6)] transition-colors" onClick={() => setShowVideo(false)}><X size={20} className="m-auto" /></button><video className="w-full h-full object-cover" autoPlay controls controlsList="nodownload" playsInline><source src="https://res.cloudinary.com/whupilj3/video/upload/v1786281956/demo-video.webm" type="video/webm" />Your browser does not support the video tag.</video></div></div>}
    </main>
  );
}
