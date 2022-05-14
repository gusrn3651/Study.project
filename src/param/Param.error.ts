/*
@ description   : Error Code Object 1000 ~ 
@ date          : 2022-05-02
@ author        : river.pool
@ version       : 1.0.0
*/

export const ERROR_SCRAP = {
  //
  ERR_CODE: 'errCode',
  ERR_MSG: 'errMsg',
  ERR_DEV_MSG: 'errDevMsg',
  //
  HTTP_CONNECT: 1000,
  PARAM_EMPTY: 1201, //empty param
  PARAM_INVALID: 1211, //invalid param
  PAGE_CHANGE: 2000,
} as const;
