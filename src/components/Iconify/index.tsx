import Image, { ImageProps } from 'next/image';

interface IconifyProps {
  icon: string;
  other?: ImageProps;
}

export default function Iconify({ icon, ...other }: IconifyProps) {
  return <Image src={icon} alt="Iconify" width={24} height={24} {...other} />;
}
