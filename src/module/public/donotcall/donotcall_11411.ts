import * as httpCls from 'src/util/httpCls';
import { ERROR_SCRAP } from 'src/param/Param.error';
import { PARAM_SCRAP } from 'src/param/param.common';
import 'src/core/core.interface';
//import { resultCls } from 'src/core/core.interface';

// initialize(): Promise<boolean> {
//   return false;
// }

export class donotcall_11411 {
  constructor(
    private HOST_URL: string = 'https://www.donotcall.go.kr',
    private OUTPUTJSON = {},
    private PARAMJSON = {},
    private parseData = '',
  ) {}

  async startScraping(INPUTJSON) {
    try {
      console.log('-------------Start Scraping-------------');
      if ((await this.initialize()) === false) return false;

      if ((await this.setParameter(INPUTJSON)) === false) return false;

      if ((await this.login()) === false) return false;

      if ((await this.mainScrap()) === false) return false;

      if ((await this.parsing()) === false) return false;
    } catch (e) {
    } finally {
      await this.sendResult();
      console.log('-------------End Scraping-------------');
    }

    return true;
  }

  //@description : //initialize to JSON

  async initialize() {
    this.OUTPUTJSON[PARAM_SCRAP.MODULE_RES_RESULT_KEY] = 'FAIL';
    this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = '';
    this.OUTPUTJSON[ERROR_SCRAP.ERR_MSG] = '';
    this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] = '';
    this.OUTPUTJSON[PARAM_SCRAP.MODULE_RES_RESULT_LIST] = new Array();

    this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_TYPE] = '';
    this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM] = '';
    this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM1] = '';
    this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM2] = '';

    return true;
  }

  //@description : 입력 파라미터의 유효성을 검증하고 사용할 파라미터를 셋팅합니다.

  async setParameter(INPUTJSON) {
    const reqType = INPUTJSON[PARAM_SCRAP.COMMON_REQ_TYPE] || ''; // 요청타입 (0: 수신거부 등록, 1: 수신거부 해제, 2: 추가 수신거부 등록)
    const phoneNo = INPUTJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM] || ''; // reqType = "0" || "1" 필수 입력
    const phoneNo1 = INPUTJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM1] || ''; // reqType = "2" 필수 입력
    const phoneNo2 = INPUTJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM2] || ''; // reqType = "2" 필수 입력

    if (reqType == '0' || reqType == '1') {
      if (!phoneNo) {
        this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PARAM_EMPTY;
        this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] =
          PARAM_SCRAP.COMMON_REQ_PHONE_NUM;
        return false;
      } else if (isNaN(phoneNo)) {
        this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PARAM_INVALID;
        this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] =
          PARAM_SCRAP.COMMON_REQ_PHONE_NUM;
        return false;
      }
    } else if (reqType == '2') {
      if (!phoneNo1 && !phoneNo2) {
        this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PARAM_EMPTY;
        this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] =
          PARAM_SCRAP.COMMON_REQ_PHONE_NUM1;
        return false;
      }

      if (phoneNo1 && isNaN(phoneNo1)) {
        this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PARAM_INVALID;
        this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] =
          PARAM_SCRAP.COMMON_REQ_PHONE_NUM1;
        return false;
      } else if (phoneNo1 && isNaN(phoneNo1)) {
        this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PARAM_INVALID;
        this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] =
          PARAM_SCRAP.COMMON_REQ_PHONE_NUM1;
        return false;
      }
    } else {
      this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PARAM_INVALID;
      this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] = PARAM_SCRAP.COMMON_REQ_TYPE;
      return false;
    }

    this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_TYPE] = reqType;
    this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM] = phoneNo;
    this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM1] = phoneNo1;
    this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM2] = phoneNo2;
    //this.PARAMJSON['plusInfo'] = INPUTJSON['plusInfo'];
    //this.PARAMJSON['authCode'] = INPUTJSON['authCode'];
    //this.PARAMJSON['cookie'] = INPUTJSON['cookie'];

    return true;
  }

  async login() {
    return true;
  }

  async mainScrap() {
    let resultData: any;
    let plusInfo: string;
    let authCode: string;
    let requestHeader = {};
    let postData: string = '';
    let ErrorJson = {};

    requestHeader['Content-type'] = 'application/x-www-form-urlencoded';
    requestHeader['User-Agent'] =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.44';
    requestHeader['Accept'] =
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9';
    //requestHeader['Cookie'] = this.PARAMJSON['cookie'];

    postData = '';
    postData += 'plusInfo=' + this.PARAMJSON['plusInfo'];
    postData += '&phoneNo=' + this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM]; //scrap_param.SCRAP_MODULE_PARAM_REQ_PHONE_NO;
    postData += '&authcode=' + this.PARAMJSON['authCode'];

    resultData = await httpCls.axiosRequest(
      this.HOST_URL,
      '/teldeny/sms/auth.do',
      'POST',
      postData,
      requestHeader,
    );

    return true;

    // requestHeader = {
    //   'Content-type': 'application/x-www-form-urlencoded',
    //   'User-Agent':
    //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.44',
    //   Accept:
    //     'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //   Cookie: '',
    // };

    resultData = await httpCls.axiosRequest(
      this.HOST_URL,
      '/teldeny/',
      'GET',
      '',
      requestHeader,
    );

    if (resultData === '') {
      //TODO : ERROR code add
      this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PAGE_CHANGE;
      this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] = '';
      this.OUTPUTJSON[ERROR_SCRAP.ERR_MSG] = '';
      return false;
    }

    resultData = await httpCls.axiosRequest(
      this.HOST_URL,
      '/teldeny/site/sub01/sub01_01.do',
      'GET',
      '',
      requestHeader,
    );
    if (resultData === '') {
      //TODO : ERROR code add
      this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PAGE_CHANGE;
      this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] = '';
      this.OUTPUTJSON[ERROR_SCRAP.ERR_MSG] = '';
      return false;
    }

    postData = '';
    postData += 'mode=step2';

    resultData = await httpCls.axiosRequest(
      this.HOST_URL,
      '/teldeny/site/sub01/sub01_01.do',
      'POST',
      postData,
      requestHeader,
    );

    if (resultData === '') {
      //TODO : ERROR code add
      this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PAGE_CHANGE;
      this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] = '';
      this.OUTPUTJSON[ERROR_SCRAP.ERR_MSG] = '';
      return false;
    }

    postData = 'mode=cellPhoneCert';
    postData += '&check=on';
    postData += '&check=on';

    resultData = await httpCls.axiosRequest(
      this.HOST_URL,
      '/teldeny/site/sub01/sub01_01.do',
      'POST',
      postData,
      requestHeader,
    );

    if (resultData === '') {
      //TODO : ERROR code add
      this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PAGE_CHANGE;
      this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] = '';
      this.OUTPUTJSON[ERROR_SCRAP.ERR_MSG] = '';
      return false;
    }

    try {
      plusInfo = resultData.data.split('plusInfo" value="')[1].split('" />')[0];
    } catch (e) {
      //TODO : ERROR code add
      this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = ERROR_SCRAP.PAGE_CHANGE;
      this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] = '';
      this.OUTPUTJSON[ERROR_SCRAP.ERR_MSG] = '';
      return false;
    }

    return true;
    requestHeader['Accept'] = '*/*';

    postData = 'phone=' + this.PARAMJSON[PARAM_SCRAP.COMMON_REQ_PHONE_NUM]; //scrap_param.SCRAP_MODULE_PARAM_REQ_PHONE_NO;
    resultData = await httpCls.axiosRequest(
      this.HOST_URL,
      '/teldeny/sms/number.do',
      'POST',
      postData,
      requestHeader,
    );

    return true;

    requestHeader['Accept'] =
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9';

    postData = '';
    postData += 'plusInfo=' + plusInfo;
    postData += '&phoneNo=' + ''; //scrap_param.SCRAP_MODULE_PARAM_REQ_PHONE_NO;
    postData += '&authcode=' + authCode;

    resultData = await httpCls.axiosRequest(
      this.HOST_URL,
      '/teldeny/sms/auth.do',
      'POST',
      postData,
      requestHeader,
    );

    this.parseData = resultData.data;
    return true;
  }

  async parsing() {
    let resultJson = {};

    this.OUTPUTJSON[PARAM_SCRAP.MODULE_RES_RESULT_KEY] =
      'SUCCESS 메세지 전송 성공';
    this.OUTPUTJSON[ERROR_SCRAP.ERR_CODE] = '';
    this.OUTPUTJSON[ERROR_SCRAP.ERR_MSG] = '';
    this.OUTPUTJSON[ERROR_SCRAP.ERR_DEV_MSG] = '';
    this.OUTPUTJSON[PARAM_SCRAP.MODULE_RES_RESULT_LIST];

    return true;
  }

  async sendResult() {
    globalThis.$sendResultJSON = this.OUTPUTJSON;

    return true;
  }
}
