import { request } from './request';

export function getHomeMultidata() {
  return request({
    url: '/api/hy66/home/multidata',
  });
}

export function getHomeData(type, page) {
  return request({
    url: '/api/hy66/home/data',
    params: {
      type,
      page,
    },
  });
}
