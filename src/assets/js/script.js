//js for marquee slide
const foodLandSlide = () => {
  $(".ultimate-marquee-slide").slick({
    speed: 7800,
    autoplay: true,
    autoplaySpeed: 0,
    centerMode: true,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: true,
    initialSlide: 1,
    arrows: false,
    buttons: false,
  });
};
