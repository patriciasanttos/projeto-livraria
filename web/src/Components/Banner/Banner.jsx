import React, { useCallback, useEffect, useState } from "react";

//-- Icons and Images
import bannerOne from "../../assets/Images/BannerSection/banner-1.svg";
import bannerTwo from "../../assets/Images/BannerSection/banner-2.svg";
import next from "../../assets/Images/BannerSection/next.svg";
import prev from "../../assets/Images/BannerSection/prev.svg";

//-- Components
import "./Banner.scss";
import { useCategoriesData } from "../../hooks/useCategories";

const BannerSlider = () => {
  const { data } = useCategoriesData();

  const [index, setIndex] = React.useState(0);
  const [slides, setSlides] = useState([bannerOne, bannerTwo]);

  useEffect(() => {
    console.log(data);
    setSlides(() => data.map(category => category.banner));
  }, [data]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    showSlide();
  }, [index]);

  const showSlide = () => {
    const container = document.getElementsByClassName("banner-container")[0];
    container.style.transform = `translateX(-${index * 100}%)`;
  }
  const nextSlide = useCallback(() => {
    setIndex((prevIndex) => {
      const slides = document.querySelectorAll(".banner");
      const totalSlides = slides.length;

      return (prevIndex + 1) % totalSlides;
    });
  }, []);

  const prevSlide = useCallback(() => {
    console.log("prevSlide")
    setIndex((prevIndex) => {
      const slides = document.querySelectorAll(".banner");
      const totalSlides = slides.length;

      return (prevIndex - 1) % totalSlides;
    });
  }, []);

  return (
    <section className="banner-section">
      <button className="prev arrow" onClick={prevSlide}>
        <img src={prev} alt="Banner Anterior" />
      </button>

      <div className="banner-container">
        {slides.map((banner, index) => (
          <div key={index} className="banner banner-one">
            <img src={banner} alt={`Banner ${index}`} />
          </div>
        ))}
      </div>

      <button className="next arrow" onClick={nextSlide}>
        <img src={next} alt="Próximo Banner" />
      </button>
    </section>
  );
};

export default BannerSlider;
