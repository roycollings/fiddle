export enum Method {
  get = "get",
  post = "post",
  patch = "patch",
  put = "put",
  delete = "delete"
}

export type RequestParams = {
  endpoint: string;
  method?: Method;
  params?: string;
  body?: BodyInit;
};