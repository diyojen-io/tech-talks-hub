import { GithubIcon, MailIcon, WebsiteIcon } from '@/assets/icons';
import Logo from '@/assets/logos/logo.png';
import BaseButton from '@/components/BaseButton';
import Iconify from '@/components/Iconify';
import Image from 'next/image';
import './index.scss';

export default function Footer() {
  return (
    <>
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
              <div className="footer-contact-item">
                <Iconify icon={GithubIcon} />
                <a
                  href="https://github.com/diyojen-io"
                  target="_blank"
                  rel="noreferrer"
                >
                  /diyojen-io
                </a>
              </div>
              <div className="footer-contact-item">
                <Iconify icon={MailIcon} />
                <a
                  href="mailto:hello@diyojen.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  hello@diyojen.io
                </a>
              </div>
              <div className="footer-contact-item">
                <Iconify icon={WebsiteIcon} />
                <a href="https://diyojen.io" target="_blank" rel="noreferrer">
                  diyojen.io
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-secondary">
          <Image src={Logo} alt="Diyojen io" width={24} height={24} />

          <p>
            2024 ©{' '}
            <a
              href="https://github.com/diyojen-io"
              target="_blank"
              rel="noreferrer"
            >
              Diyojen
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
