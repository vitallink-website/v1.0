import styled from "styled-components";
import Icon from "../../../assets/svg/hekidesk-transparent.svg";
import HeartbeatIcon from "../../../assets/icon/heartbeat.svg";
import SearchIcon from "../../../assets/icon/question.svg";
import { Image } from "primereact/image";
import { Text } from "../../../components/reusable/Text";

const ImageWrapper = styled.span`
  position: absolute;
  bottom: -20px;
  right: -80px;
  width: 300px;
  height: auto;
  overflow: hidden;
`;

const QuestionWrapper = styled.span`
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 25px;
  height: auto;
  overflow: hidden;
  cursor: pointer;
`;

const List = styled.ul`
  font-size: 20px;
  font-weight: medium;
  color: white;
  list-style: none;
  margin-top: 2em;
`;

const ListItems = styled.li`
  font-size: 14px;
  color: white;
  text-transform: uppercase;
  display: flex;
  align-itpxs: center;
  margin: 2em 0;
`;

const InfoHome = () => {
  return (
    <span>
      <Text>Smart Device</Text>
      <List>
       
        <ListItems>
          <Image
            src={HeartbeatIcon}
            alt="Image"
            width="16px"
            style={{ margin: "0em 1em" }}
          />
          PERSONAL HEALTH MONITORING
        </ListItems>
     
      </List>
      <ImageWrapper>
        <Image src={Icon} alt="icon" width="100%" />
      </ImageWrapper>
      <QuestionWrapper>
        <Image src={SearchIcon} alt="search" width="100%" />
      </QuestionWrapper>
    </span>
  );
};

export default InfoHome;
