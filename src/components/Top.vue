<template>
  <div class="title-container">
    <h1>{{ glitchedMessage }}</h1>
    <p>
      Whenever a big financial crisis or a bubble happened, smart money always
      got out before it burst, while retail investors and the average Joe was
      left holding the bag. What do you think will happen when the next bubble
      pops? The truth is that they don't give a shit about you or anyone else.
      Fuck them - and unfuck yourself, anon.
    </p>
    <div class="btn-container">
      <button @click="handleBtnClick" class="member-btn">{{isMember ? 'Enter app' : 'Become a member'}}</button>
    </div>
  </div>
</template>

<script>
import Ethers from '@/services/ethers';
import Api from '@/services/api';
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Top",
  data() {
    return {
      charSet:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_[]}≠{&£$@ę€ń•©Żąß∂ń;–Ķ~Ņ^€$]}",
      originalMessage: "!f@ck GPT",
      glitchedMessage: "!f@ck GPT",
      limit: 0,
      isMember: false,
      ethers: Object,
    };
  },
  async mounted() {
    this.startDistortion();
    let _this = this;
    setTimeout(() => {
      _this.stopDistortion();
    }, 2200);

    const ethers = new Ethers();
    await ethers.connect();

    const api = new Api();

    const memberRes = await api.isMember(ethers.address);
    this.isMember = memberRes.data.is_member;
  },
  methods: {
    startDistortion: function () {
      window.ids = setInterval(() => {
        this.distortion();
      }, 50);
    },
    stopDistortion: function () {
      clearInterval(window.ids);
      this.glitchedMessage = this.originalMessage;
    },
    distortion: function () {
      if (this.limit >= 3) {
        this.limit = 0;
        this.glitchedMessage = this.originalMessage;
      }
      const chars = this.glitchedMessage.split("");
      const rand = Math.floor(Math.random() * chars.length);
      const randRep = Math.floor(Math.random() * this.charSet.length);
      if (chars[rand] != this.charSet[randRep] && chars[rand] != " ") {
        chars[rand] = this.charSet[randRep];
      }
      this.glitchedMessage = chars.join("");
      this.limit += 1;
    },

    async handleBtnClick() {
      if (this.isMember) {
        router.push({ name: "Content" })
      } else {
        const ethers = new Ethers();
        await ethers.mint()
      }
    }
  },
};
</script>

<style scoped>
h1 {
  font-family: "VT323", sans-serif;
  font-size: 120px;
  margin-bottom: 0;
}
p {
  font-family: "Kay Pho Du", sans-serif;
  font-weight: 400;
  font-size: 30px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 100px;
}
.title-container {
  margin-top: 200px;
  margin-left: 100px;
}
.btn-container {
  display: flex;
  justify-content: center;
}
.member-btn {
  background-color: transparent;
  border: 1px solid black;
  border-radius: 10px;
  height: 50px;
  width: 200px;
  font-family: "VT323", sans-serif;
  font-size: 20px;
}
</style>