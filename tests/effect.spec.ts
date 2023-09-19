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
  it('runner', () => {
    let val = 10;
    let runner = effect(() => {
      val++;
      return 'fn';
    });

    expect(val).toBe(11);
    let res = runner();
    expect(val).toBe(12);
    expect(res).toBe('fn');
  });
  it('scheduler', () => {
    let original = reactive({ foo: 1 });
    let val;
    let run;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const runner = effect(
      () => {
        val = original.foo;
      },
      {
        scheduler,
      }
    );

    expect(scheduler).not.toHaveBeenCalled();
    expect(val).toBe(1);

    original.foo++;
    expect(val).toBe(1);
    expect(scheduler).toHaveBeenCalledTimes(1);

    run();
    expect(val).toBe(2);
  });
});
