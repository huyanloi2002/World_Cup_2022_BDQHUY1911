import React from 'react';
import './Stadium.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

const Stadium = ({ stadiums }) => {
    return (
        <React.Fragment>
            <div className="stadium">
                <div className="title-stadium">
                    <h5>WORLD CUP QATAR 2022 STADIUM</h5>
                </div>
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper1"
                    slidesPerView={4}
                    spaceBetween={0}
                    breakpoints={{
                        // when window width is <= 499px
                        250: {
                            slidesPerView: 1,
                            spaceBetweenSlides: 10
                        },
                        800: {
                            slidesPerView: 1,
                            spaceBetweenSlides: 10
                        },
                        950: {
                            slidesPerView: 2,
                            spaceBetweenSlides: 10
                        },
                        1350: {
                            slidesPerView: 3,
                            spaceBetweenSlides: 10
                        },
                        1700: {
                            slidesPerView: 4,
                            spaceBetweenSlides: 10
                        },
                        2500: {
                            slidesPerView: 6,
                            spaceBetweenSlides: 10
                        }
                    }}

                >
                    {stadiums.map(s => (
                        <SwiperSlide
                            key={s._id}
                        >
                            <article className="cards">
                                <div className="cards__thumb">
                                    <a >
                                        <img src={s.images[0].url} alt="" />
                                    </a>
                                </div>
                                <div className="cards__body">
                                    <div className="cards__category"><a>STADIUM</a></div>
                                    <h2 className="cards__title"><a>{s.name}</a></h2>
                                    <div className="cards__description">{s.description}</div>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </React.Fragment>
    )
}

export default Stadium;