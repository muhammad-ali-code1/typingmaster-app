import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type?: "WebApplication" | "WebSite";
}

const StructuredData = ({ type = "WebApplication" }: StructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": "TypeMaster",
    "description": "Free online typing speed test and practice platform. Improve your typing speed and accuracy with timed tests and progressive practice exercises.",
    "url": "https://02c3b83d-f6f6-42dd-b79f-9b9c2bedfc1b.lovableproject.com",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "250"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
