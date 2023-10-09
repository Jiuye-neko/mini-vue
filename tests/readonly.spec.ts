import { isProxy, isReadonly, readonly } from '../src/reactive';

describe('readonly', () => {
  it('readonly', () => {
    const original = { foo: 1, bar: { baz: 3 } };
    let val = readonly(original);

    expect(val).not.toBe(original);
    expect(val.foo).toBe(1);

    expect(isReadonly(val)).toBe(true);
    expect(isReadonly(original)).toBe(false);
    expect(isProxy(val)).toBe(true);
    expect(isProxy(original)).toBe(false);
  });

  it('warn if readonly is set', () => {
    const original = readonly({ foo: 1 });
    console.warn = jest.fn();
    original.foo = 2;

    expect(console.warn).toBeCalled();
  });

  it('nested readonly', () => {
    const original = { foo: 1, bar: ['array', 'object'], baz: { val: 2 } };
    const observed = readonly(original);

    expect(isReadonly(observed.bar)).toBe(true);
    expect(isReadonly(observed.baz)).toBe(true);
    expect(isReadonly(original.baz)).toBe(false);
    expect(isReadonly(original.bar)).toBe(false);
  });
});
