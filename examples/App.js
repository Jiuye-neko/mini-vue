import { h } from '../lib/guide-mini-vue.esm.js';

export const App = {
  render() {
    return h('div', { class: ['center', 'yellow'] }, [
      // 'hey there',
      h('p', { class: 'blue' }, 'hello'),
      h('p', { class: 'red' }, this.msg),
    ]);
  },
  setup() {
    return {
      msg: 'mini-vue-3',
    };
  },
};
