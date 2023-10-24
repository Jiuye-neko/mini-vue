import { getCurrentInstance } from './component';

export function provide(key, value) {
  const currentInstance: any = getCurrentInstance();

  if (currentInstance) {
    let { provides } = currentInstance;

    // TODO 没有处理根组件的 provides
    const parentProvides = currentInstance.parent.provides;
    // instance 创建时从 parent 继承了 provides
    // 判断父 provides 是否与当前 provides 一致，一致则需要初始化，将原型指向 parent
    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }

    provides[key] = value;
  }
}

export function inject(key, defaultValue) {
  const currentInstance: any = getCurrentInstance();

  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides;

    if (key in parentProvides) {
      return parentProvides[key];
    } else if (defaultValue) {
      if (typeof defaultValue === 'function') {
        return defaultValue();
      } else {
        return defaultValue;
      }
    }
  }
}
