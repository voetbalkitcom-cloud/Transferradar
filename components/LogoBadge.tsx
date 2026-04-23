import Image from 'next/image';

type LogoBadgeProps = {
  name: string;
  shortCode?: string | null;
  logoPath?: string | null;
  primaryColor?: string | null;
  size?: number;
};

export default function LogoBadge({
  name,
  shortCode,
  logoPath,
  primaryColor,
  size = 56,
}: LogoBadgeProps) {
  const fallback = shortCode || name.slice(0, 3).toUpperCase();

  return (
    <div
      className="premiumLogoBadge"
      style={{
        width: size,
        height: size,
      }}
    >
      {logoPath ? (
        <Image
          src={logoPath}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="premiumLogoImage"
        />
      ) : (
        <div
          className="premiumLogoFallback"
          style={{
            background: primaryColor || '#0f172a',
          }}
        >
          {fallback}
        </div>
      )}
    </div>
  );
}
