declare global {
  var $sendResultJSON; //최종 스크래핑 결과를 저장하는 Global variable
}

export interface ScrapModuleInterface {
  initialize();
  setParameter(INPUTJSON: string);
  login();
  mainScrap();
  parsing();
  sendResult();
}

export {};
