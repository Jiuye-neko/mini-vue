import { isReadonly, shallowReadonly } from '../reactive';

describe('shallowReadonly', () => {
  it('readonly is shallow', () => {
    const val = shallowReadonly({ foo: 1, bar: { baz: 2 } });

    expect(isReadonly(val)).toBe(true);
    expect(isReadonly(val.bar)).toBe(false);
  });

  it('shallowReadonly should not be set', () => {
    const val = shallowReadonly({ foo: 1 });
    console.warn = jest.fn();
    val.foo++;

    expect(console.warn).toHaveBeenCalled();
  });
});
