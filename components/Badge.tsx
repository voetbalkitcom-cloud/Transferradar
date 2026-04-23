type Props = {
  children: React.ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'dark';
};

export default function Badge({ children, tone = 'neutral' }: Props) {
  return <span className={`premiumBadge premiumBadge-${tone}`}>{children}</span>;
}
