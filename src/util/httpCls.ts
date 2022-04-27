import axios, { AxiosResponse } from 'axios';
//import axios * as from 'axios';
 
export async function axiosRequest(requestURL: string, method: any, requestBody: string,requestHeader: any) {

    let responseObj:AxiosResponse;
    let reqURL:string;

    reqURL = requestURL;

    /*
        les = await axios({
        method: method,
        url: requestURL,    
        params : requestBody,
        headers: requestHeader,
        maxRedirects : 0                              // redirect 횟수 0으로 지정시 
        //validateStatus: (status) => (status == 307) // 에러로 확인하지 않고 307 status 는 정상 처리 반환.
        })
    */

    //axios.create({withCredentials:true});

    try {    
        for(let i = 0; i < 2; i++) {
            
            responseObj = await axios({
                method: method,
                url: reqURL,    
                data: requestBody,
                headers: requestHeader,
                maxRedirects : 0,                              // redirect 횟수 0으로 지정시                
                validateStatus: (status) => (status < 500)                
                //validateStatus: (status) => (status == 307) // 에러로 확인하지 않고 307 status 는 정상 처리 반환.
            })
            
            if(responseObj.status == 200) {
                if (responseObj.headers['set-cookie']) 
                    requestHeader['Cookie'] += responseObj.headers['set-cookie'].toString() + ";";
                //requestHeader['Cookie'] += responseObj.headers['set-cookie'].toString() + ";";
                break;                
            }else if((responseObj.status == 302 || responseObj.status == 307)) {
                reqURL = responseObj.headers.location;                
                reqURL = (reqURL.indexOf("http") == -1) ? "https://www.donotcall.go.kr" + reqURL : reqURL;

                method = "get";
                requestBody = "";
                if (responseObj.headers['set-cookie'])
                    requestHeader['Cookie'] += responseObj.headers['set-cookie'].toString() + ";"; //TODO 수정 필요
                console.log("");
                continue;
            }else{
                console.log("http status error");
                return "";  //ERROR
            }
        }

    }catch(e) {

        if (e.response) {
            // Request made and server responded
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        } else if (e.request) {
            // The request was made but no response was received
            console.log(e.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', e.message);
        }
        
        //TODO
        //e.response == undefined error description
        console.log("ERROR!");
        console.log(e.response);
        return "";
    }
    return responseObj;
    //console.log(les);
    //return les;
}