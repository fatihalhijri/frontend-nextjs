"use client"

import React from 'react'
import Slide from './Slide';
import Slider from 'react-slick';
 
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
            img:"/buku3.jpg",
            title:"Summer Time",
            mainTitle:"MODERN BEACH",
            price:"$15",
        },
        {
            id:1,
            img:"/buku3.jpg",
            title:"THE BEST FOOD",
            mainTitle:"MODERN FOOD",
            price:"$20",
        },
        {
            id:2,
            img:"/buku.jpg",
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