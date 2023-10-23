import { h } from '../../lib/guide-mini-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  name: 'App',
  setup() {
    return {};
  },
  render() {
    const app = h('div', {}, 'app');
    // const foo = h(Foo, {}, h('p', {}, '123'));
    const foo = h(
      Foo,
      {},
      {
        header: ({ num }) => h('p', {}, 'header:' + num),
        footer: () => [h('p', {}, 'footer'), h('p', {}, '789')],
      }
    );
    return h('div', {}, [app, foo]);
  },
};
