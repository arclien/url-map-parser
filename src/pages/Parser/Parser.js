import React, { useState } from 'react';

import {
  Container,
  SearchInput,
  Buttons,
  SearchButton,
  Body,
  Example,
  Result,
} from './Parser.styles';

const examples = [
  'https://www.esquirekorea.co.kr/article/54205',
  'https://www.esquirekorea.co.kr/article/54093',
  'https://www.esquirekorea.co.kr/article/48467',
  'https://www.esquirekorea.co.kr/article/47920',
  'https://www.esquirekorea.co.kr/article/54026',
  'https://m.blog.naver.com/zephyr122059/222149179160',
  'https://nagae.tistory.com/4',
];
const Parser = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isParsed, setParsed] = useState(false);
  const [parsedAddressList, setParsedAddressList] = useState(new Set());

  const parseHTMLString = (() => {
    const parser = new DOMParser();
    return (str) => parser.parseFromString(str, 'text/html');
  })();

  const getSearchStringForDoc = (doc) => {
    return [doc.body.innerText].map((str) => str.trim()).join(' ');
  };

  const htmlStringMatchesQuery = (str, query) => {
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

  const htmlStringMatchesWholeString = (str) => {
    const htmlDoc = parseHTMLString(str);
    const htmlSearchString = getSearchStringForDoc(htmlDoc);
    const regex = /(대한민국|한국)?\s?([서울경기상충청전라제주특별광역자치]+(?:(?:북|남)?도?))?\s?([가-힣]+시)?\s?([가-힣]+[구군])?\s?([가-힣]+(?:읍|면))?\s?([가-힣]+(?:대?로)?(?:\d*(?:가|나|다|라|마|바|사|아|자|차|카|타|파|하)?길)?)\s(\d{1,4}(?:[-]\d{1,2})?)\s?([(][가-힣\d]+(?:[,]\s[A-Za-z가-힣\d]+)?[)])?\s?(\d{1,2}층)?(\d{1,4}(?:[/-]|동\s)\d{1,4}호?)?\s?([(\w가-힣)]+)?/gi;
    const match = htmlSearchString.match(regex);
    return (
      match &&
      match
        .filter((el) =>
          el.match(/([A-Za-z가-힣\d]+[길로구군읍면대로길동리])/gi)
        )
        .map((el) => el.trim())
    );
  };

  const parseUrl = async () => {
    if (!searchInput) return;
    setParsed(true);
    await fetch(searchInput)
      .then((response) => response.text())
      .then((text) => {
        // 에스콰이어의 경우 "주소"로 구분되어있다
        const addressList = htmlStringMatchesQuery(text, '주소') || [];
        console.log(addressList);
        const addressList2 = htmlStringMatchesWholeString(text) || [];
        console.log(addressList2);

        setParsedAddressList(new Set([...addressList, ...addressList2]));
        console.log(new Set([...addressList, addressList2]));
      });
  };

  return (
    <Container>
      <SearchInput
        autoFocus
        type="search"
        name="keywordSearch"
        value={searchInput}
        placeholder="검색할 장소를 입력하세요"
        maxLength={50}
        onChange={(e) => setSearchInput(e.target.value)}
        onEnter={parseUrl}
      />
      <Buttons>
        {!isParsed && (
          <>
            <SearchButton
              onClick={() => {
                setParsed(false);
                setSearchInput('');
              }}
            >
              취소
            </SearchButton>
            <SearchButton onClick={parseUrl}>검색</SearchButton>
          </>
        )}
        {isParsed && (
          <SearchButton
            full
            onClick={() => {
              setParsed(false);
              setSearchInput('');
            }}
          >
            다시 검색
          </SearchButton>
        )}
      </Buttons>

      <Body>
        <Example>
          예제 클릭
          {examples.map((el) => (
            <div
              key={el}
              onClick={() => {
                setParsed(false);
                setSearchInput(el);
              }}
            >
              {el}
            </div>
          ))}
        </Example>
        <Result>
          결과
          {[...parsedAddressList].map((el) => (
            <div key={el}>{el}</div>
          ))}
        </Result>
      </Body>
    </Container>
  );
};

export default Parser;
