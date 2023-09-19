import { effect } from '../src/effect';
import { reactive } from '../src/reactive';

describe('effect', () => {
  it('effect run ok', () => {
    let original = reactive({ foo: 1 });
    let val: any;
    effect(() => {
      val = original.foo;
    });

    expect(val).toBe(1);
    original.foo++;
    expect(val).toBe(2);
  });
});
