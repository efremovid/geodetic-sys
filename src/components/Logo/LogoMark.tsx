interface LogoMarkProps {
  className?: string
  title?: string
}

export function LogoMark({ className, title = 'ТопоСтройКадастр' }: LogoMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>

      {/* Тахеометр на штативе */}
      <g fill="#1a1a1a">
        <rect x="10" y="82" width="24" height="9" rx="4.5" />
        <rect x="34" y="78" width="34" height="16" rx="3" />
        <rect x="68" y="83" width="16" height="7" rx="3.5" />
        <rect x="44" y="94" width="10" height="18" rx="1.5" />
        <circle cx="49" cy="88" r="3" fill="#444" />
      </g>
      <g stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M49 112 L28 172" />
        <path d="M49 112 L49 172" />
        <path d="M49 112 L70 148" />
      </g>

      {/* Шкала / компас */}
      <path
        d="M 108 44 A 62 62 0 0 1 162 98"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2.5"
      />
      {[0, 15, 30, 45, 60, 75, 90].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180
        const cx = 108 + 62 * Math.cos(rad)
        const cy = 44 + 62 * Math.sin(rad)
        return (
          <g key={deg}>
            <line
              x1={cx}
              y1={cy}
              x2={cx + 6 * Math.cos(rad + Math.PI / 2)}
              y2={cy + 6 * Math.sin(rad + Math.PI / 2)}
              stroke="#1a1a1a"
              strokeWidth={deg % 30 === 0 ? 2.2 : 1.2}
            />
            {deg % 30 === 0 && (
              <circle cx={cx} cy={cy} r="2.8" fill="#1a1a1a" />
            )}
          </g>
        )
      })}

      <text
        x="131"
        y="38"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="700"
        fill="#1a1a1a"
      >
        N
      </text>
      <text
        x="168"
        y="108"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="700"
        fill="#1a1a1a"
      >
        E
      </text>

      {/* Стрелки компаса */}
      <g strokeLinecap="round">
        <path d="M132 72 L132 50" stroke="#8a8a8a" strokeWidth="3.5" />
        <path d="M132 72 L150 86" stroke="#bdbdbd" strokeWidth="3.5" />
        <circle cx="132" cy="72" r="3" fill="#1a1a1a" />
      </g>

      {/* Кадастровый участок */}
      <g
        fill="none"
        stroke="#ba0018"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M108 122 L186 116 L176 184 L112 188 L108 150 Z" />
        <path d="M148 118 L142 186" />
        <path d="M128 148 L178 142" />
        <path d="M112 165 L176 158" />
      </g>
    </svg>
  )
}
