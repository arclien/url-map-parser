import styled, { css } from 'styled-components';
import {
  font,
  BaseInput,
  flexContainer,
  mobileOnly,
  NewBaseButton,
  white,
  text,
  gray80,
} from 'remember-ui';

export const Container = styled.div`
  /* ${flexContainer('center', 'center', 'column')}; */

  width: 100%;
  height: 116px;
  padding: 10px 16px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const SearchInput = styled(BaseInput)`
  width: 100%;
  height: 44px;
  margin: 0 6px 0 0;
  border-radius: 6px;
  border: solid 3px #000;
  background-color: ${white};

  > input {
    ${font({ size: '14px', color: '#777' })};

    height: 100%;
    border: 0px;
    line-height: 1.86;
    letter-spacing: -1.23px;
  }

  ${mobileOnly(css`
    width: 100%;
  `)};
`;

export const Buttons = styled.div`
  ${flexContainer('space-between', 'center')};

  margin-top: 8px;
`;

export const SearchButton = styled(NewBaseButton)`
  ${font({ size: '14px', weight: 'bold', color: white })};

  width: 48%;
  height: 44px;
  padding: 9px 18px 9px 19px;
  border-radius: 4px;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.3), inset 4px 4px 0 0 #878787,
    inset -4px -4px 0 0 #232323;
  border: solid 2px #000000;
  background-color: #383838;

  line-height: 1.86;
  letter-spacing: -1.23px;

  ${({ full }) =>
    full &&
    css`
      width: 100%;
    `}
`;

export const Body = styled.div`
  padding-top: 20px;
`;

export const Title = styled.div`
  ${font({ size: '16px', weight: 'bold', color: text })};

  margin-bottom: 10px;
`;

export const Examples = styled.div`
  ${flexContainer('space-between', 'center')};

  padding: 10px;
  position: relative;
`;

export const ExampleList = styled.div`
  padding: 10px;
  width: 50%;
  height: 200px;
  overflow-y: scroll;
  border: 1px solid ${gray80};
`;

export const ExampleItem = styled.div`
  ${font({ size: '14px', color: text })};

  padding-bottom: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Result = styled.div`
  ${flexContainer('space-between', 'center')};

  padding: 10px;
  position: relative;
`;

export const ResultList = styled.div`
  padding: 10px;
  width: 300px;
  height: 700px;
  overflow-y: scroll;
  border: 1px solid ${gray80};
`;

export const ResultItem = styled.div`
  ${font({ size: '14px', color: text })};

  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const IframeContainer = styled.div`
  padding: 10px;
  width: calc(100% - 320px);
  height: 700px;
  overflow-y: scroll;
  border: 1px solid ${gray80};
`;
