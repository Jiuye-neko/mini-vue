import { effect, stop } from '../effect';
import { reactive } from '../reactive';

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
  it('stop', () => {
    const original = reactive({ foo: 1 });
    let val;
    const runner = effect(() => {
      val = original.foo;
    });

    original.foo = 2;
    expect(val).toBe(2);

    stop(runner);
    // original.foo++;
    // 此处不使用自增，自增触发了 get 导致依赖被重新收集了
    // 优化 stop 处理边缘 case 解决依赖被重新收集的问题
    // original.foo = 3;
    original.foo++;
    expect(val).toBe(2);

    runner();
    expect(val).toBe(3);
  });

  it('onStop', () => {
    const original = reactive({ foo: 1 });
    let val;
    const onStop = jest.fn();
    const runner = effect(
      () => {
        val = original.val;
      },
      {
        onStop,
      }
    );
    stop(runner);
    expect(onStop).toHaveBeenCalledTimes(1);
  });
});
