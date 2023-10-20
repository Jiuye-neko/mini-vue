import { Foo } from './Foo.js';
import { h } from '../../lib/guide-mini-vue.esm.js';

export const App = {
  name: 'App',
  setup() {},
  render() {
    return h('div', {}, [
      h('div', {}, 'hello App'),
      h(Foo, {
        onAdd() {
          console.log('on add');
        },
        onAddFoo() {
          console.log('on add foo');
        },
      }),
    ]);
  },
};
