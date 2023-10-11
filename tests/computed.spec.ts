import { computed } from '../src/computed';
import { reactive } from '../src/reactive';

describe('computed', () => {
  it('computed', () => {
    const user = { age: 1 };
    const age = computed(() => {
      return user.age;
    });

    expect(age.value).toBe(1);
  });

  it('should computed be lazily', () => {
    const user = reactive({ age: 1 });
    const getter = jest.fn(() => {
      return user.age;
    });

    const val = computed(getter);

    expect(getter).not.toHaveBeenCalled();

    expect(val.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);

    // should not be computed again
    val.value;
    expect(getter).toHaveBeenCalledTimes(1);

    user.age = 2;
    expect(getter).toHaveBeenCalledTimes(1);

    expect(val.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(2);

    val.value;
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
