import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
}

const SEO = ({ 
  title, 
  description, 
  keywords = "typing test, typing practice, typing speed test, improve typing speed, typing master",
  canonical,
  ogType = "website"
}: SEOProps) => {
  const baseUrl = "https://02c3b83d-f6f6-42dd-b79f-9b9c2bedfc1b.lovableproject.com";
  const fullTitle = `${title} | TypeMaster`;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
