<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
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
      :keyboard="{
        enabled: true,
      }"
      :pagination="{
        clickable: true,
        // type: 'progressbar'
      }"
      class="mySwiper"
      >
        <swiper-slide>
          <figure class="slide-bgimg" style="background-image:url(https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85)">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85" class="entity-img" />
          </figure>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg" style="background-image:url(https://i.imgur.com/ZWyJYJt.jpg)">
            <img src="https://i.imgur.com/ZWyJYJt.jpg" class="entity-img" alt="goleta beach"/>
          </figure>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg" style="background-image:url(https://i.imgur.com/ZWyJYJt.jpg)"></figure>
          <img src="https://lzrmoos.com/photography/images/fulls/DSC_7380.jpg" alt="Test1" />
        </swiper-slide>
      </swiper>
    </div>
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
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.swiper-container {
  /* width:auto !important; */
  /* height:auto; */
  /* object-fit:cover; */
  /* object-position:center; */
  width:100%;
  height:100vh;
  float:left;

}
.swiper-slide {
  overflow: hidden;
  /* width:auto; */
  /* height:auto; */
}
.slide-bgimg {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-position:center;
    background-size:cover;
}
.entity-img { 
    display:none;
}

.swiper-slide img {
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-size: cover;
  background-position:center;
  width:100%;
}
.swiper-pagination-progressbar {
  background-color: rgb(158, 158, 158);
  opacity: 75%;
}
</style>
