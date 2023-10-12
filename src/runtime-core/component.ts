export function createComponentInstance(vnode) {
  const component = {
    vnode,
  };
  return component;
}

export function setupComponent(instance) {
  // TODO initProps
  // TODO initSlots
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  // 获取存在 instance.vnode.type 上的 component
  const Component = instance.vnode.type;
  const { setup } = Component;

  // 判断 setup 是否存在
  if (setup) {
    // 存在则直接执行，获取返回值 setupResult
    const setupResult = setup();
    // 处理 setupResult
    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // 判断 setupResult 是 Function 类型还是 Object 类型
  // TODO function
  if (typeof setupResult === 'object') {
    // 将 setupResult 存到 instance.setupState 上
    instance.setupState = setupResult;
  }

  // 确保 instance 上存在 render
  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  // 获取 instance 上的 Component
  const Component = instance.vnode.type;
  if (Component.render) {
    instance.render = Component.render;
  }
}
