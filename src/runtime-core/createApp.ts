import { render } from './renderer';
import { createVNode } from './vnode';

export function createApp(rootComponent) {
  return {
    // 挂载
    mount(rootContainer) {
      // 生成 vnode
      const vnode = createVNode(rootComponent);

      // 进入渲染流程
      render(vnode, rootContainer);
    },
  };
}
