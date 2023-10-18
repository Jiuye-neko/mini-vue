import { isObject } from '../shared/index';
import { createComponentInstance, setupComponent } from './component';

export function render(vnode, container) {
  // 调用 patch
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  // 判断当前的 vnode 是 Component 还是 Element 类型
  if (typeof vnode.type === 'string') {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    // Component
    // 开始处理 Component
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  // 将 el 挂载到 vnode 上
  const el = (vnode.el = document.createElement(vnode.type));

  const { children } = vnode;
  if (typeof children === 'string') {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el);
  }

  const { props } = vnode;
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }

  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  // 获取组件实例 instance
  const instance = createComponentInstance(vnode);
  setupComponent(instance);

  setupRenderEffect(instance, vnode, container);
}

function setupRenderEffect(instance: any, vnode: any, container: any) {
  const proxy = instance.proxy;
  // 获取 subTree，this 指向绑定为 proxy
  const subTree = instance.render.call(proxy);
  // 递归处理 subTree
  patch(subTree, container);

  // 挂载完成，将根节点的 el 挂载到 vnode 上
  vnode.el = subTree.el;
}
