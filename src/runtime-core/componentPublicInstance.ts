const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
};
// 组件代理 getter
export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState } = instance;
    // 判断当前 key 是否为 setup 中返回的键
    if (key in setupState) {
      return setupState[key];
    }
    // 判断是否为特殊键
    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
