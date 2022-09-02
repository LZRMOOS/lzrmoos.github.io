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
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc939bba5012543b15b37a45560c.dl.dropboxusercontent.com/cd/0/inline/BsK0c5Qhop95Pqa8UJdizLpwq5UxIdH6JpLB5vRpEdcLRnLnjlDWTQkbsX469gY-APEMbYxJoTbOAuez312UDBcJM23K9M0E1gsoMsR1xv-TdsEj_eC67VHpPfFCi0r7rbcIVdGKWkBJJ5LY_SOxT3JtBfQ2JEaMMvdjPiJ4olyltw/file#)">
            <img alt="neuswanstein" src="https://uc939bba5012543b15b37a45560c.dl.dropboxusercontent.com/cd/0/inline/BsK0c5Qhop95Pqa8UJdizLpwq5UxIdH6JpLB5vRpEdcLRnLnjlDWTQkbsX469gY-APEMbYxJoTbOAuez312UDBcJM23K9M0E1gsoMsR1xv-TdsEj_eC67VHpPfFCi0r7rbcIVdGKWkBJJ5LY_SOxT3JtBfQ2JEaMMvdjPiJ4olyltw/file#" class="entity-img swiper-lazy" />
          </figure>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc9cdd606062494d9436acf7da95.dl.dropboxusercontent.com/cd/0/inline/BsLBYrTjYYW0mMHG2je6tUXcCaLMCq6GtcxKo8-zVk2mJqhLjyGz7uG8Hzz7pgU3ahUS7_SQbF4-Rg8QeckZELa7ufiPsKJxzBBhi_KLEhPsxQOfAB0Wwp6I_niSY4mgzzgNK6pr5xnhRgX0x9lKG442_oCCEW6eeVJOVyeMTgwmJw/file#)">
            <img alt="co springs" src="https://uc9cdd606062494d9436acf7da95.dl.dropboxusercontent.com/cd/0/inline/BsLBYrTjYYW0mMHG2je6tUXcCaLMCq6GtcxKo8-zVk2mJqhLjyGz7uG8Hzz7pgU3ahUS7_SQbF4-Rg8QeckZELa7ufiPsKJxzBBhi_KLEhPsxQOfAB0Wwp6I_niSY4mgzzgNK6pr5xnhRgX0x9lKG442_oCCEW6eeVJOVyeMTgwmJw/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://ucf1bed704d327b17c5dda247970.dl.dropboxusercontent.com/cd/0/inline/BsK1S3ojiecndXxnedBjO-jpO7H9sjts33sR3cYuTDyALMFrSPyK88SB9GzwOMuXlB5zqISY_AMiyOIdn-DQ6fs5c87Bck4h2icv45SFBeQhkgl1MqKYHGgm7TWHj0racW4buRVNf0BgE6SrQHWoWgaRnmloi5jTerhgMKgkU5yyHw/file#)">
            <img alt="munich" src="https://ucf1bed704d327b17c5dda247970.dl.dropboxusercontent.com/cd/0/inline/BsK1S3ojiecndXxnedBjO-jpO7H9sjts33sR3cYuTDyALMFrSPyK88SB9GzwOMuXlB5zqISY_AMiyOIdn-DQ6fs5c87Bck4h2icv45SFBeQhkgl1MqKYHGgm7TWHj0racW4buRVNf0BgE6SrQHWoWgaRnmloi5jTerhgMKgkU5yyHw/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://i.imgur.com/ZWyJYJt.jpg)">
            <img alt="goleta beach" src="https://i.imgur.com/ZWyJYJt.jpg" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc3c2a4c4573bfbb32330bdab6c0.dl.dropboxusercontent.com/cd/0/inline/BsKIrtRkaIKzz3Hf6h4YE6pDhR2dh2O2oNc3duIVEaog3MHybLhisauQUQw1Zi1LFa5k5rvfBNDAl6BocDPObn5wPylXFUM5_pQvXoKIN0x3VHUHhgzQimzAMwjcuFe9i_CLfpP8aZb51ubhgaB5fBRkI9KfnVGPAVOnLPoVbKsGHg/file#)">
            <img alt="natalie rock" src="https://uc3c2a4c4573bfbb32330bdab6c0.dl.dropboxusercontent.com/cd/0/inline/BsKIrtRkaIKzz3Hf6h4YE6pDhR2dh2O2oNc3duIVEaog3MHybLhisauQUQw1Zi1LFa5k5rvfBNDAl6BocDPObn5wPylXFUM5_pQvXoKIN0x3VHUHhgzQimzAMwjcuFe9i_CLfpP8aZb51ubhgaB5fBRkI9KfnVGPAVOnLPoVbKsGHg/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://ucb542fb38392634ec5f70fc271e.dl.dropboxusercontent.com/cd/0/inline/BsIuqvfqRIQad92TNX7e98k-PvfmTXFDkXP4XPiy6iMrB069bw5TJG9blZCEQrMxsKNVF9XtqoLurjtXzZlvOf77KuffHUpeSE-AyvTG3D7BrJs1LMuB5Zn6yAPYDQ8eEBhQntV58jiubIIJOVH1CVjfCjLyG_6q6zdO2rpcv79E_A/file#)">
            <img alt="stephen climbing" src="https://ucb542fb38392634ec5f70fc271e.dl.dropboxusercontent.com/cd/0/inline/BsIuqvfqRIQad92TNX7e98k-PvfmTXFDkXP4XPiy6iMrB069bw5TJG9blZCEQrMxsKNVF9XtqoLurjtXzZlvOf77KuffHUpeSE-AyvTG3D7BrJs1LMuB5Zn6yAPYDQ8eEBhQntV58jiubIIJOVH1CVjfCjLyG_6q6zdO2rpcv79E_A/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uca5dcbaaa3b8f647c8b99c233e5.dl.dropboxusercontent.com/cd/0/inline/BsIdpIO3XFiiOHwQ0rsLeCl8PX9vTcNcYb9GkO0YTfXffUisHYgGi5PNwqFvL1aLM9IKR89B-0Xj5gNRm_akMenDiOF3RZ_68J-4d5Y20_U_2Yoo7ZhiVp8TDUBHb-UU5YwvFnxcGgF02KhViHZGlMBgvqw5RZksCDKgpR2rXWWA_g/file#)"></figure>
          <img alt="molly paint beach" src="https://uca5dcbaaa3b8f647c8b99c233e5.dl.dropboxusercontent.com/cd/0/inline/BsIdpIO3XFiiOHwQ0rsLeCl8PX9vTcNcYb9GkO0YTfXffUisHYgGi5PNwqFvL1aLM9IKR89B-0Xj5gNRm_akMenDiOF3RZ_68J-4d5Y20_U_2Yoo7ZhiVp8TDUBHb-UU5YwvFnxcGgF02KhViHZGlMBgvqw5RZksCDKgpR2rXWWA_g/file#" class="entity-img swiper-lazy" />
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc9c03b71cac52f7029145efe127.dl.dropboxusercontent.com/cd/0/inline/BsIyaan18WOo7TlMAfE-5KTwvViAgzqH-_5ojCCW9AD8wEv1ph0x9F8XKIbAx0rQHDjl0GQ3-LKYybPuOkqrFYUeIhPuUGgqUz-xt8Rdb2TtmqIJRzRMQS--RyDZ0X_qqx3pCMI7EwyfUYo16hLeH2_NWdXWFNLdNDEll6b36k1pUw/file#)">
            <img alt="horseshoe bend" src="https://uc9c03b71cac52f7029145efe127.dl.dropboxusercontent.com/cd/0/inline/BsIyaan18WOo7TlMAfE-5KTwvViAgzqH-_5ojCCW9AD8wEv1ph0x9F8XKIbAx0rQHDjl0GQ3-LKYybPuOkqrFYUeIhPuUGgqUz-xt8Rdb2TtmqIJRzRMQS--RyDZ0X_qqx3pCMI7EwyfUYo16hLeH2_NWdXWFNLdNDEll6b36k1pUw/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc3772d64c524f4eaffab519d731.dl.dropboxusercontent.com/cd/0/inline/BsLf6xiqr0v4gNwSbPrfA9S_rUECIod8qMgvo2eVkEkJb-cBtHx_lWFclcjPv4eNn_GsHjehiqBI9J2IoOfzmLB_hW0ba0Jb6438ToR4lenl3mahRdRgRgerPR7gmMJKPKWuP6RSx_2rH0aYZOirl_yaYh11DhfYAIxMjbv-bwY6_A/file#)"></figure>
          <img alt="milkyway" src="https://uc3772d64c524f4eaffab519d731.dl.dropboxusercontent.com/cd/0/inline/BsLf6xiqr0v4gNwSbPrfA9S_rUECIod8qMgvo2eVkEkJb-cBtHx_lWFclcjPv4eNn_GsHjehiqBI9J2IoOfzmLB_hW0ba0Jb6438ToR4lenl3mahRdRgRgerPR7gmMJKPKWuP6RSx_2rH0aYZOirl_yaYh11DhfYAIxMjbv-bwY6_A/file#" />
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc53e6bc8a77e989f38c97eb1a99.dl.dropboxusercontent.com/cd/0/inline/BsLodHE31-dKYKjoJnSaXCfihjy5jN-0ek7Q-Ulc1_UJ9utlxbeUGAsWjj8rOlkL0cjtKMbKM1LT2HCmD1_yKfzddzpsmSdfGvPXMTt41NF20XYHWiaR3eseO0hIfbC-_8bLjxXFFFbeGiY1HaToectu8TTq4O2pYsQ3rGYZ4SB5aQ/file#)">
            <img alt="john fiesta" src="https://uc53e6bc8a77e989f38c97eb1a99.dl.dropboxusercontent.com/cd/0/inline/BsLodHE31-dKYKjoJnSaXCfihjy5jN-0ek7Q-Ulc1_UJ9utlxbeUGAsWjj8rOlkL0cjtKMbKM1LT2HCmD1_yKfzddzpsmSdfGvPXMTt41NF20XYHWiaR3eseO0hIfbC-_8bLjxXFFFbeGiY1HaToectu8TTq4O2pYsQ3rGYZ4SB5aQ/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc743aafbbdf6b6610bdd5526eeb.dl.dropboxusercontent.com/cd/0/inline/BsImW7JpvFyTZIMTu-QANh3_WKrQkw8LGN7Td6CHF8OxJ1bdUXBFeDSwMuZT4bicF_Ybn-igx9wCyiRJmBIQX0cSvekPUVn75QgwgUbpBRQcpgbds2Nyp_aWlzjwB4zLC_qCBm563psyRMkfbxHwuLSqs3mN5lEiMbizLnN9nC_5bw/file#)">
            <img alt="sworks enduro" src="https://uc743aafbbdf6b6610bdd5526eeb.dl.dropboxusercontent.com/cd/0/inline/BsImW7JpvFyTZIMTu-QANh3_WKrQkw8LGN7Td6CHF8OxJ1bdUXBFeDSwMuZT4bicF_Ybn-igx9wCyiRJmBIQX0cSvekPUVn75QgwgUbpBRQcpgbds2Nyp_aWlzjwB4zLC_qCBm563psyRMkfbxHwuLSqs3mN5lEiMbizLnN9nC_5bw/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc9a5de165b1133c05edce1853ba.dl.dropboxusercontent.com/cd/0/inline/BsJ_vWVKJwaWnF3C5q-nifQQCjnn4-FAQInJnwY3BAcI1ARBC8FNGPXCM0XRoAi2e07J6OLzDQPRIAdnSd7P6f7e5uWekXkQBK40dWeQCevliuZtVz_TXRvlgNqYQnNO68Ji-lJlE1HUgnmI8nTGRn8gxTCtWZMqgyk_LKQhdlXrHg/file#)">
            <img alt="lake underwater" src="https://uc9a5de165b1133c05edce1853ba.dl.dropboxusercontent.com/cd/0/inline/BsJ_vWVKJwaWnF3C5q-nifQQCjnn4-FAQInJnwY3BAcI1ARBC8FNGPXCM0XRoAi2e07J6OLzDQPRIAdnSd7P6f7e5uWekXkQBK40dWeQCevliuZtVz_TXRvlgNqYQnNO68Ji-lJlE1HUgnmI8nTGRn8gxTCtWZMqgyk_LKQhdlXrHg/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc37f8e28c0c6cf6f7f18b9db40d.dl.dropboxusercontent.com/cd/0/inline/BsKf9xsCcsjk7VnZJVuwCTQdtCIS50ylEYoivAs0gSi4fYe1zVEqV0Ik-cLhbgGD9-qHHZ0temkjRfO75YdaYGtCLdyGWljaANSu1EqZKWEOel-_7r3ZeyYEdg9TOC4zj98nRjEhLMo3s30rr7bUBwKYN0_MWJZyNqRPAtj1GfhRsw/file#)">
            <img alt="berlin wall" src="https://uc37f8e28c0c6cf6f7f18b9db40d.dl.dropboxusercontent.com/cd/0/inline/BsKf9xsCcsjk7VnZJVuwCTQdtCIS50ylEYoivAs0gSi4fYe1zVEqV0Ik-cLhbgGD9-qHHZ0temkjRfO75YdaYGtCLdyGWljaANSu1EqZKWEOel-_7r3ZeyYEdg9TOC4zj98nRjEhLMo3s30rr7bUBwKYN0_MWJZyNqRPAtj1GfhRsw/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://ucc9752f731a3a7b74f47ac7eaa6.dl.dropboxusercontent.com/cd/0/inline/BsJNvo45wswecyW2vaZR7vyM3_euA98gGZmSbbDtVPQWJDqlP_Gk6Vu7gF8EO9Sc82eKGjhCKiiYccis5SkvkZKnF_kzyFxK80iaQchyQRbpblAsvFsnJ5VPHYGnXHF4BY-x3uBOi9_KSSOI64-YOWsav4gpj7wVVz_1n_ExktOQiQ/file#)">
            <img alt="glacier np" src="https://ucc9752f731a3a7b74f47ac7eaa6.dl.dropboxusercontent.com/cd/0/inline/BsJNvo45wswecyW2vaZR7vyM3_euA98gGZmSbbDtVPQWJDqlP_Gk6Vu7gF8EO9Sc82eKGjhCKiiYccis5SkvkZKnF_kzyFxK80iaQchyQRbpblAsvFsnJ5VPHYGnXHF4BY-x3uBOi9_KSSOI64-YOWsav4gpj7wVVz_1n_ExktOQiQ/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://uc106de4b11b32df785f7c1396a2.dl.dropboxusercontent.com/cd/0/inline/BsJQTIP8QhxwSdP8NNv0k63DjLd4MHluIMa8dvNyZK2W1y5_w0dBYGBZz7PfoHRL1JTauSUYuorgzkRyRqw372XjpGFegSg61g6KKpUrvw0LxqrXknzha_4TTMt26ghWV3q2sk90b30qssqo0UTe1oZi1aPZGdJmxkgjfgMfVtlJYA/file#)">
            <img alt="interlaken selfie" src="https://uc106de4b11b32df785f7c1396a2.dl.dropboxusercontent.com/cd/0/inline/BsJQTIP8QhxwSdP8NNv0k63DjLd4MHluIMa8dvNyZK2W1y5_w0dBYGBZz7PfoHRL1JTauSUYuorgzkRyRqw372XjpGFegSg61g6KKpUrvw0LxqrXknzha_4TTMt26ghWV3q2sk90b30qssqo0UTe1oZi1aPZGdJmxkgjfgMfVtlJYA/file#" class="entity-img swiper-lazy" />
          </figure>
          <div class="swiper-lazy-preloader"></div>
        </swiper-slide>
        <swiper-slide>
          <figure class="slide-bgimg swiper-lazy" style="background-image:url(https://ucda7cedf67b5bbafc00516ed5bc.dl.dropboxusercontent.com/cd/0/inline/BsLSTXPHDpnvJSCCsUvNwUy-TaSN3ZqJEUGzV1pyTIWxTvoIOcFW273OTTaGahzhP0H-XLqm7dhdp71bNpZBwjDyLPfRWAjRHrkUNqo5J5QoMPJ810XJr2t8JTDJoJaSPrJATigXXmUjPxJzcUC2_b1gVX9P7vhchgg0osav8jTZ6g/file#)">
            <img alt="arc de triomphe" src="https://ucda7cedf67b5bbafc00516ed5bc.dl.dropboxusercontent.com/cd/0/inline/BsLSTXPHDpnvJSCCsUvNwUy-TaSN3ZqJEUGzV1pyTIWxTvoIOcFW273OTTaGahzhP0H-XLqm7dhdp71bNpZBwjDyLPfRWAjRHrkUNqo5J5QoMPJ810XJr2t8JTDJoJaSPrJATigXXmUjPxJzcUC2_b1gVX9P7vhchgg0osav8jTZ6g/file#" class="entity-img swiper-lazy" />
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
