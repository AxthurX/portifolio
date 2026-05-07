"use client";

import Script from "next/script";

/**
 * Google Analytics 4 + Meta Pixel (optional)
 * GA_ID is read from env: NEXT_PUBLIC_GA_ID
 * META_PIXEL_ID is read from env: NEXT_PUBLIC_META_PIXEL_ID
 *
 * To activate:
 *   Add NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX to your .env.local (or Vercel env vars)
 *   Add NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX (optional)
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      {/* ——— Google Analytics 4 ——— */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>

      {/* ——— Custom Event: Contact Form Submit ——— */}
      <Script id="whys-events" strategy="afterInteractive">
        {`
          document.addEventListener('DOMContentLoaded', function() {
            var form = document.querySelector('#contato form');
            if (form) {
              form.addEventListener('submit', function() {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'generate_lead', {
                    event_category: 'Contact',
                    event_label: 'Contact Form Submit',
                  });
                }
              });
            }
          });
        `}
      </Script>

      {/* ——— Meta Pixel (optional) ——— */}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
