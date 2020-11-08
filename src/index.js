import slick from "slick-carousel";
import $ from "jquery";

import "./index.scss";

setTimeout(() => {
  $(".carousel").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    arrows: false,
  });
}, 300);
