<template>
  <main
      class="home"
      :style="{backgroundImage: `url(${$withBase('/img/home-bg.svg')})`}"
      :aria-labelledby="data.heroText !== null ? 'main-title' : null"
  >
    <header class="hero">
      <Motion>
        <img
            v-if="data.heroImage "
            :src="$withBase(data.heroImage)"
            :alt="data.heroAlt || 'hero'"
        >
      </Motion>
      <Motion delay="0.08">
        <h1
            v-if="data.heroText !== null"
            id="main-title"
        >
          {{ data.heroText || $title || 'Hello' }}
        </h1>
      </Motion>
      <Motion delay="0.16">
        <p
            v-if="data.tagline !== null"
            class="description"
        >
          {{ data.tagline || $description || 'Welcome to your VuePress site' }}
        </p>
      </Motion>

      <p
          v-if="data.actionText && data.actionLink"
          class="action"
      >
        <Motion delay="0.24">
          <NavLink
              class="action-button"
              :item="actionLink"
          />
        </Motion>
      </p>
    </header>
    <div class="footer">
      <a :href="$themeConfig.recordLink || '#'">{{ $themeConfig.record }}</a>
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import Motion from "./Motion";

export default {
  name: 'Home',

  components: {NavLink, Motion},

  computed: {
    data() {
      return this.$page.frontmatter
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
.home
  margin 0 auto
  min-height 100vh
  background-size: 100%;
  background-repeat: no-repeat;
  position: fixed;
  width: 100%;
  .hero
    text-align center
    display flex
    flex-direction column
    justify-content center
    position absolute
    margin auto
    left 0
    right 0
    bottom 0
    top 0
    width 100%

    img
      max-width: 100%
      width 340px
      max-height 280px
      display block
      margin 0 auto 1rem

    h1
      font-size 2.4rem

    h1, .description, .action
      margin 0.8rem auto

    .description
      font-size 1.4rem
      line-height: 1.5;
      color: $textColor;
      margin-bottom 2rem

    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)

      &:hover
        background-color lighten($accentColor, 10%)

  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between

  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%

    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)

    p
      color lighten($textColor, 25%)

  .footer
    position fixed
    bottom 0
    left 0
    right 0
    padding 1.2rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)
    background #ffffff

    a {
      font-size 0.6rem
    }

@media (max-width: $MQMobile)
  .home
    background initial !important
    .features
      flex-direction column

    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    box-sizing border-box

    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem

      h1
        font-size 2rem

      h1, .description, .action
        margin 1.2rem auto

      .description
        font-size 1.2rem

      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem

    .feature
      h2
        font-size 1.25rem
</style>
