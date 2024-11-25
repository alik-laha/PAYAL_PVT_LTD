import { Key, useState } from "react";

const Carousel = (props: { slides: any[]; }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    if (currentIndex === props.slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(props.slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
//   useEffect(() => {
//     const interval = setTimeout(() => {
//       goToNextSlide();
//     }, 5000);
//     return () => clearTimeout(interval);
//   }, [currentIndex]);

  const renderSlide = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {
          props.slides.map((item: any, index: Key | null | undefined) => (
            <img
              key={index}
              src={`/api/cleaning/view?filename=${item}`}
              alt="Gallery"
              style={{ display: index === currentIndex ? "block" : "none" }}
            />
          ))
        }
         {/* <span style={{fontFamily:'initial'}}>{props.Texts[currentIndex]}</span> */}
      </div>
    );
  };

  return (
    <div>
      <div className="carousel-container">{renderSlide()}</div>

      <div className="button-gallery-all">
        <button className="prev-button" onClick={goToPrevSlide}>
          &#8249;&#8249;Prev
        </button>
        <button className="next-button" onClick={goToNextSlide}>
          Next&#8250;&#8250;
        </button>
      </div>
    </div>
  );
};
export default Carousel;