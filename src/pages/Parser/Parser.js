/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';

import { parseUrl } from './Parser.utils';

import { UrlExamplesCors, UrlExamples } from './ParserExample.constant';

import {
  Container,
  SearchInput,
  Buttons,
  Title,
  SearchButton,
  Body,
  Examples,
  ExampleList,
  ExampleItem,
  Result,
  ResultList,
  ResultItem,
  IframeContainer,
} from './Parser.styles';

const Parser = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isParsed, setParsed] = useState(false);
  const [parsedAddressList, setParsedAddressList] = useState(new Set());

  const searchUrl = async (url) => {
    if (!searchInput && !url) return;
    setParsedAddressList([]);
    setParsed(true);
    const list = await parseUrl(searchInput || url);
    setParsedAddressList(list);
  };

  return (
    <Container>
      <SearchInput
        autoFocus
        type="search"
        name="keywordSearch"
        value={searchInput}
        placeholder="검색할 장소를 입력하세요"
        onChange={(e) => setSearchInput(e.target.value)}
        onEnter={searchUrl}
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
            <SearchButton onClick={searchUrl}>검색</SearchButton>
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
        <Examples>
          <ExampleList>
            <Title>파싱 가능 예제 클릭</Title>
            {UrlExamples.map((el) => (
              <ExampleItem
                key={el}
                onClick={() => {
                  setSearchInput(el);
                  searchUrl(el);
                }}
              >
                {el}
              </ExampleItem>
            ))}
          </ExampleList>
          <ExampleList>
            <Title>Cors 에러 나는 예제</Title>
            {UrlExamplesCors.map((el) => (
              <ExampleItem
                key={el}
                onClick={() => {
                  setSearchInput(el);
                  searchUrl(el);
                }}
              >
                {el}
              </ExampleItem>
            ))}
          </ExampleList>
        </Examples>
        <Result>
          <IframeContainer>
            <Title>웹 Iframe</Title>
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              framespacing="0"
              src={searchInput}
            />
          </IframeContainer>

          <ResultList>
            <Title>결과</Title>
            {[...parsedAddressList].map((el) => (
              <ResultItem key={el}>{el}</ResultItem>
            ))}
          </ResultList>
        </Result>
      </Body>
    </Container>
  );
};

export default Parser;
