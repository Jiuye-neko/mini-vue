import { isReadonly, readonly } from '../src/reactive';

describe('readonly', () => {
  it('readonly', () => {
    const original = { foo: 1, bar: { baz: 3 } };
    let val = readonly(original);

    expect(val).not.toBe(original);
    expect(val.foo).toBe(1);

    expect(isReadonly(val)).toBe(true)
    expect(isReadonly(original)).toBe(false)
  });
  it('warn if readonly is set', () => {
    const original = readonly({ foo: 1 });
    console.warn = jest.fn();
    original.foo = 2;

    expect(console.warn).toBeCalled();
  });
});
