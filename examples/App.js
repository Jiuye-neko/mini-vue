import { h } from '../lib/guide-mini-vue.esm.js';

export const App = {
  render() {
    return h(
      'div',
      { class: ['center', 'yellow'] },
      // 'hello, ' + this.msg
      [
        // 'hey there',
        h('p', { class: 'blue' }, 'hello'),
        h('p', { class: 'red' }, 'mini-vue'),
      ]
    );
  },
  setup() {
    return {
      msg: 'mini-vue',
    };
  },
};
