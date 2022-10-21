import Cookies, {CookieAttributes} from 'js-cookie';
import isNil from 'lodash/isNil';

export const saveToCookie = (name: string, data: any, options?: CookieAttributes) => {
  try {
    Cookies.set(name, encodeURIComponent(JSON.stringify(data)), options);
  } catch (e) {
    console.log(e);
  }
};

export const getFromCookie = (name: string): any => {
  try {
    const data = Cookies.get(name);
    return !isNil(data) && JSON.parse(decodeURIComponent(Cookies.get(name) || '') || '');
  } catch (e) {
    return null;
  }
};

export const deleteFromCookie = (name: string) => {
  Cookies.remove(name);
};

export const saveToLocalStorage = (name: string, data: any) => {
  try {
    if (localStorage) localStorage.setItem(name, encodeURIComponent(JSON.stringify(data)));
  } catch (e) {
    console.log(e);
  }
};

export const getFromLocalStorage = (name: string): any => {
  try {
    if (localStorage)
      return (
        localStorage.getItem(name) !== null && JSON.parse(decodeURIComponent(localStorage.getItem(name) || '') || '')
      );
  } catch (e) {
    return null;
  }
};

export const deleteFromLocalStorage = (name: string) => {
  if (localStorage) localStorage.removeItem(name);
};
