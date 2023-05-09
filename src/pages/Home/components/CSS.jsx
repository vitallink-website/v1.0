import styled from "styled-components";

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3em;
`;

export const ButtonOKStyle = {
  backgroundColor: "white",
  border: "2px solid var(--title-color)",
  fontSize: "18px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1em 0",
  color: "var(--title-color)",
  padding: "0.4em 0.6em",
  textDecoration: "none",
};

export const ImageWrapper = styled.span`
  position: absolute;
  bottom: -20px;
  right: -80px;
  width: 300px;
  height: auto;
  overflow: hidden;
`;

export const QuestionWrapper = styled.span`
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 25px;
  height: auto;
  overflow: hidden;
  cursor: pointer;
`;

export const List = styled.ul`
  font-size: 20px;
  font-weight: medium;
  color: white;
  list-style: none;
  margin-top: 2em;
`;

export const ListItems = styled.li`
  font-size: 14px;
  color: white;
  text-transform: uppercase;
  display: flex;
  align-itpxs: center;
  margin: 2em 0;
`;

export const Container = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
`;
