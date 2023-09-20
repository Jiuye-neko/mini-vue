import { readonly } from '../src/reactive';

describe('readonly', () => {
  it('readonly', () => {
    const original = { foo: 1, bar: { baz: 3 } };
    let val = readonly(original);

    expect(val).not.toBe(original);
    expect(val.foo).toBe(1);
  });
});
