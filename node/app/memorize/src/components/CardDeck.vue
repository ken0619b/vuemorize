<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <!-- ***** ここから繰り返す ***** -->
        <v-flex xs12 v-for="(card,index) in cardData" :key="index">
          <v-card color="blue-grey darken-2 flip-card" class="white--text">
            <v-card-title primary-title>
              <div class="flip-card-inner">
                <div class="headline flip-card-front">{{card.mondai}}</div>
                <div class="headline flip-card-back">{{card.kotae}}</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <!-- ***** ここから繰り返す ***** -->
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import store from "@/store/index.js";
import { mapGetters } from "vuex";

export default {
  props: ["cardData"],
  data() {
    return {
      index: 0
    };
  },
  methods: {
    nextCard() {
      this.index =
        this.index >= this.cardData.length - 1
          ? this.cardData.length - 1
          : this.index + 1;

      console.log(`Index:${this.index}`);
    },
    previousCard() {
      this.index = this.index == 0 ? 0 : this.index - 1;
      console.log(`Index:${this.index}`);
    }
  }
};
</script>

<style>
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  /* width: 300px;
  height: 200px; */
  /* border: 1px solid #f1f1f1; */
  perspective: 2000px; /* Remove this if you don't want the 3D effect */
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  /* height: 100%; */
  height: 100px;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  align-items: center;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  width: 100%;
  height: 100%;
  /* background-color: #bbb;
  color: black; */
}

/* Style the back side */
.flip-card-back {
  width: 100%;
  height: 100%;
  /* background-color: dodgerblue;
  color: white; */
  transform: rotateY(180deg);
}
</style>
