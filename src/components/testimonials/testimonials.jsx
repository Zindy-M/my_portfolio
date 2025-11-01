import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './testimonials.css'; // Assuming you want to add some custom CSS

const testimonialsData = [
  {
    id: 1,
    name: 'John Doe',
    quote: 'This product is amazing! It has changed my life for the better.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Jane Smith',
    quote: 'Fantastic service and top-notch quality. Highly recommended!',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Sam Johnson',
    quote: 'A wonderful experience from start to finish.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: 'Emily Brown',
    quote: 'Exceptional quality and fantastic customer support.',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 5,
    name: 'Michael White',
    quote: 'I highly recommend this to all my friends and family!',
    image: 'https://via.placeholder.com/150'
  }
];

const Testimonial = ({ name, quote, image }) => (
  <div className="testimonial">
    <img src={image} alt={name} className="testimonial-image" />
    <div className="testimonial-content">
      <h3 className="testimonial-name">{name}</h3>
      <p className="testimonial-quote">{quote}</p>
    </div>
  </div>
  
);

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="testimonials">
      <h1>Testimonials</h1>
        <Slider {...settings}>
          {testimonialsData.map(({ id, name, quote, image }) => (
            <Testimonial key={id} name={name} quote={quote} image={image} />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Testimonials;
