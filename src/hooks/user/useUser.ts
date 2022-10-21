import {useContext} from 'react';
import UserContext from '@/contexts/UserContext';
import {useQueryClient} from 'react-query';
import includes from 'lodash/includes';
import toNumber from 'lodash/toNumber';
import get from 'lodash/get';

function useUser() {
  const user = useContext(UserContext);
  const queryClient = useQueryClient();

  const hasPermission = (permission: string): boolean => {
    const menu: any = queryClient.getQueryData('menu');
    return includes(get(menu, ['data', 'permissions']), permission);
  };

  const getAllPermissions = () => {
    const menu: any = queryClient.getQueryData('menu');
    return get(menu, ['data', 'permissions']);
  };

  const getInfo = () => {
    const menu: any = queryClient.getQueryData('menu');
    return get(menu, ['data']);
  };

  const getId = () => {
    const menu: any = queryClient.getQueryData('menu');
    return get(menu, ['data', 'id']);
  };

  const isMySelf = (id?: number | string) => {
    const menu: any = queryClient.getQueryData('menu');
    return get(menu, ['data', 'id']) === toNumber(id);
  };


  return {...user, hasPermission, getAllPermissions, getInfo, isMySelf, getId};
}
export default useUser;
