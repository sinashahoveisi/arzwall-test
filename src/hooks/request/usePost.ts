import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {useMutation} from 'react-query';
import merge from 'lodash/merge';
import set from 'lodash/set';
import isFunction from 'lodash/isFunction';
import useUser from '@/hooks/user/useUser';
import {allocateParamToString} from '@/utils/common';
import type {mutationRequestProps} from '@/types/request';

interface Props {
  url: string;
  query?: object;
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'GET';
  isUrlencoded?: boolean;
  isMultipart?: boolean;
  onSuccess?(response: any, request?: any, params?: any): void;
  onError?(error: any, request?: any, params?: any): void;
}

/**
 *
 * @param url
 * @param method
 * @param query
 * @param isMultipart
 * @param onSuccess
 * @param onError
 * @param isUrlencoded
 */
const usePost = ({url, method = 'POST', query, isMultipart, onSuccess, onError, isUrlencoded = false}: Props) => {
  const {user} = useUser();

  const requestConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: user?.access_token ? `Bearer ${user?.access_token}` : '',
      'Content-type': isMultipart
        ? 'multipart/form-data'
        : isUrlencoded
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
      timeout: 15000
    },

    url,
    method,
    params: query
  };

  const createRequest = ({body, queryParams, params, token}: mutationRequestProps) => {
    if (queryParams) set(requestConfig, 'params', merge(query, queryParams));
    if (token) set(requestConfig, ['headers', 'Authorization'], `Bearer ${token}`);
    if (params) set(requestConfig, 'url', allocateParamToString(url, params));
    set(requestConfig, 'data', body);
    return axios(requestConfig);
  };

  const mutationData: any = useMutation(createRequest, {
    retry: (failureCount: number, error: AxiosError): boolean => {
      if (error?.response?.status === 404 || error?.response?.status === 500 || error?.response?.status === 422)
        return false;
      return failureCount <= 1;
    },
    onSuccess: (data, variables) => {
      if (isFunction(onSuccess)) {
        onSuccess(data?.data, variables, variables?.params);
      }
    },
    onError: (error: AxiosError, variables) => {
      if (isFunction(onError)) {
        onError(error.request, variables, variables?.params);
      }
    }
  });

  const post = (body?: any, queryParams?: object, params?: object, token?: string) => {
    mutationData.mutate({body, queryParams, params, token});
  };
  return {...mutationData, post, params: mutationData.variables?.params};
};

export default usePost;
