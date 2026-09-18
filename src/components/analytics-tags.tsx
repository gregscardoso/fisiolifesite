"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import type { TagsConfig } from "@/lib/site-data";

const CONSENT_STORAGE_KEY = "fisiolife_analytics_consent";

let listeners: (() => void)[] = [];
const consentStore = {
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => { listeners = listeners.filter((l) => l !== listener); };
  },
  getSnapshot() {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  },
  getServerSnapshot() {
    return null;
  },
  set(value: "accepted" | "declined") {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    listeners.forEach((listener) => listener());
  },
};

export function AnalyticsTags({ tags }: { tags: TagsConfig }) {
  const stored = useSyncExternalStore(consentStore.subscribe, consentStore.getSnapshot, consentStore.getServerSnapshot);
  const consent = !tags.consentBannerEnabled ? "accepted" : stored === "accepted" || stored === "declined" ? stored : "pending";
  const scriptsAllowed = consent === "accepted";

  return (
    <>
      {scriptsAllowed && tags.ga4Enabled && tags.ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${tags.ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${tags.ga4Id}');`}
          </Script>
        </>
      )}

      {scriptsAllowed && tags.gtmEnabled && tags.gtmId && (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tags.gtmId}');`}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${tags.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        </>
      )}

      {scriptsAllowed && tags.metaPixelEnabled && tags.metaPixelId && (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${tags.metaPixelId}');fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${tags.metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {tags.consentBannerEnabled && consent === "pending" && (
        <div className="cookie-consent-banner" role="dialog" aria-label="Consentimento de cookies">
          <p>Usamos cookies e ferramentas de medição para entender como você usa o site e melhorar sua experiência.</p>
          <div className="cookie-consent-actions">
            <button type="button" onClick={() => consentStore.set("declined")}>Recusar</button>
            <button type="button" onClick={() => consentStore.set("accepted")}>Aceitar</button>
          </div>
        </div>
      )}
    </>
  );
}
