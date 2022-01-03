import { request } from './request';

export function getHomedata() {
  return request({
    url: '/api/hy66/home/multidata',
  });
}
//   http://152.136.185.210:7878/api/hy66/recommend
//   http://152.136.185.210:7878/api/hy66/home/data?type=sell&&page=1
//   http://152.136.185.210:7878/api/hy66/home/multidata
export function getHomegoods(type, page) {
  return request({
    url: '/api/hy66/home/data',
    params: {
      type,
      page,
    },
  });
}
