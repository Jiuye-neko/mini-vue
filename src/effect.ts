class ReactiveEffect {
  private _fn: any;
  public scheduler: Function | undefined;
  deps = [];
  active = true;

  constructor(fn, scheduler?: Function) {
    this._fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    activeEffect = this;
    return this._fn();
  }
  stop() {
    cleanupEffect(this);
  }
}

const targetMaps = new WeakMap();

// 获取依赖集合
function getDep(target, key) {
  let depMap = targetMaps.get(target);
  if (!depMap) {
    depMap = new Map();
    targetMaps.set(target, depMap);
  }

  let dep = depMap.get(key);
  if (!dep) {
    dep = new Set();
    depMap.set(key, dep);
  }
  return dep;
}

function cleanupEffect(effect) {
  if (effect.active) {
    effect.deps.forEach((dep) => {
      dep.delete(effect);
      effect.active = false;
    });
  }
}

export function track(target, key) {
  const dep = getDep(target, key);

  if (!activeEffect) return;

  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function trigger(target, key) {
  const dep = getDep(target, key);

  for (const effect of dep) {
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
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
