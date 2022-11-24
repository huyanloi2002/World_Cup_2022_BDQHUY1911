import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { useEffect } from 'react';
import moment from 'moment';

const SlideButton = ({ setMatchDay, matchdays, matchDay, idMatchDefault }) => {
    const [active, setActive] = useState()

    const handleClick = (id) => {
        setMatchDay(id)
    }
    useEffect(() => {
        setActive(matchDay ? matchDay : idMatchDefault)
    }, [setActive, idMatchDefault, matchDay])
    return (
        <React.Fragment>
            <div className="slidebutton">
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    slidesPerView={8}
                    spaceBetween={0}
                    breakpoints={{
                        // when window width is <= 499px
                        250: {
                            slidesPerView: 1,
                            spaceBetweenSlides: 10
                        },
                        550: {
                            slidesPerView: 2,
                            spaceBetweenSlides: 30
                        },
                        830: {
                            slidesPerView: 3,
                            spaceBetweenSlides: 30
                        },

                        // when window width is <= 999px
                        999: {
                            slidesPerView: 4,
                            spaceBetweenSlides: 30
                        },
                        1000: {
                            slidesPerView: 5,
                            spaceBetweenSlides: 30
                        },
                        1400: {
                            slidesPerView: 8,
                            spaceBetweenSlides: 30
                        }
                    }}
                >
                    {matchdays.map(m => (
                        <SwiperSlide
                            key={m._id}
                        >
                            <span
                                onClick={() => handleClick(m._id)}
                                className={m._id === active ? "swiper-slide active" : "swiper-slide"}
                            > {`${m.name.slice(0, 1)}${m.name.slice(6, 7)} ${m.name.slice(10, 12)}
                            - ${moment(m.date).format('DD/MM')}`}
                            </span>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </React.Fragment >
    )
}

export default SlideButton