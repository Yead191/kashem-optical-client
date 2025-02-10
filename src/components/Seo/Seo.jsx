import { Helmet } from "react-helmet-async";

function Seo({ title }) {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
}

export default Seo;
