import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const ICON_COLOR = "#b30000";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1325px] mx-auto px-3 py-20">
        
        {/* MAIN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          
          {/* INFO */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-xl font-bold">Tastii</span>

            <p className="text-sm leading-relaxed mt-3 mb-5 text-gray-300">
              Đây là Tastii, chúng tôi tin rằng mỗi món ăn ngon đều mang đến
              những trải nghiệm đáng nhớ.
            </p>

            {/* SOCIAL */}
            <h4 className="text-sm font-semibold uppercase mb-3">
              Theo dõi tại
            </h4>

            <div className="flex gap-3">
              <a
                href="#"
                className="social-btn"
                style={{ color: ICON_COLOR }}
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="#"
                className="social-btn"
                style={{ color: ICON_COLOR }}
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://wa.me/231XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                style={{ color: ICON_COLOR }}
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">
              Liên hệ tại
            </h3>

            <ul className="space-y-3 text-sm text-gray-300">
              
              <li className="flex items-start gap-2">
                <MapPin size={18} style={{ color: ICON_COLOR }} />
                <span>
                  29/2B, khu phố 8, phường Tân Phong, Biên Hoà, Đồng Nai
                </span>
              </li>

              <li className="flex items-center gap-2">
                <Phone size={18} style={{ color: ICON_COLOR }} />
                <a href="tel:+840398328506" className="hover:text-red-500">
                  +84 0398 328 506
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail size={18} style={{ color: ICON_COLOR }} />
                <a
                  href="mailto:info@gmail.com"
                  className="hover:text-red-500"
                >
                  vungochieu2120006@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* LINE */}
        <hr className="border-gray-800 mb-6" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Tastii. All rights reserved.</p>

          <div className="flex gap-6 mt-2 md:mt-0">
            <a className="hover:text-red-500">Terms of Service</a>
            <a className="hover:text-red-500">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* STYLE */}
      <style jsx>{`
        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: #1f1f1f;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }

        .social-btn:hover {
          background: #b30000;
          color: white !important;
          transform: scale(1.1);
        }
      `}</style>
    </footer>
  );
}