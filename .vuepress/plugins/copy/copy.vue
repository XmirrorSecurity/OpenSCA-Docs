<template>
 <span
     ref="btn"
     class="v-copy-code-btn"
     @click="copyClick"
 >
      <template v-if="mes">{{copySuccessText}}&nbsp;&nbsp;</template>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
        <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
      </svg>
    </span>
</template>

<script>
import clipboard from "./clipboard";
export default {
  props: {
    copySuccessText: String,
    code: String,
    mes: null,
    timeout:null
  },
  methods: {
    copyClick() {
      const call = e => {
        if (typeof change === "function") {
          change.call(this, e, this.$el);
        }
      };
      if (visibleTip) {
        this.mes = true
        if (this.timeout) {
          clearInterval(this.timeout)
        }
        this.timeout = setTimeout(()=> {
          this.mes = false
        },3000)
      }

      clipboard(this.code)
        .then(e => call)
        .catch(call);
    }
  },
  destroyed () {
    clearInterval(this.timeout)
  }
};
</script>

<style>
div[class][class*="language-"]::before {
  left: 0.5rem;
  top: 0.3rem;
}
</style>


<style scoped>
.v-copy-code-btn {
  cursor: pointer;
  color: hsla(0, 0%, 54.9%, 0.8);
  transition: color 0.1s;
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 3;
  top: 0.5em;
  right: 5px;
  font-size: 0.75rem;
}

.v-copy-code-btn:hover {
  color: #CE237F;
}
</style>
