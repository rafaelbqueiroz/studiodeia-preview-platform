interface StudioLogoProps {
  logoUrl: string;
}

export function StudioLogo({ logoUrl }: StudioLogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Studio de IA"
      className="h-8 w-auto sm:h-9"
      draggable={false}
    />
  );
}
