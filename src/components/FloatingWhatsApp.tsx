import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <Link 
      href="https://wa.me/5512997397129" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] transition-all duration-300"
    >
      <MessageCircle className="w-7 h-7" />
    </Link>
  );
}
