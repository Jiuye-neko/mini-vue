import { ShapeFlags } from '../shared/ShapeFlags';
import { createComponentInstance, setupComponent } from './component';
import { Fragment, Text } from './vnode';

export function render(vnode, container) {
  // 调用 patch
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  const { type, shapeFlags } = vnode;
  switch (type) {
    case Fragment:
      processFragment(vnode, container);
      break;
    case Text:
      processText(vnode, container);
      break;
    default:
      // 判断当前的 vnode 是 Component 还是 Element 类型
      if (shapeFlags & ShapeFlags.ELEMENT) {
        processElement(vnode, container);
      } else if (shapeFlags & ShapeFlags.STATEFUL_COMPONENT) {
        // Component
        // 开始处理 Component
        processComponent(vnode, container);
      }
      break;
  }
}

function processFragment(vnode: any, container: any) {
  // 如果当前为 Fragment 类型，直接将子节点挂载到当前父节点上
  mountChildren(vnode, container);
}

function processText(vnode: any, container: any) {
  const { children } = vnode;
  const textNode = (vnode.el = document.createTextNode(children));
  container.append(textNode);
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  // 将 el 挂载到 vnode 上
  const el = (vnode.el = document.createElement(vnode.type));

  const { children } = vnode;
  if (vnode.shapeFlags & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (vnode.shapeFlags & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el);
  }

  const { props } = vnode;

  for (const key in props) {
    const val = props[key];

    // 判断当前 props 是否为事件
    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
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
