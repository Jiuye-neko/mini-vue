import { effect } from '../src/effect';
import { reactive } from '../src/reactive';
import { isRef, ref, unRef } from '../src/ref';

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

  it('isRef', () => {
    const val = ref(1);
    const reactiveVal = reactive({ foo: 1 });

    expect(isRef(val)).toBe(true);
    expect(isRef(1)).toBe(false);
    expect(isRef(reactiveVal)).toBe(false);
  });

  it('unRef', () => {
    const val = ref(1);

    expect(unRef(val)).toBe(1);
    expect(unRef(1)).toBe(1);
  });
});
