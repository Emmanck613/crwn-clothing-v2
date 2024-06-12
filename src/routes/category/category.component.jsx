import './category.styles.scss';

import { ProductCard } from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//to access the new parameter (value) we need to import a libary
//the param is returned as an object
export const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([categoriesMap[category]]); //starting value
    
    //we only want to change the view, is when category value changes or categoryMap
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);
    
    //products && means that we will only render products if it has a value
    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products &&
                    products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </>
    );
};

export default Category;