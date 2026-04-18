import React from "react";

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  keywords?: string[];
  sameAs?: string[]; // social profile links
};

export const Seo: React.FC<Props> = ({ title, description, canonical, image, keywords, sameAs }) => {
  const siteName = "M. Mahimmiraj";
  const pageTitle = title ? `${title} — ${siteName}` : siteName;
  const pageDesc = description ||
    "Portfolio of M. Mahimmiraj - Robotic Enthusiast and Environmental Advocate from Bangladesh. Building technologies that matter.";
  const url = canonical || (typeof window !== "undefined" ? window.location.href : "https://www.mahim.live/");
  const img = image || "/images/tagwraps-logo-dark.png";
  const kw = (keywords && keywords.length) ? keywords.join(', ') : 'robotics, IoT, environmental robotics, projects, portfolio, Bangladesh';

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.mahim.live/#website",
        "url": "https://www.mahim.live/",
        "name": siteName,
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.mahim.live/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.mahim.live/#person",
        "name": "Mirajul Islam (Mahim)",
        "url": "https://www.mahim.live/",
        "sameAs": sameAs || [],
        "jobTitle": "Roboticist & Environmental Technologist",
        "description": "Creator of robotics and IoT projects focused on environmental sensing and community impact."
      }
    ]
  };

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={kw} />
      <link rel="canonical" href={canonical || url} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={canonical || url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={img} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={img} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
};

export default Seo;
