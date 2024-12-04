'use client';
import Logo from '@/assets/logos/logo.png';
import BaseButton from '@/components/BaseButton';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import './index.scss';

const SOCIALS = [
  {
    label: '/diyojen-io',
    link: 'https://github.com/diyojen-io',
    icon: 'mdi:github',
  },
  {
    label: 'hello@diyojen.io',
    link: 'mailto:hello@diyojen.io',
    icon: 'material-symbols:mail',
  },
  {
    label: 'diyojen.io',
    link: 'https://diyojen.io',
    icon: 'dashicons:admin-site-alt3',
  },
];

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-primary">
        <div className="footer-newsletter">
          <h3>Newsletter</h3>
          <input type="text" placeholder="Type your email address" />
          <BaseButton variant="primary" size="large" label="Subscribe" />
        </div>
        <div className="footer-contact-us">
          <h3>Contact us</h3>
          <div className="footer-contact-items">
            {SOCIALS.map((social, index) => (
              <div key={index} className="footer-contact-item">
                <Link href={social.link} target="_blank" rel="noreferrer">
                  <Icon icon={social.icon} width={24} height={24} />
                  {social.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-secondary">
        <Image src={Logo} alt="diyojen-logo" width={24} height={24} />
        <p>
          2024 ©{' '}
          <Link href="https://diyojen.io" target="_blank" rel="noreferrer">
            Diyojen
          </Link>
          . All rights reserved.
        </p>
      </div>
    </div>
  );
}
