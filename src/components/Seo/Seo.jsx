import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

function Seo({ title, content, link }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", content);
    document
      .querySelector('link[rel="canonical"]')
      .setAttribute("href", `https://kashem-optical.vercel.app${link}`);
  }, [content, link]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
      <link rel="canonical" href={`https://kashem-optical.vercel.app${link}`} />
    </Helmet>
  );
}

export default Seo;
