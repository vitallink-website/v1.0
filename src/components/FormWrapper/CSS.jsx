import styled from "styled-components";
import { devices } from "../../assets/styles/size";

export const Wrapper = styled.div`
  width: 90%;
  min-height: auto;
  background-color: white;
  padding: 1em;
  border-radius: 40px;
  display: flex;
  flex-direction: column-reverse;
  @media ${devices.tablet} {
    flex-direction: row;
    height: 98vh;
    min-height: 95vh;
  }
`;

export const InfoSection = styled.div`
  background: linear-gradient(157deg, #0295d3 1.06%, #92ece6 100%);
  padding: 3em;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  @media ${devices.tablet} {
    width: 50%;
    padding: 4em;
  }
`;

export const FormSection = styled.div`
  padding: 3em;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  position: relative;
  @media ${devices.tablet} {
    width: 50%;
    padding: 6em;
  }
`;
