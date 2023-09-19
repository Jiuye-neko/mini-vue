class ReactiveEffect {
  private _fn: any;

  constructor(fn, public scheduler?) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    return this._fn();
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
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

let activeEffect;

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  // 先执行一次
  _effect.run();

  // 返回 runner，用 bind 绑定 this 指向
  return _effect.run.bind(_effect);
}
