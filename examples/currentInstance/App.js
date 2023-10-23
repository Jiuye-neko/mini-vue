import { h, getCurrentInstance } from '../../lib/guide-mini-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  name: 'App',
  setup() {
    console.log('App: ', getCurrentInstance());
  },
  render() {
    const app = h('div', {}, 'app');
    // const foo = h(Foo, {}, h('p', {}, '123'));
    const foo = h(Foo);
    return h('div', {}, [app, foo]);
  },
};
