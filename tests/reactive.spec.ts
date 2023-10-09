import { reactive, isReactive, isProxy } from '../src/reactive';

describe('reactive', () => {
  it('reactive val should be change', () => {
    const original = { foo: 1 };
    const observed = reactive(original);

    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);

    expect(isReactive(observed)).toBe(true);
    expect(isReactive(original)).toBe(false);
    expect(isProxy(observed)).toBe(true);
    expect(isProxy(original)).toBe(false);
  });

  it('nested reactive', () => {
    const original = { foo: 1, bar: ['array', 'object'], baz: { val: 2 } };
    const observed = reactive(original);

    expect(isReactive(observed.bar)).toBe(true);
    expect(isReactive(observed.baz)).toBe(true);
    expect(isReactive(original.baz)).toBe(false);
    expect(isReactive(original.bar)).toBe(false);
  });
});
