import { isOwn } from '../shared/index';

const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
  $slots: (i) => i.slots,
};
// 组件代理 getter
export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState, props } = instance;

    // 判断当前 key 是否为 setup 中返回的键
    if (isOwn(setupState, key)) {
      return setupState[key];
    } else if (isOwn(props, key)) {
      return props[key];
    }

    // 判断是否为特殊键
    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
