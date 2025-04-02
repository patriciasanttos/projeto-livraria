import React from "react";

//-- Icons and Images
import bannerOne from "../../assets/Images/BannerSection/banner-1.svg"
import bannerTwo from "../../assets/Images/BannerSection/banner-2.svg"
import next from "../../assets/Images/BannerSection/next.svg"
import prev from "../../assets/Images/BannerSection/prev.svg"

//-- Components
import "./Banner.scss";

const BannerSlider = () => {
    let index = 0;
    const slides = document.querySelectorAll('.banner');
    const totalSlides = slides.length;

    function showSlide() {
        const container = document.getElementById('bannerContainer');
        container.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        index = (index + 1) % totalSlides;
        showSlide();
    }

    function prevSlide() {
        index = (index - 1 + totalSlides) % totalSlides;
        showSlide();
    }

setInterval(nextSlide, 8000);

    return (
        <div className="banner-section">
            <button className="prev arrow" onClick={prevSlide}>
                <img src={prev} alt="Banner Anterior"/>
            </button>
            <div id="bannerContainer" className="banner-container">
                <div className="banner">
                    <img src={bannerOne} alt="Banner 1"/>
                </div>
                <div className="banner">
                    <img src={bannerTwo} alt="Banner 2"/>
                </div>
            </div>
            <button className="next arrow" onClick={nextSlide}>
                <img src={next} alt="Próximo Banner"/>
            </button>
        </div>
    );
};

export default BannerSlider;