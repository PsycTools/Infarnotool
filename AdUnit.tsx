
import React, { useEffect, useRef, useState } from 'react';

type AdType = 'header' | 'footer' | 'native' | 'sidebar';

interface AdUnitProps {
  type: AdType;
  className?: string;
}

// AD CODES
// Keys provided by user
const AD_CODES = {
  // 728x90 Header Banner
  header: `
    <script type="text/javascript">
      atOptions = {
        'key' : '244b611190cca037a6789d89d1a42103',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="//www.highperformanceformat.com/244b611190cca037a6789d89d1a42103/invoke.js"></script>
  `,
  // 320x50 (Using the provided key c343...)
  footer: `
    <script type="text/javascript">
      atOptions = {
        'key' : 'c3436add1fd2a25f18ff4d709d2a3620',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="//www.highperformanceformat.com/c3436add1fd2a25f18ff4d709d2a3620/invoke.js"></script>
  `,
  // Native Banner Script
  native: `
    <script type='text/javascript' src='//pl28139531.effectivegatecpm.com/9e/53/6c/9e536cfb1200d49d1d95086481b805a4.js'></script>
  `
};

/**
 * SafeAdFrame creates a clean iframe environment and writes the ad script into it.
 * This isolates the ad's document.write calls preventing them from wiping the main app.
 */
const SafeAdFrame: React.FC<{ html: string; width?: string | number; height?: string | number; className?: string }> = ({ html, width, height, className }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Prevent re-injecting if already loaded (React Strict Mode fix)
    if (iframe.getAttribute('data-ad-loaded') === 'true') return;

    const doc = iframe.contentWindow?.document;
    if (doc) {
      try {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <base target="_blank">
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; font-family: sans-serif; }
                /* Ensure scripts that inject divs don't break flow */
                div { max-width: 100%; }
              </style>
            </head>
            <body>${html}</body>
          </html>
        `);
        doc.close();
        iframe.setAttribute('data-ad-loaded', 'true');
      } catch (e) {
        console.error("Ad injection failed", e);
      }
    }
  }, [html]);

  return (
    <div ref={containerRef} className={`flex justify-center items-center ${className}`}>
      <iframe 
        ref={iframeRef} 
        width={width || "100%"} 
        height={height || "100%"} 
        className="border-0 overflow-hidden" 
        scrolling="no" 
        title="Advertisement"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-modals allow-presentation"
      />
    </div>
  );
};

export const AdUnit: React.FC<AdUnitProps> = ({ type, className = '' }) => {
  // Determine which code to use based on type
  const renderAd = () => {
    switch (type) {
      case 'header':
        // 728x90 Header Ad
        return <SafeAdFrame html={AD_CODES.header} width={728} height={90} className="max-w-full" />;
      
      case 'footer':
        // 320x50 Footer Ad
        return <SafeAdFrame html={AD_CODES.footer} width={320} height={50} />;
      
      case 'native':
      case 'sidebar':
        // Native ad code - usually responsive or grid based. 
        // We give it some height to render.
        return <SafeAdFrame html={AD_CODES.native} height={350} className="w-full" />;
        
      default:
        console.warn(`Unknown ad type: ${type}`);
        return null;
    }
  };

  return (
    <div className={`flex justify-center items-center my-2 ${className}`}>
        {renderAd()}
    </div>
  );
};
