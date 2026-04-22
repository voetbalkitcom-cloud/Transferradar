import Image from 'next/image';

type Props = {
  name: string;
  shortCode: string;
  logoPath?: string | null;
  primaryColor?: string | null;
  size?: number;
};

export default function LogoBadge({
  name,
  shortCode,
  logoPath,
  primaryColor,
  size = 52,
}: Props) {
  const safeLogoPath = logoPath ?? undefined;
  const safePrimaryColor = primaryColor ?? '#111827';

  return (
    <div
      style={{ width: size, height: size }}
      className="logoBadge"
      aria-label={`${name} logo`}
    >
      {safeLogoPath ? (
        <Image
          src={safeLogoPath}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="logoImage"
        />
      ) : (
        <div className="logoFallback" style={{ background: safePrimaryColor }}>
          {shortCode}
        </div>
      )}
    </div>
  );
}
