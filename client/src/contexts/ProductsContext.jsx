import { createContext, useState } from "react";

export const ProductsContext = createContext();
ProductsContext.displayName = 'ProductsContext';

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);

    function setProductsHandler(products) {
        setProducts(products);
    }

    const values = {
        products,
        setProductsHandler
    };

    return (
        <ProductsContext.Provider value={values} >
            {children}
        </ProductsContext.Provider>
    );
}