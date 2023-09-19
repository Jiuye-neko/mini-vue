class ReactiveEffect {
  private _fn: any;

  constructor(fn) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    this._fn();
  }
}

const targetMaps = new WeakMap();

// 获取依赖集合
function getDeps(target, key) {
  let depsMap = targetMaps.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMaps.set(target, depsMap);
  }

  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  return deps;
}

export function track(target, key) {
  const deps = getDeps(target, key);

  deps.add(activeEffect);
}

export function trigger(target, key) {
  const deps = getDeps(target, key);

  for (const effect of deps) {
    effect.run();
  }
}

let activeEffect;

export function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}
