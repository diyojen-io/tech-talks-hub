import { GithubIcon, MailIcon, WebsiteIcon } from '@/assets/icons';

type TContactUs = {
  icon: string;
  title: string;
  href: string;
};

export const contactUsData: TContactUs[] = [
  {
    icon: GithubIcon,
    title: '/diyojen-io',
    href: 'https://github.com/diyojen-io',
  },
  {
    icon: MailIcon,
    title: 'hello@diyojen.io',
    href: 'mailto:hello@diyojen.io',
  },
  {
    icon: WebsiteIcon,
    title: 'diyojen.io',
    href: 'https://diyojen.io',
  },
];
