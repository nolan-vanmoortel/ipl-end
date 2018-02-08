// @flow

import type {
  Storage,
  TokenKey,
  UserInfoKey,
  STORES_TYPES
}                 from './type';
import decode     from 'jwt-decode';
import moment     from 'moment';
import Cookies    from 'universal-cookie';


const TOKEN_KEY = 'token';
const USER_INFO = 'userInfo';

const APP_PERSIST_STORES_TYPES: Array<STORES_TYPES> = [
  'localStorage',
  'sessionStorage'
];

const parse     = JSON.parse;
const stringify = JSON.stringify;

/*
  auth object
  -> store "TOKEN_KEY"
  - default storage = "localStorage"
  - default token key = 'token'
 */
export const auth = {

  // /////////////////////////////////////////////////////////////
  // TOKEN
  // /////////////////////////////////////////////////////////////

  getToken(
    fromStorage: Storage  = APP_PERSIST_STORES_TYPES[0],
    tokenKey: TokenKey = TOKEN_KEY
  ): ?string {
    // localStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
      return (localStorage && localStorage.getItem(tokenKey)) || null;
    }
    // sessionStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
      return (sessionStorage && sessionStorage.getItem(tokenKey)) || null;
    }
    // default:
    return null;
  },

  setToken(
    value: string = '',
    toStorage: Storage = APP_PERSIST_STORES_TYPES[0],
    tokenKey: TokenKey = TOKEN_KEY
  ): ?string {
    if (!value || value.length <= 0) {
      return;
    }const cookies = new Cookies();
    cookies.set('token', value, {path:'/'});

    // localStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
      if (localStorage) {
        localStorage.setItem(tokenKey, value);
      }
    }
    // sessionStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
      if (sessionStorage) {
        sessionStorage.setItem(tokenKey, value);
      }
    }
  },


  /**
   * Seulement en local ! Il faut bien check en back-end que le token est correct
   * @param {'localStorage' | 'sessionStorage'} [fromStorage='localStorage'] l'endroit de stockage
   * @param {any} [tokenKey='token'] Le token
   * @returns {boolean} Authentifié ou non
   */
  isAuthenticated(
    fromStorage: Storage = APP_PERSIST_STORES_TYPES[0],
    tokenKey: TokenKey = TOKEN_KEY
  ): boolean {
    // localStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
      if ((localStorage && localStorage.getItem(tokenKey))) {
        return true;
      } else {
        return false;
      }
    }
    // sessionStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
      if ((sessionStorage && sessionStorage.getItem(tokenKey))) {
        return true;
      } else {
        return false;
      }
    }
    // default:
    return false;
  },

  clearToken(
    storage: Storage  = APP_PERSIST_STORES_TYPES[0],
    tokenKey: TokenKey = TOKEN_KEY
  ): boolean {
    // localStorage:
    if (localStorage && localStorage[tokenKey]) {
      localStorage.removeItem(tokenKey);
      return true;
    }
    // sessionStorage:
    if (sessionStorage && sessionStorage[tokenKey]) {
      sessionStorage.removeItem(tokenKey);
      return true;
    }

    return false;
  },

  getTokenExpirationDate(
    encodedToken: any
  ): Date {
    if (!encodedToken) {
      return new Date(0); // is expired
    }

    const token = decode(encodedToken);
    if (!token.exp) {
      return new Date(0); // is expired
    }

    const expirationDate = new Date(token.exp*1000);
    return expirationDate;
  },

  isExpiredToken(
    encodedToken: any
  ): boolean {
    const expirationDate = this.getTokenExpirationDate(encodedToken);
    const rightNow       = moment();
    const isExpiredToken = moment(rightNow).isAfter(moment(expirationDate));

    return isExpiredToken;
  },

  // /////////////////////////////////////////////////////////////
  // USER_INFO
  // /////////////////////////////////////////////////////////////

  getUserInfo(
    fromStorage: Storage = APP_PERSIST_STORES_TYPES[0],
    userInfoKey: UserInfoKey = USER_INFO
  ): ?string {
    // localStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[0]) {
      return (localStorage && parse(localStorage.getItem(userInfoKey))) || null;
    }
    // sessionStorage:
    if (fromStorage === APP_PERSIST_STORES_TYPES[1]) {
      return (sessionStorage && parse(sessionStorage.getItem(userInfoKey))) || null;
    }
    // default:
    return null;
  },

  setUserInfo(
    value: string = '',
    toStorage: Storage = APP_PERSIST_STORES_TYPES[0],
    userInfoKey: UserInfoKey = USER_INFO
  ): any {
    if (!value || value.length <= 0) {
      return;
    }
    const cookies = new Cookies();
    cookies.set('email', value, {path:'/'});
    // localStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[0]) {
      if (localStorage) {
        localStorage.setItem(userInfoKey, stringify(value));
      }
    }
    // sessionStorage:
    if (toStorage === APP_PERSIST_STORES_TYPES[1]) {
      if (sessionStorage) {
        sessionStorage.setItem(userInfoKey, stringify(value));
      }
    }
  },

  clearUserInfo(
    userInfoKey: UserInfoKey = USER_INFO
  ): any {
    // localStorage:
    if (localStorage && localStorage[userInfoKey]) {
      localStorage.removeItem(userInfoKey);
    }
    // sessionStorage:
    if (sessionStorage && sessionStorage[userInfoKey]) {
      sessionStorage.removeItem(userInfoKey);
    }
  },


  // /////////////////////////////////////////////////////////////
  // COMMON
  // /////////////////////////////////////////////////////////////

  clearAllAppStorage(): any {
    if (localStorage) {
      localStorage.clear();
    }
    if (sessionStorage) {
      sessionStorage.clear();
    }
    const cookies = new Cookies();
    if (cookies.get('token')) {
      cookies.remove('token');
    }
    if (cookies.get('email')) {
      cookies.remove('email');
    }
  }
};

export default auth;
