import React from 'react';
import { Users, Globe, Phone, Mail, Music } from 'lucide-react';

const Section: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-orange-50 via-rose-50 to-fuchsia-100 font-sans text-black">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">

          {/* Column 1: THÔNG TIN VỀ DỰ ÁN */}
          <div className="flex flex-col items-center md:items-center px-6">
            <h3 className="text-xl font-bold mb-6 uppercase inline-block border-b-2 border-black pb-1">
              Thông tin về dự án
            </h3>

            {/* Logo Placeholder */}
            <div className="w-32 h-32 rounded-full border-2 border-blue-500 flex items-center justify-center bg-white mb-6 overflow-hidden">
              <img
                src="/assets/LogoTruong.png"
                alt="Logo Trường THPT Chuyên Nguyễn Quang Diêu"
                className="w-full h-full"
              />
            </div>

            <ul className="text-sm space-y-4 w-full">
              <li className="flex items-start gap-3">
                <Users className="w-6 h-6 shrink-0 mt-1" />
                <span className="font-semibold uppercase">
                  Người thực hiện : Tập thể 10T1 THPT chuyên Nguyễn Quang Diêu
                </span>
              </li>
              <li className="flex items-start gap-3 pl-9">
                <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                <span className="uppercase font-semibold">( Câu khái quát )</span>
              </li>
            </ul>
          </div>

          {/* Column 2: THÔNG TIN KHU DI TÍCH */}
          <div className="flex flex-col items-center md:items-center px-6">
            <h3 className="text-xl font-bold mb-6 uppercase inline-block border-b-2 border-black pb-1">
              Thông tin khu di tích
            </h3>

            {/* Image Placeholder */}
            <div className="w-full border-2 border-blue-500 flex items-center justify-center bg-white mb-6 overflow-hidden">
              <img
                src="assets/khuditich.png"
                className="w-full h-full object-contain"
              />
            </div>

            <ul className="text-sm space-y-4 w-full max-w-[280px] font-semibold">
              <li className="flex items-center gap-3 pl-2">
                <span className="w-1.5 h-1.5 rounded-full border-2 border-black shrink-0" />
                <span>OPEN / CLOSE</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-black text-white rounded-full p-1">
                </div>
                <span>( LINK FACEBOOK )</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-7 h-7 shrink-0 text-black" />
                <span>( LINK WEB CỦA KHU DI TÍCH )</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="border-2 border-black rounded-full p-1">
                  <Phone className="w-5 h-5 shrink-0" />
                </div>
                <span>( SDT LIÊN HỆ QUẢN LÍ KHU DI TÍCH )</span>
              </li>
            </ul>
          </div>

          {/* Column 3: LIÊN HỆ CHÚNG TÔI & NGUỒN THÔNG TIN */}
          <div className="flex flex-col items-center md:items-center px-6">
            <h3 className="text-xl font-bold mb-6 uppercase inline-block border-b-2 border-black pb-1">
              Liên hệ chúng tôi
            </h3>

            <ul className="text-sm space-y-5 w-full max-w-[220px] mb-12 font-semibold">
              <li className="flex items-center gap-3">
                <div className="bg-black text-white rounded-full p-1">
                </div>
                <span>( LINK FACEBOOK )</span>
              </li>
              <li className="flex items-center gap-3">
                {/* Note: Music icon used as a placeholder for TikTok */}
                <div className="bg-black text-white rounded-full p-1">
                  <Music className="w-5 h-5 shrink-0" />
                </div>
                <span>( LINK TIKTOK )</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="border-2 border-black rounded-full p-1">
                  <Mail className="w-5 h-5 shrink-0" />
                </div>
                <span>( MAIL )</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-2 uppercase inline-block border-b-2 border-black pb-1">
              Nguồn thông tin
            </h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Section;