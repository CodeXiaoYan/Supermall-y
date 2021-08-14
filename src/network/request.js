import axios from "axios";
// 第一次发送
export function request(config) {
  const a = axios.create({
    baseURL: "http://152.136.185.210:7878",
    timeout: 5000,
  });
  // axios的拦截器(局部);
  a.interceptors.request.use((config) => {
    // console.log(config);
    return config;
  }),
    (err) => {
      console.log(err);
    };
  // 响应拦截;

  a.interceptors.response.use(
    (res) => {
      // console.log(res);
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );
  // 发送真正的网络请求
  return a(config);
}
// 第二次发送;
