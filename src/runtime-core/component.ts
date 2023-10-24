import { shallowReadonly } from '../reactivity/reactive';
import { emit } from './componentEmit';
import { initProps } from './componentProps';
import { PublicInstanceProxyHandlers } from './componentPublicInstance';
import { initSlots } from './componentSlots';

export function createComponentInstance(vnode, parent) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    parent,
    provides: parent ? parent.provides : {},
    emit: () => {},
  };
  component.emit = emit.bind(null, component) as any;
  return component;
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  // 获取存在 instance.vnode.type 上的 component
  const Component = instance.type;

  // 组件代理，用于将属性绑定到 this 上
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);

  const { setup } = Component;

  // 判断 setup 是否存在
  if (setup) {
    setCurrentInstance(instance);

    // 存在则直接执行，获取返回值 setupResult
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });

    setCurrentInstance(null);

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
  const Component = instance.type;
  if (Component.render) {
    instance.render = Component.render;
  }
}

let currentInstance = null;

export function getCurrentInstance() {
  return currentInstance;
}

export function setCurrentInstance(instance) {
  currentInstance = instance;
}