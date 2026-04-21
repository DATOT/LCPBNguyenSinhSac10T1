import React, { useState, useEffect } from 'react';

// --- NATIVE ICONS ---
const CompassIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
);
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

const HeroMinimalParticles: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Kích hoạt hiệu ứng fade-in khi trang vừa load xong
    setIsLoaded(true);
  }, []);

  // Tạo ra 40 hạt tĩnh (Dùng công thức toán học thay vì Math.random để tránh lỗi Hydration của React)
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${(i * 13) % 100}%`,
    top: `${(i * 27) % 100}%`,
    size: (i % 3) + 1.5,
    duration: (i % 15) + 15, // Thời gian bay từ 15-30s
    delay: (i % 10) * 0.5,
    maxOpacity: (i % 4) * 0.1 + 0.1 // Độ sáng từ 0.1 đến 0.4
  }));

  return (
    <header className="relative w-full h-screen min-h-[750px] bg-zinc-950 text-zinc-50 overflow-hidden font-sans selection:bg-[#F5A623] selection:text-white">

      {/* --- CSS NATIVE ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes floatParticle {
          0% { transform: translateY(0px) scale(1); opacity: 0; }
          20% { opacity: var(--max-opacity); }
          80% { opacity: var(--max-opacity); }
          100% { transform: translateY(-150px) scale(0.5); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-entrance {
          opacity: 0;
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* --- BACKGROUND & PARTICLES --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6735679/pexels-photo-6735679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Khu di tích"
          className={`h-full w-full object-cover transition-all duration-[3s] ${isLoaded ? 'opacity-80 scale-105 blur-0' : 'opacity-0 scale-110 blur-xl'}`}
        />

        {/* Lớp phủ tối mờ (Gradient) để làm nổi bật chữ */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-900/80 to-zinc-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/60"></div>

        {/* Các hạt (Particles) bay lơ lửng */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#F5A623] pointer-events-none mix-blend-screen"
            style={{
              width: p.size, height: p.size,
              left: p.left, top: p.top,
              '--max-opacity': p.maxOpacity,
              animation: `floatParticle ${p.duration}s linear ${p.delay}s infinite`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* --- NAVIGATION TỐI GIẢN --- */}
      <nav className={`relative z-20 w-full flex justify-between items-center px-6 lg:px-16 py-8 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-amber-500">
            Thành phố Cao Lãnh
          </span>
          <span className="text-lg md:text-xl font-bold tracking-widest uppercase text-zinc-100" style={{ fontFamily: '"Playfair Display", serif' }}>
            Đồng Tháp
          </span>
        </div>

        {/* Nút Menu Hamburger - Chỉ giữ lại cho có cấu trúc Nav */}
        <button className="group flex flex-col items-end gap-2 p-4 -mr-4 hover:opacity-80 transition-opacity">
          <span className="h-[2px] w-8 bg-zinc-300 transition-all duration-500 group-hover:bg-[#F5A623]"></span>
          <span className="h-[2px] w-6 bg-zinc-300 transition-all duration-500 group-hover:bg-[#F5A623]"></span>
        </button>
      </nav>

      {/* --- MAIN CONTENT (Thuần Typography) --- */}
      <div className="relative z-10 w-full h-[calc(100%-120px)] flex flex-col justify-center px-6 lg:px-16 pb-12">
        <div className="w-full max-w-6xl">
          {isLoaded && (
            <>
              {/* Cấp 1: Tiêu đề nhỏ */}
              <div className="animate-entrance flex items-center gap-3 text-[#F5A623] mb-6" style={{ animationDelay: '0.2s' }}>
                <CompassIcon />
                <p className="text-sm font-bold tracking-[0.2em] uppercase">Khu Di Tích Lịch Sử</p>
              </div>

              {/* Cấp 2 + 3: TIÊU ĐỀ CHÍNH - Chữ bám sát thiết kế, tĩnh, uy nghi */}
              <h1 className="animate-entrance flex flex-col font-bold leading-[1.05] tracking-tight uppercase drop-shadow-2xl mb-8" style={{ fontFamily: '"Playfair Display", serif', animationDelay: '0.4s' }}>
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] text-zinc-100">
                  Di Tích Quốc Gia
                </span>
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[96px] text-[#F5A623] drop-shadow-[0_0_40px_rgba(245,166,35,0.15)]">
                  Nguyễn Sinh Sắc
                </span>
              </h1>

              {/* Cấp 4: Câu trích dẫn */}
              <div className="animate-entrance flex items-center gap-4 pl-1" style={{ animationDelay: '0.6s' }}>
                <div className="w-16 h-[1px] bg-zinc-500"></div>
                <h2 className="text-2xl md:text-3xl font-light italic text-zinc-300 tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Hồn Thiêng <span className="font-semibold text-[#F5A623]">Đất Cổ.</span>
                </h2>
              </div>
            </>
          )}
        </div>
      </div>

      {/* --- BOTTOM INFO BAR --- */}
      <div
        className={`absolute bottom-0 left-0 w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-6 lg:px-16 py-6 border-t border-zinc-800/50 bg-zinc-950/40 backdrop-blur-md z-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: '0.8s' }}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <MapPinIcon />
            <span className="text-xs font-medium tracking-wider">Phường 4, TP. Cao Lãnh</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-zinc-400">
            <ClockIcon />
            <span className="text-xs font-medium tracking-wider">07:00 - 17:00</span>
          </div>
        </div>

        {/* Scroll indicator tối giản */}
        <div className="flex items-center gap-4 text-zinc-400">
          <span className="text-[10px] tracking-[0.2em] uppercase">Khám phá</span>
          <div className="w-[1px] h-8 bg-zinc-700 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#F5A623] animate-[bounce_2s_infinite]"></div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default HeroMinimalParticles; 