import { h, renderSlots } from '../../lib/guide-mini-vue.esm.js';

export const Foo = {
  name: 'Foo',
  setup() {
    return {};
  },
  render() {
    const foo = h('p', {}, 'foo');
    return h('div', {}, [
      renderSlots(this.$slots, 'header', { num: 123 }),
      foo,
      renderSlots(this.$slots, 'footer'),
    ]);
  },
};
