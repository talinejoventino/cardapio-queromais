import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import CartButton from "../cart/CartButton";

export default function BrandHeader() {
  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <div className="glass max-w-6xl mx-auto flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="relative group transition-all duration-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white p-1 rounded-full shadow-sm">
              <Image
                src="/logo-queromais.jpeg"
                alt="QueroMais"
                width={56}
                height={56}
                className="rounded-full object-cover w-12 h-12 md:w-14 md:h-14"
                priority
              />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              QueroMais
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              Mais sabor para sua vida
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center gap-4 border-r pr-4 md:pr-6 border-border/50">
            <a
              href="https://wa.me/5581992876549"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={22} />
            </a>
            <a
              href="https://instagram.com/produtosqueromaiis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={22} />
            </a>
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
