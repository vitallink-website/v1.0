import styled from "styled-components";
import { Text } from "../../../components/reusable/Text";
import { Image } from "primereact/image";
import Icon from "../../../assets/svg/hekidesk-transparent.svg";

export const SubText = styled.p`
  font-size: 14px;
  color: white;
  display: flex;
  align-itpxs: center;
  margin: 2em 0;
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.span`
  position: absolute;
  bottom: -20px;
  right: -80px;
  width: 300px;
  height: auto;
  overflow: hidden;
`;

const SNBox = styled.span`
  border: 2px solid white;
  padding: 0 1px;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 0.8em;
`;

const RegisterInfo = () => {
  return (
    <span>
      <br />
      <br />
      <br />
      <Text>Register your device</Text>
      <SubText>
        <SNBox>SN</SNBox> Please enter your serial number
      </SubText>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" />
      </ImageWrapper>
    </span>
  );
};

export default RegisterInfo;
