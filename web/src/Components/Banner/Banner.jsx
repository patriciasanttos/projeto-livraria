import React from "react";

//-- Icons and Images
import bannerOne from "../../assets/Images/BannerSection/banner-1.svg"
import bannerTwo from "../../assets/Images/BannerSection/banner-2.svg"
import next from "../../assets/Images/BannerSection/next.svg"
import prev from "../../assets/Images/BannerSection/prev.svg"

//-- Components
import "./Banner.scss";

const BannerSlider = () => {
    return (
        <div className="banner-section">
            <button className="prev arrow">
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
            <button className="next arrow">
                <img src={next} alt="Próximo Banner"/>
            </button>
        </div>
    );
};

export default BannerSlider;