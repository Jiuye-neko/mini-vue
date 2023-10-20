import { camelize, toHanderKey } from '../shared/index';

export function emit(instance, event, ...args) {
  const { props } = instance;

  const handerName = toHanderKey(camelize(event));
  const handler = props[handerName];

  handler && handler(...args);
}
