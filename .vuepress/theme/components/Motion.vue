<script>
export default {
  name: "Motion",
  functional: true,
  props: {
    delay: {
      type: String,
      default: '0'
    },
    duration: {
      type: String,
      default: '.28'
    },
    transform: {
      type: Array,
      default() {
        return ['translateY(-20px)', 'translateY(0)'];
      }
    }
  },
  render: function (createElement, context) {

    const setStyle = (items)=>{
      items.style.transform = context.props.transform[0];
      items.style.opacity = 0
    }
    const unsetStyle = (items)=> {
      items.style.transition = `transform ${context.props.duration}s ease-in-out ${context.props.delay}s, opacity ${context.props.duration}s ease-in-out ${context.props.delay}s`;
      items.style.transform = context.props.transform[1];
      items.style.opacity = 1
    }
    const data = {
      props: {
        name: 'module'
      },
      on: {
        enter: setStyle,
        appear: setStyle,
        'before-leave': setStyle,
        'after-appear': unsetStyle,
        'after-enter': unsetStyle
      }
    }
    return createElement('transition', data, context.children)
  }
}
</script>
