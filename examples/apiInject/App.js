import { h, provide, inject } from '../../lib/guide-mini-vue.esm.js';

const Provider = {
  name: 'Provider',
  setup() {
    provide('foo', 'fooVal');
    provide('bar', 'barVal');

    // TODO
    // const appVal = inject('app');
    // console.log('app-provide: ', appVal);
  },
  render() {
    return h('div', {}, [h('p', {}, 'Provider'), h(Center)]);
  },
};

const Center = {
  name: 'Center',
  setup() {
    provide('foo', 'centerFoo');

    const foo = inject('foo');
    return { foo };
  },
  render() {
    return h('div', {}, [h('p', {}, `Center: ${this.foo}`), h(Consumer)]);
  },
};

const Consumer = {
  name: 'Consumer',
  setup() {
    const foo = inject('foo');
    const bar = inject('bar');
    const baz = inject('baz', 'defaultBaz');
    return {
      foo,
      bar,
      baz
    };
  },
  render() {
    return h('div', {}, `Consumer - foo: ${this.foo} - bar: ${this.bar} - baz: ${this.baz}`);
  },
};

export default {
  name: 'App',
  setup() {
    // TODO provide('app', 'appVal');
  },
  render() {
    return h('div', {}, [h('p', {}, 'App'), h(Provider)]);
  },
};
