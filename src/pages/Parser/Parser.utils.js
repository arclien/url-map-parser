export const parseHTMLString = (() => {
  const parser = new DOMParser();
  return (str) => parser.parseFromString(str, 'text/html');
})();

export const getSearchStringForDoc = (doc) => {
  return [doc.body.innerText].map((str) => str.trim()).join(' ');
};

export const htmlStringMatchesQuery = (str, query) => {
  const htmlDoc = parseHTMLString(str);
  const htmlSearchString = getSearchStringForDoc(htmlDoc);
  // console.log(htmlSearchString.split(query));
  return htmlSearchString.split(query).map((el) => {
    const regex = /(대한민국|한국)?\s?([서울경기상충청전라제주특별광역자치]+(?:(?:북|남)?도?))?\s?([가-힣]+시?)?\s?([가-힣]+[구군])?\s?([가-힣]+(?:읍|면))?\s?([가-힣]+(?:대?로)?(?:\d*(?:가|나|다|라|마|바|사|아|자|차|카|타|파|하)?길)?)\s(\d{1,4}(?:[-]\d{1,2})?)\s?([(][가-힣\d]+(?:[,]\s[A-Za-z가-힣\d]+)?[)])?\s?(\d{1,2}층)?(\d{1,4}(?:[/-]|동\s)\d{1,4}호?)?\s?([(\w가-힣)]+)?/;
    const regexResult = regex.exec(el);
    return (
      regexResult?.length &&
      regexResult[0].match(/([A-Za-z가-힣\d]+[길로구군읍면대로길동리])/gi) &&
      regexResult[0]?.trim()
    );
  });
  // return stringMatchesQuery(htmlSearchString, query);
};

export const htmlStringMatchesWholeString = (str) => {
  const htmlDoc = parseHTMLString(str);
  const htmlSearchString = getSearchStringForDoc(htmlDoc);
  const regex = /(대한민국|한국)?\s?([서울경기상충청전라제주특별광역자치]+(?:(?:북|남)?도?))?\s?([가-힣]+시)?\s?([가-힣]+[구군])?\s?([가-힣]+(?:읍|면))?\s?([가-힣]+(?:대?로)?(?:\d*(?:가|나|다|라|마|바|사|아|자|차|카|타|파|하)?길)?)\s(\d{1,4}(?:[-]\d{1,2})?)\s?([(][가-힣\d]+(?:[,]\s[A-Za-z가-힣\d]+)?[)])?\s?(\d{1,2}층)?(\d{1,4}(?:[/-]|동\s)\d{1,4}호?)?\s?([(\w가-힣)]+)?/gi;
  const match = htmlSearchString.match(regex);
  return (
    match &&
    match
      .filter((el) => el.match(/([A-Za-z가-힣\d]+[길로구군읍면대로길동리])/gi))
      .map((el) => el.trim())
  );
};

export const parseUrl = async (url) => {
  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      // 에스콰이어의 경우 "주소"로 구분되어있다
      const addressList = htmlStringMatchesQuery(text, '주소') || [];
      // console.log(addressList);
      const addressList2 = htmlStringMatchesWholeString(text) || [];
      // console.log(addressList2);

      return new Set([...addressList, ...addressList2]);
      // console.log(new Set([...addressList, addressList2]));
    });
};
