import { Link } from "react-router-dom";

function Category({ category }) {
    return (
        <Link to={`/product/${category?.name}`}>
            <div
                className="bg-cover bg-no-repeat  object-cover  p-4 bg-black/60 bg-blend-overlay text-white rounded-md"
                style={{ backgroundImage: `url('${category?.image}')` }}
            >
                <h2 className="text-2xl font-semibold">{category?.name}</h2>
                <p className="text-white/60 pt-2">Product : 12</p>
            </div>
        </Link>
    );
}

export default Category;
