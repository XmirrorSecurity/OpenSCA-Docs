<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />

    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <SubSidebar class="side-bar" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import SubSidebar from "./SubSidebar";
export default {
  components: { PageEdit, PageNav, SubSidebar },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  position relative
  padding-top 1rem
  padding-bottom 2rem
  padding-right 14rem
  display block
  .side-bar
    position fixed
    top 10rem
    bottom 10rem
    right 2rem
    overflow-y auto
    &::-webkit-scrollbar
      width: 0
      height: 0

@media (max-width: $MQMobile)
  .page
    padding-right 0
    .side-bar
      display none
</style>
