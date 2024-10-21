import { useContext, Fragment } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import CategoryPreview from '../../components/category-preview/category-preview.component';

export const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    //we are iterating over a map structure
    return (
        //<> shorthand for fragment
        <Fragment>
            {//returns an array of key values (hats, jackets,etc), I will have the title of the keys
            Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products} />
                  );
            })} 
        </Fragment>
      //products is the array asociated to the title
    );
};

export default CategoriesPreview;