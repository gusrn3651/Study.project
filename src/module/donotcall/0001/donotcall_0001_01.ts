import * as httpCls from 'src/util/httpCls';
import {ERROR_KPAY} from 'src/param/param.error';

export class donotCall0001 {

    constructor(
        private HOST_URL: string,
        private requestHeader: any,
        private resultData: string

    ) {};

    //private readonly HOST_URL = "https://www.donotcall.go.kr";

    async getInit() {
        const host_URL = "AAA";
    }

    async startScraping() {
        
        this.getInit();

        let resultData: any;
        let plusInfo: string;
        let authCode: string;
        let requestHeader = {};
        let postData:string = "";
        let ErrorJson = {};

        requestHeader['Content-type'] = "application/x-www-form-urlencoded";
        requestHeader['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.44";
        requestHeader['Accept'] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9";
        requestHeader['Cookie'] = "";

        ErrorJson["result"] = "FAIL";
        ErrorJson["ERRORCODE"] = ERROR_KPAY["PAGE_CHANGE"];
        

        //return ERROR_KPAY["HTTP_CONNECT"];
        

        return ErrorJson;        

        // requestHeader = {'Content-type': 'application/x-www-form-urlencoded',
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.44',
        // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        // 'Cookie': ''};

        
        resultData = await httpCls.axiosRequest(this.HOST_URL + "/teldeny/","GET","",requestHeader);
        console.log(resultData);

        if(resultData === "") {
            //TODO : ERROR code add
        }

        resultData = await httpCls.axiosRequest(this.HOST_URL + "/teldeny/site/sub01/sub01_01.do","GET","",requestHeader);
        if(resultData === "") {
            ErrorJson["result"] = "FAIL";
            ErrorJson["ERRORCODE"] = "FAIL";
            return ErrorJson;
            //TODO : ERROR code add
        }

        postData = "";
        postData = "mode=step2";
        
        resultData = await httpCls.axiosRequest(this.HOST_URL + "/teldeny/site/sub01/sub01_01.do","POST",postData,requestHeader);
        
        if(resultData === "") {
            //TODO : ERROR code add
        }

        console.log(resultData.headers);    
    
        postData = "mode=cellPhoneCert";
        postData += "&check=on";
        postData += "&check=on";

        resultData = await httpCls.axiosRequest(this.HOST_URL + "/teldeny/site/sub01/sub01_01.do","POST",postData,requestHeader);    
        
        try {
            plusInfo = resultData.data.split("plusInfo\" value=\"")[1].split("\" />")[0];
        }catch(e) {
            //TODO : Error Code Add
        }

        requestHeader['Accept'] = "*/*"
        
        postData = "phone=" + "";//scrap_param.SCRAP_MODULE_PARAM_REQ_PHONE_NO;
        resultData = await httpCls.axiosRequest(this.HOST_URL + "/teldeny/sms/number.do","POST",postData,requestHeader);        
    
    
        requestHeader['Accept'] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9";
    
        postData = "";
        postData += "plusInfo=" + plusInfo;
        postData += "&phoneNo=" + "";//scrap_param.SCRAP_MODULE_PARAM_REQ_PHONE_NO;
        postData += "&authcode=" + authCode;
        
        resultData = await httpCls.axiosRequest(this.HOST_URL + "/teldeny/sms/auth.do","POST",postData,requestHeader);        

        return "SUCCESS";        
        
        return resultData.data;
        console.log("BBB");
        return 'def';
    }

}