import Image from 'next/image';

type Props = {
  name: string;
  shortCode: string;
  logoPath?: string | null;
  primaryColor?: string | null;
  size?: number;
};

export default function LogoBadge({ name, shortCode, logoPath, primaryColor = '#111827', size = 52 }: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className="logoBadge"
      aria-label={`${name} logo`}
    >
      {logoPath ? (
        <Image src={logoPath} alt={`${name} logo`} width={size} height={size} className="logoImage" />
      ) : (
        <div className="logoFallback" style={{ background: primaryColor }}>{shortCode}</div>
      )}
    </div>
  );
}
