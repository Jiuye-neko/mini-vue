import { h } from '../../lib/guide-mini-vue.esm.js';
export const Foo = {
  setup(props) {
    console.log(props);

    // props 为 shallowReadonly，不可被更改
    props.count++;
    console.log(props);
  },
  render() {
    return h('div', { class: 'red' }, 'foo: ' + this.count);
  },
};
