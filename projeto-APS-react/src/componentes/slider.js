import React from "react";
import { Slide } from "react-slideshow-image";

const slideImages = [
  "https://collegeinfogeek.com/wp-content/uploads/2018/11/Essential-Books.jpg",
  "https://miro.medium.com/max/2048/1*YLlZ96J3p8GFkIh1USVMzg.jpeg",
  "https://video-images.vice.com/articles/5d44c9622980b0000824a7e3/lede/1564789576071-GettyImages-949118068.jpeg",
  "http://www.charlottenewsvt.org/wp-content/uploads/2018/03/books.jpg"
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
};

export const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide {...properties}>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[0]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[1]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[2]})` }}></div>
        </div>
        <div className="each-slide">
          <div style={{ backgroundImage: `url(${slideImages[3]})` }}></div>
        </div>
      </Slide>
    </div>
  );
};

export default Slideshow;
