import Image, { ImageProps } from 'next/image';

interface IconifyProps extends ImageProps {
  icon: string;
}

export default function Iconify({ icon, src, alt, ...rest }: IconifyProps) {
  return <Image src={icon} alt="Iconify" width={24} height={24} {...rest} />;
}
