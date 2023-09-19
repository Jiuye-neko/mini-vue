import { reactive } from '../src/reactive';

describe('reactive', () => {
  it('reactive val should be change', () => {
    const original = { foo: 1 };
    const observed = reactive(original);

    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
  });
});
