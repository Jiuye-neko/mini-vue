import { createComponentInstance, setupComponent } from './component';

export function render(vnode, container) {
  // 调用 patch
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  // 判断当前的 vnode 是 Component 还是 Element 类型
  // Component
  // 开始处理 Component
  processComponent(vnode, container);
  // TODO Element
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  // 获取组件实例 instance
  const instance = createComponentInstance(vnode);
  setupComponent(instance);

  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container: any) {
  // 获取 subTree
  const subTree = instance.render();
  // 递归处理 subTree
  patch(subTree, container);
}
