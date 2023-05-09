import styled from "styled-components";

export const Title = styled.h1`
  font-size: 36px;
  color: var(--title-color);
  margin-left: 0.2em;
`;

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

export const Col = styled.div`
  width: 50%;
`;

export const ImageWrapper = styled.span`
  position: absolute;
  bottom: -20px;
  right: -80px;
  width: 300px;
  height: auto;
  overflow: hidden;
`;