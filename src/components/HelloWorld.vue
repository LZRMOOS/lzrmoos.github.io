<template>
  <div class="swiper-container">
    <swiper
    :parallax="true"
    :speed="1000"
    :slides-per-view="1"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: true,
    }" 
    :navigation="true"
    :modules="modules"
    :calculate-height="true"
    :keyboard="{
      enabled: true,
    }"
    :pagination="{
      clickable: true,
      type: 'progressbar'
    }"
    class="mySwiper"
    >
      <swiper-slide>
        <img src="https://i.imgur.com/ZWyJYJt.jpg" alt="Test1" />
      </swiper-slide>
      <swiper-slide>
        <img src="https://lzrmoos.com/photography/images/fulls/DSC_7380.jpg" alt="Test1" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper core and required modules
import { Keyboard, Navigation, Autoplay, Pagination } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// SwiperCore.use([Navigation]);
export default {
  name: 'HelloWorld',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Keyboard, Navigation, Autoplay, Pagination],
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.swiper-container {
  width:100% !important;
  height:auto;
  object-fit:cover;
  object-position:center;
}
.swiper-slide {
  width:auto;
  height:auto;
}
.swiper-container img {
width:100%;
height:auto;
}

.swiper-pagination-progressbar {
    background-color: rgb(158, 158, 158);
    opacity: 14%;
    height: 30px;
}
</style>
