import { reactive, isReactive } from '../src/reactive';

describe('reactive', () => {
  it('reactive val should be change', () => {
    const original = { foo: 1 };
    const observed = reactive(original);

    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);

    expect(isReactive(observed)).toBe(true);
    expect(isReactive(original)).toBe(false)
  });
});
