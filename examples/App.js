import { h } from '../lib/guide-mini-vue.esm';

export const App = {
  render() {
    return h('div', 'hello, ' + this.msg);
  },
  setup() {
    return {
      msg: 'mini-vue',
    };
  },
};
