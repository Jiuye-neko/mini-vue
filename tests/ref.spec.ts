import { effect } from '../src/effect';
import { ref } from '../src/ref';

describe('ref', () => {
  it('ref.value', () => {
    const val = ref(1);

    expect(val.value).toBe(1);
  });

  it('reactive ref', () => {
    const original = ref(1);
    let observed;
    let calls: number = 0;
    effect(() => {
      calls++;
      observed = original.value;
    });

    expect(calls).toBe(1);
    expect(observed).toBe(1);
    original.value = 2;

    expect(calls).toBe(2);
    expect(observed).toBe(2);
    original.value = 2;
    expect(calls).toBe(2);
    expect(observed).toBe(2);
  });

  it('nested ref should be reactive', () => {
    let val = ref({ foo: 1 });
    expect(val.value.foo).toBe(1);
    val.value.foo = 2;
    expect(val.value.foo).toBe(2);
  });
});
