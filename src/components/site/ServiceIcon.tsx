type ServiceIconProps = {
  icon: string;
  className?: string;
};

export function ServiceIcon({ icon, className = "h-6 w-6" }: ServiceIconProps) {
  const stroke = "currentColor";

  if (icon === "spark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M12 3l1.2 5.2L18 9.5l-4.8 1.3L12 16l-1.2-5.2L6 9.5l4.8-1.3L12 3z"
          stroke={stroke}
          strokeWidth="1.5"
        />
        <path d="M18 14l.7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7L18 14z" stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }

  if (icon === "cube" || icon === "systems") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke={stroke} strokeWidth="1.5" />
        <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }

  if (icon === "network") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <circle cx="6" cy="6" r="2" stroke={stroke} strokeWidth="1.5" />
        <circle cx="18" cy="8" r="2" stroke={stroke} strokeWidth="1.5" />
        <circle cx="8" cy="18" r="2" stroke={stroke} strokeWidth="1.5" />
        <circle cx="17" cy="17" r="2" stroke={stroke} strokeWidth="1.5" />
        <path d="M8 7.5l8 1M7.5 8l1 8M16.5 9.5l-6.5 6.5M16 16.2l-6.2-6.2" stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }

  if (icon === "globe") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.5" />
        <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }

  if (icon === "mobile") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <rect x="7" y="3" width="10" height="18" rx="2" stroke={stroke} strokeWidth="1.5" />
        <path d="M11 17h2" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "landing") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path d="M4 5h16v4H4zM4 12h10v2H4zM4 16h7v2H4z" stroke={stroke} strokeWidth="1.5" />
        <path d="M16 14l4 3-4 3v-6z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "consult") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path d="M4 19V5h11v10H7l-3 4z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 9h5M9 12h3" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="8" r="3" stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M12 3l8 3v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6l8-3z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M8 8l-3 4 3 4M16 8l3 4-3 4M13 6l-2 12" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
