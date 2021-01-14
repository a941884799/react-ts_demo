/**
 * 获取/创建浮层容器
 */

const rootId = 'overlay-root';
let root: HTMLElement;

export type AttachContainer = HTMLElement | (() => HTMLElement);

export function getOverlayRoot(popupContainer?: AttachContainer) {
  if (popupContainer) return typeof popupContainer === 'function' ? popupContainer() : popupContainer;
  if (typeof document === 'object') {
    root = root || document.getElementById(rootId);
    if (!root) {
      root = document.createElement('div');
      root.id = rootId;
      document.body.appendChild(root);
    }
  }
  return root;
}
