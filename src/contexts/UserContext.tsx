import {useState, SetStateAction, Dispatch, useEffect, FC, createContext, ReactNode} from 'react';
import {userAccessProps} from '@/types/user';
import {useNavigation} from 'react-router-dom';
import {getFromCookie, saveToCookie} from '@/utils/storage';
import isEqual from 'lodash/isEqual';

interface UserContextProps {
  user: userAccessProps;
  setUser: Dispatch<SetStateAction<userAccessProps>>;
}

interface Props {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: FC<Props> = ({children}) => {
  // const history = useNavigation();

  const initialUser: userAccessProps = {
    is_logged_in: false,
    access_token: '',
    refresh_token: '',
  };
  let initialState: userAccessProps;
  try {
    initialState = getFromCookie('token') || initialUser;
  } catch {
    initialState = initialUser;
  }

  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const persistToken = getFromCookie('token');
    if (!isEqual(persistToken, user)) {
      saveToCookie('token', user);
    }
    if (!user?.access_token && history) {
      // history.('/');
    }
  }, [user]);

  // export user Provider
  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};

export default UserContext;
