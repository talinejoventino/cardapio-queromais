import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import CartButton from "../cart/CartButton";

export default function BrandHeader() {
  return (
    <header className="w-full bg-gradient-to-r from-[#E4A61F] to-[#A9672D] shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-full shadow-lg">
            <Image
              src="/logo-queromais.jpeg"
              alt="QueroMais"
              width={140}
              height={140}
              className="rounded-full"
              priority
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* <a
            href="https://wa.me/55XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#A9672D] font-semibold px-4 py-2 rounded-lg shadow hover:bg-white/90 transition"
          >
            Peça Agora
          </a> */}
          <CartButton/>
          <a
            href="https://wa.me/55XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://instagram.com/produtosqueromaiis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/80"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </header>
  );
}
