"use client";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
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

            <h4 className="text-sm font-semibold uppercase mb-3">
              Theo dõi tại
            </h4>

            <div className="flex gap-3">
              <a href="#" className={styles.socialBtn}>
                <FaFacebook size={18} />
              </a>

              <a href="#" className={styles.socialBtn}>
                <FaInstagram size={18} />
              </a>

              <a
                href="https://wa.me/231XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
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
                <MapPin size={18} className={styles.icon} />
                <span>
                  29/2B, khu phố 8, phường Tân Phong, Biên Hoà, Đồng Nai
                </span>
              </li>

              <li className="flex items-center gap-2">
                <Phone size={18} className={styles.icon} />
                <a href="tel:+840398328506" className={styles.link}>
                  +84 0398 328 506
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail size={18} className={styles.icon} />
                <a
                  href="mailto:info@gmail.com"
                  className={styles.link}
                >
                  vungochieu2120006@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 mb-6" />

        <div className="flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Tastii. All rights reserved.</p>

          <div className="flex gap-6 mt-2 md:mt-0">
            <a className={styles.link}>Terms of Service</a>
            <a className={styles.link}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}