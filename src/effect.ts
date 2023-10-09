import { extend } from './shared';

let activeEffect;
let shouldTrack;

class ReactiveEffect {
  private _fn: any;
  public scheduler: Function | undefined;
  deps = [];
  active = true;
  onStop?: () => void;

  constructor(fn, scheduler?: Function) {
    this._fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    if (!this.active) {
      return this._fn();
    }

    shouldTrack = true;
    activeEffect = this;
    const result = this._fn();
    shouldTrack = false;

    return result;
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
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
  effect.deps.forEach((dep) => {
    dep.delete(effect);
  });
  effect.deps.length = 0;
}

export function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

export function track(target, key) {
  if (!isTracking()) return;

  const dep = getDep(target, key);

  trackEffects(dep);
}

export function trackEffects(dep) {
  if (dep.has(activeEffect)) return;
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function trigger(target, key) {
  const dep = getDep(target, key);

  triggerEffects(dep);
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  extend(_effect, options);

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
