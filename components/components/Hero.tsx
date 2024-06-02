"use client"

import React from 'react'
import Slider from 'react-slick';
import Slide from './Slide';
 
const Hero = () => {

    var settings = {
        dots:true,
        infinite: true,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
        pauseOnHover:false,
    };

    const slideData = [
        {
            id:0,
            img:"/beach1.jpg",
            title:"Summer Time",
            mainTitle:"MODERN BEACH",
            price:"$15",
        },
        {
            id:1,
            img:"/makanan1.jpg",
            title:"THE BEST FOOD",
            mainTitle:"MODERN FOOD",
            price:"$20",
        },
        {
            id:2,
            img:"/mointain1.jpg",
            title:"Summer Time",
            mainTitle:"MODERN MOUNTAIN",
            price:"$25",
        },
        
    ]

  return (
    <div>
        <div className="container pt-6 lg:pt-0">
            <Slider {...settings}>{slideData.map((item) => 
            <Slide 
            key={item.id}
            img={item.img}
            title={item.title}
            mainTitle={item.mainTitle}
            price={item.price}
            />
             )}
              </Slider>
        </div>
    </div>
  )
}

export default Hero;