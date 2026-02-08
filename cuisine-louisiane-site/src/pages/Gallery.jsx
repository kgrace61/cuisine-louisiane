import React from "react";
import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import gallery1 from "../assets/gallery/gallery1.png";
import gallery2 from "../assets/gallery/gallery2.png";
import gallery3 from "../assets/gallery/gallery3.png";
import gallery4 from "../assets/gallery/gallery4.png";
import gallery5 from "../assets/gallery/gallery5.png";
import gallery6 from "../assets/gallery/gallery6.png";
import gallery7 from "../assets/gallery/gallery7.png";
import gallery8 from "../assets/gallery/gallery8.png";
import gallery9 from "../assets/gallery/gallery9.png";
import gallery10 from "../assets/gallery/gallery10.png";
import gallery12 from "../assets/gallery/gallery12.png";
import gallery13 from "../assets/gallery/gallery13.png";
import gallery14 from "../assets/gallery/gallery14.png";
import gallery15 from "../assets/gallery/gallery15.png";
import gallery16 from "../assets/gallery/gallery16.png";
import gallery17 from "../assets/gallery/gallery17.png";
import gallery18 from "../assets/gallery/gallery18.png";
import gallery19 from "../assets/gallery/gallery19.png";
import gallery20 from "../assets/gallery/gallery20.png";
import gallery21 from "../assets/gallery/gallery21.png";
import gallery22 from "../assets/gallery/gallery22.png";
import gallery23 from "../assets/gallery/gallery23.png";
import gallery24 from "../assets/gallery/gallery24.png";
import gallery25 from "../assets/gallery/gallery25.png";
import gallery26 from "../assets/gallery/gallery26.png";
import gallery27 from "../assets/gallery/gallery27.png";
import gallery28 from "../assets/gallery/gallery28.png";
import gallery29 from "../assets/gallery/gallery29.png";
import gallery30 from "../assets/gallery/gallery30.png";
import gallery31 from "../assets/gallery/gallery31.png";
import gallery32 from "../assets/gallery/gallery32.png";
import gallery33 from "../assets/gallery/gallery33.png";

const images = [
  gallery1, gallery25, gallery12, gallery32, gallery7, gallery33, gallery26,
  gallery3, gallery28, gallery4, gallery29, gallery5, gallery6, gallery8,
  gallery9, gallery10, gallery13, gallery15, gallery14, gallery16, gallery17,
  gallery18, gallery19, gallery21, gallery22, gallery23, gallery24, gallery27,
  gallery30, gallery31,
];

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

function Gallery() {
  return (
    <div className="px-4 md:px-10 lg:px-[2in] py-8">
      <h1 className="text-center text-4xl md:text-5xl font-semibold font-pinyon text-maroon">
        
      </h1>
      <p className="text-center font-julius text-base md:text-lg mt-3 mb-8">
        
      </p>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-3 md:-ml-4"
        columnClassName="pl-3 md:pl-4 bg-clip-padding"
      >
        {images.map((image, index) => (
          <div key={index} className="mb-3 md:mb-4">
            <LazyLoadImage
              src={image}
              alt={`Gallery image ${index + 1}`}
              effect="blur"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default Gallery;