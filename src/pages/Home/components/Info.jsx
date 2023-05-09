import Icon from "../../../assets/svg/hekidesk-transparent.svg";
import HeartbeatIcon from "../../../assets/icon/heartbeat.svg";
import SearchIcon from "../../../assets/icon/question.svg";
import { Image } from "primereact/image";
import { Text } from "../../../components/reusable/Text";
import { ImageWrapper, List, ListItems, QuestionWrapper } from "./CSS";

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
