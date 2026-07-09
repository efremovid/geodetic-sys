interface LogoMarkProps {
  className?: string
  title?: string
}

export function LogoMark({ className, title = 'ТопоСтройКадастр' }: LogoMarkProps) {
  return (
    <img
      className={className}
      src="/logo.png"
      alt={title}
      width={200}
      height={200}
      decoding="async"
      draggable={false}
    />
  )
}
