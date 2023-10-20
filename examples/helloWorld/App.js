import { h } from '../../lib/guide-mini-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  name: 'App',
  render() {
    return h(
      'div',
      { class: ['center', 'yellow'], onClick: () => console.log('click') },
      [
        // 'hey there',
        h('p', { class: 'blue' }, 'hello, ' + this.msg),
        h(Foo, { count: 1 }),
      ]
    );
  },
  setup() {
    return {
      msg: 'mini-vue-3',
    };
  },
};
