import {useState, SetStateAction, Dispatch, useEffect, FC, createContext, ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import {userAccessProps} from '@/types/user';
import {getFromCookie, saveToCookie} from '@/utils/storage';

interface UserContextProps {
  user: userAccessProps;
  setUser: Dispatch<SetStateAction<userAccessProps>>;
}

interface Props {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps>({} as any);

export const UserProvider: FC<Props> = ({children}) => {
  const navigate = useNavigate();

  const initialUser: userAccessProps = {
    is_logged_in: false,
    access_token: '',
    refresh_token: ''
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
    if (!user?.access_token) {
      navigate('/', {replace: true});
    }
  }, [user]);

  // export user Provider
  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
};

export default UserContext;
