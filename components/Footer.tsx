import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa"
import { Mail, Phone, MapPin } from "lucide-react"
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          
          {/* Restaurant Info + Social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="logo-text text-xl font-bold">Tastii</span>
            <p className="text-sm leading-relaxed mb-4">
              Đây là Tastii, chúng tôi tin rằng mỗi món ăn ngon đều mang đến những trải nghiệm đáng nhớ. Tastii được tạo ra để giúp bạn khám phá những địa điểm ăn uống hấp dẫn, quán ngon nổi bật và hương vị đặc sắc ngay tại khu vực của mình.
            </p>
            
            {/* Social Icons */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase">Theo dõi</h4>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition">
                  <FaInstagram size={18} />
                </a>
                <a href="https://wa.me/231XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition">
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span>29/2B, tổ 42A, khu phố 8, phường Tân Phong, Biên Hoà, Đồng Nai</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <a href="tel:+231XXXXXXXXXX" className="hover:text-primary transition">+84 0398 328 506</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <a href="mailto:info@cozytable.com" className="hover:text-primary transition">vungochieu2120006@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="border-gray-800 mb-6" />
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tastii. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition">Terms of Service</a>
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}