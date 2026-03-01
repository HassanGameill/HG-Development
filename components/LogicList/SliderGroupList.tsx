"use client"
import React, { useRef, useState, useEffect, JSX } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SliderListProps<T extends Record<string, any>> = {
  records?: T[];
  renderItem: (itemData: T) => React.ReactNode;
  emptyMessage: string;
  smallNumber?: number;
  bgScreen?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SliderGroupList = <T extends Record<string, any>>({
  records = [],
  renderItem,
  smallNumber,
  bgScreen,
}: SliderListProps<T>): JSX.Element => {
  const [init, setInit] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (init) {
      setInit(false);
    }
  }, [init]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlideChange = (swiper: any) => {
    setIsAtBeginning(swiper.isBeginning);
    setIsAtEnd(swiper.isEnd);
  };

  return (
    <div
    dir="ltr"
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        slidesPerView={2}
        spaceBetween={10}
        speed={900}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          340: {
            slidesPerView: smallNumber,
            spaceBetween: 10,
          },
          440: {
            slidesPerView: smallNumber,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: smallNumber,
            spaceBetween: 16,
          },
          // Tablet (768px and up)
          768: {
            slidesPerView: smallNumber,
            spaceBetween: 16,
          },
          // Large tablet (900px and up)
          900: {
            slidesPerView: bgScreen,
            spaceBetween: 20,
          },
          // Desktop (1024px and up)
          1024: {
            slidesPerView: bgScreen,
            spaceBetween: 20,
          },
         
          
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={() => setInit(true)}
        onSlideChange={handleSlideChange}
      >
        {records.length > 0 ? (
          records.map((itemData) => (
            <SwiperSlide className="" key={itemData.slug}>{renderItem(itemData)}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div>
              thre is now category
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      <div
        className={`   md:block w-full absolute top-[40%] z-10 px-4  ${
          isHovered
            ? "opacity-100 transition-opacity duration-300 ease-in-out"
            : "opacity-70 transition-opacity duration-300 ease-in-out"
        }`}
      >
        <div
          ref={prevRef}
          className={`p-2  lg:p-3 rounded-full  ${
            isAtBeginning ? "bg-black/70 text-white" : "bg-blue-900 text-white"
          } cursor-pointer shadow-sm absolute -left-5 lg:-left-4`}
        >
          <HiChevronLeft />
        </div>
        <div
          ref={nextRef}
          className={`p-2 lg:p-3 rounded-full ${
            isAtEnd ? "bg-black/70 text-white" : "bg-blue-900 text-white"
          } cursor-pointer shadow-sm absolute -right-5  lg:-right-4`}
        >
          <HiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default SliderGroupList;
