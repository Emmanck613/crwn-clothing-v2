import { Link } from 'react-router-dom';

import './category-preview.styles.scss'

import { ProductCard } from '../product-card/product-card.component';

export const CategoryPreview = ( { title, products } ) => {
    return (
        <div className='category-preview-container'>
            <Link className='title' to={title}>
                    {title.toUpperCase()}
            </Link>
            <div className='preview'>
                {
                    products.filter((_, index) => index < 4)
                    .map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
// _ means ignore, like ignore argument

export default CategoryPreview;