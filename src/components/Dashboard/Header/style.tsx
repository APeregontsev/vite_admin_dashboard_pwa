import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 6px;
  padding-bottom: 50px;
  justify-content: space-between;
  position: relative;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "a" "b";
    padding-bottom: 20px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding-right: 20px;

  @media (max-width: 600px) {
    grid-area: b;
    justify-content: start;
  }
`;

export const HeaderItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;

  @media (max-width: 600px) {
    grid-area: a;
    justify-content: end;
    padding-bottom: 10px;
  }
`;

export const Offline = styled.span`
  color: white;
  background-color: red;
  border-radius: 8px;
  padding: 0 10px;
  line-height: 30px;
`;
