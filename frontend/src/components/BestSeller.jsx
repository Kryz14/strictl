import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        console.log("Products:", products); // Debugging: check if products data exists
        const bestProduct = products.filter((item) => item.bestseller);
        console.log("Best Products:", bestProduct); // Debugging: check filtered products
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    // Function to format price without currency symbol
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price);
    };

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={'BEST '} text2={'SELLERS'} />
                <p className="w-3/ m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Shop the styles everyone’s raving about! Our top-selling pieces are tried, true, and perfect for elevating your wardrobe.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gay-y-6">
                {
                    bestSeller.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={formatPrice(item.price)}  // Format price here without currency symbol
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default BestSeller;
