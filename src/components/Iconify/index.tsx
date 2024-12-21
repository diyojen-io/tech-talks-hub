import Image, { ImageProps } from 'next/image';

interface IconifyProps extends Omit<ImageProps, 'src' | 'alt'> {
  icon: string;
}

export default function Iconify({ icon, ...rest }: IconifyProps) {
  return <Image src={icon} alt="Iconify" width={24} height={24} {...rest} />;
}
