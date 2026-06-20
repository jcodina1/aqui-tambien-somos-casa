import Image from "next/image";
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";

const SOCIAL = [
  {
    Icon: InstagramLogo,
    label: "Instagram",
    href: "https://www.instagram.com/tottobrand/",
  },
  {
    Icon: FacebookLogo,
    label: "Facebook",
    href: "https://www.facebook.com/totto.brand/",
  },
  {
    Icon: TiktokLogo,
    label: "TikTok",
    href: "https://www.tiktok.com/@tottobrand",
  },
  {
    Icon: YoutubeLogo,
    label: "YouTube",
    href: "https://www.youtube.com/c/TOTTOBrandTV",
  },
];

const LEGAL = [
  { label: "Términos y condiciones", href: "#" },
  { label: "Política de privacidad", href: "#" },
  { label: "Tratamiento de datos", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            {/* Logo Totto clásico */}
            <Image
              src="/images/logos/logo-totto-white.svg"
              alt="Totto"
              width={397}
              height={135}
              className="h-9 w-auto"
            />
            <p className="mt-5 max-w-[40ch] text-white/70">
              Acompañando a los colombianos que llevan su casa a donde vayan.
            </p>
            <p className="mt-4 font-mono text-xs tracking-tight text-totto-yellow">
              BOG · 4.7110° N, 74.0721° O
            </p>
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Totto en ${label}`}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-totto-red"
              >
                <Icon size={22} weight="fill" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Aquí también somos casa · Campaña de comunidad Totto</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-totto-yellow">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
