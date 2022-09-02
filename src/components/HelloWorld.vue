<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <swiper
      :parallax="true"
      :speed="1000"
      :loop="true"
      :preload-images="false"
      :lazy="true"
      :slides-per-view="1"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: true,
      }" 
      :navigation="true"
      :modules="modules"
      :keyboard="{
        enabled: true,
      }"
      :pagination="{
        clickable: true,
        type: 'progressbar'
      }"
      class="mySwiper"
      >
        <!-- 
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(URL)">
            <img alt="goleta beach" src="URL" class="entity-img swiper-lazy" />
          </figure>
        </swiper-slide>
        -->
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330438555_3415a00ee3_o.jpg)">
            <img alt="goleta beach" src="https://live.staticflickr.com/65535/52330438555_3415a00ee3_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330287498_2ea00b5fde_o.jpg)">
            <img alt="stephen climbing" src="https://live.staticflickr.com/65535/52330287498_2ea00b5fde_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330050636_0358e37456_o.jpg)">
            <img alt="lake underwater" src="https://live.staticflickr.com/65535/52330050636_0358e37456_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330310759_798e48876e_o.jpg)">
            <img alt="co springs" src="https://live.staticflickr.com/65535/52330310759_798e48876e_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52329056137_7b679b43ce_o.jpg)">
            <img alt="neuswanstein" src="https://live.staticflickr.com/65535/52329056137_7b679b43ce_o.jpg" class="entity-img swiper-lazy" />
          </figure>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330011091_eea62ab8b4_o.jpg)">
            <img alt="natalie rock" src="https://live.staticflickr.com/65535/52330011091_eea62ab8b4_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330481470_ce41c24974_o.jpg)">
            <img alt="sworks enduro" src="https://live.staticflickr.com/65535/52330481470_ce41c24974_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330251238_482f9d3a74_o.jpg)"></figure>
          <img alt="molly paint beach" src="https://live.staticflickr.com/65535/52330251238_482f9d3a74_o.jpg" class="entity-img swiper-lazy" />
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330252843_9af3d6b127_o.jpg)"></figure>
          <img alt="milkyway" src="https://live.staticflickr.com/65535/52330252843_9af3d6b127_o.jpg" />
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52329056197_9ba3df2333_o.jpg)">
            <img alt="john fiesta" src="https://live.staticflickr.com/65535/52329056197_9ba3df2333_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330311839_3f3f126212_o.jpg)">
            <img alt="glacier np" src="https://live.staticflickr.com/65535/52330311839_3f3f126212_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330252518_d4b4c91787_o.jpg)">
            <img alt="munich" src="https://live.staticflickr.com/65535/52330252518_d4b4c91787_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://live.staticflickr.com/65535/52330311254_767fdf6916_o.jpg)">
            <img alt="arc de triomphe" src="https://live.staticflickr.com/65535/52330311254_767fdf6916_o.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
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
  background-color: rgb(234, 234, 234);
  opacity: 90%;
}
</style>
