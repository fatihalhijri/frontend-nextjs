import React from 'react'
import ProductCard from './ProductCard'

const productData = [
    {
        img:"/nipis_bg.png",
        title:"Jeruk Nipis",
        desc:"Jeruk nipis ajjjjjjjjjjjjj",
        rating:4,
        price:"45.000",
    },
    {
        id:1,
        img:"/nipis_bg.png",
        title:"Cabai",
        desc:"Cabai Ajajaa",
        rating:5,
        price:"10.000",
    },
    {
        img:"/nipis_bg.png",
        title:"Jeruk Nipis",
        desc:"Jeruk nipis ajjjjjjjjjjjjj",
        rating:3,
        price:"30.000",
    },
    {
        id:1,
        img:"/nipis_bg.png",
        title:"Cabai",
        desc:"Cabai Ajajaa",
        rating:2,
        price:"15.000",
    },
    {
        img:"/nipis_bg.png",
        title:"Jeruk Nipis",
        desc:"Jeruk nipis ajjjjjjjjjjjjj",
        rating:3,
        price:"30.000",
    },
    {
        id:1,
        img:"/nipis_bg.png",
        title:"Cabai",
        desc:"Cabai Ajajaa",
        rating:2,
        price:"15.000",
    },
    {
        img:"/nipis_bg.png",
        title:"Jeruk Nipis",
        desc:"Jeruk nipis ajjjjjjjjjjjjj",
        rating:3,
        price:"30.000",
    },
    {
        id:1,
        img:"/nipis_bg.png",
        title:"Cabai",
        desc:"Cabai Ajajaa",
        rating:2,
        price:"15.000",
    },
    
    
]

const NewProducts = () => {
  return (
    <div>
        <div className="container pt-16">
            <h2 className="font-medium text-2xl pb-4 ">
            New Product
            </h2>

            <div className="grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10  xl:gap-x-20 xl:gap-y-10 ">
            {productData.map((item, index) => (
                <ProductCard
                key={index}
                img={item.img}
                title={item.title}
                desc={item.desc}
                rating={item.rating}
                price={item.price}
                />
            ) )}

            </div>
        </div>
    </div>
  )
}

export default NewProducts