import styled from "styled-components";

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;
export const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;

export const Col = styled.div`
  width: 50%;
`;

export const SubText = styled.p`
  font-size: 14px;
  color: white;
  display: flex;
  align-itpxs: center;
  margin: 2em 0;
  display: flex;
  align-items: center;
`;

export const ImageWrapper = styled.span`
  position: absolute;
  bottom: -20px;
  right: -80px;
  width: 300px;
  height: auto;
  overflow: hidden;
`;

export const SNBox = styled.span`
  border: 2px solid white;
  padding: 0 1px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 0.8em;
`;
