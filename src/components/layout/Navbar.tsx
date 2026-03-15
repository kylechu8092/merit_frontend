import Link from "next/link";

type NavItem = { label: string; href: string };
type Status = { label: string; color: string };

type NavbarProps = {
  items: NavItem[];
  activeHref?: string;
  status?: Status;
};

export default function Navbar({ items, activeHref, status }: NavbarProps) {
  return (
    <nav className="flex items-center h-12 px-10 bg-black w-full shrink-0">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <span className="text-[#00D084] font-bold text-base">&gt;</span>
        <span className="text-white font-bold text-sm tracking-widest">SKYLINE_SAR</span>
      </Link>
      <div className="flex items-center gap-8 flex-1 justify-center">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs ${
              activeHref === item.href
                ? "text-[#00D084] font-medium"
                : "text-[#777777]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {status && (
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-semibold" style={{ color: status.color }}>
            {status.label}
          </span>
          <span className="text-[#777777] text-xs">sar_operator</span>
        </div>
      )}
    </nav>
  );
}
