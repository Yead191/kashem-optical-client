import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

function Seo({ title }) {
    useEffect(() => {
        document.title = title;
    }, [title]); 

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
}

export default Seo;
