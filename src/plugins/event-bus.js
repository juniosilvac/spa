import Vue from 'vue'

const bus = new Vue()

export {
  bus
}

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$bus', {
    get () {
      return bus
    }
  })
}

// import bus from '@/plugins/event-bus' // install()
// import { bus } from '@/plugins/event-bus' // objeto bus
