import { isTracking, trackEffects, triggerEffects } from './effect';
import { reactive } from './reactive';
import { hasChange, isObject } from './shared';

class RefImpl {
  private _value: any;
  private _rawValue: any;
  public dep;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);

    this.dep = new Set();
  }

  get value() {
    trackRefValue(this);

    return this._value;
  }

  set value(newVal) {
    if (hasChange(this._rawValue, newVal)) {
      this._rawValue = newVal;
      this._value = convert(newVal);
      triggerEffects(this.dep);
    }
  }
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

export function ref(value) {
  return new RefImpl(value);
}
