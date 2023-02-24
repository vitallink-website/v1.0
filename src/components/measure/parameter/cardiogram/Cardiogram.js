import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../App";
import { useIndexedDB } from "react-indexed-db";
import { shareData } from "../../share/Share";
import { GetCurrentDateTimeDB } from "../../../../utilities/time";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Cardiogram() {
  const UserInfo = useContext(UserContext);

  const { update: updateParameterHistory } = useIndexedDB("cardiogramData");
  const { getByID, update: updateTimeHistory } = useIndexedDB("dataTime");

  const [heartBeat, setHeartBeat] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [PR_RR_INTERVAL, setPR_RR_INTERVAL] = useState(0);
  const [QRS_Duration, setQRSDuration] = useState(0);
  const [p, setP] = useState(0);
  const [q, setQ] = useState(0);
  const [r, setR] = useState(0);
  const [s, setS] = useState(0);
  const [t, setT] = useState(0);

  useEffect(() => {
    const currentDate = GetCurrentDateTimeDB();
    const id = currentDate + UserInfo.id;
    console.log(id);
    getByID(id).then(
      (data) => {
        console.log(data);
        const [dateAndId, ...newData] = data;
        UserInfo.setParameters(newData);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const addToDB = (heartBeat, PR_RR_Interval, QRS_Duration) => {
    const currentDate = GetCurrentDateTimeDB();
    const id = parseInt(String(currentDate + UserInfo.id));

    updateParameterHistory({
      dateAndId: id,
      userId: UserInfo.id,
      heartBeatECG: heartBeat,
      PR_RR_Interval: PR_RR_Interval,
      QRS_Duration: QRS_Duration,
    }).then(
      (event) => {
        console.log("cardiogramData updated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );

    var newParameter = UserInfo.parameters;
    newParameter["heartBeatECG"] = heartBeat;
    newParameter["QRS_Duration"] = QRS_Duration;
    newParameter["PR_RR_Interval"] = PR_RR_Interval;

    updateTimeHistory({
      dateAndId: id,
      userId: UserInfo.id,
      parameters: newParameter,
    }).then(
      (event) => {
        console.log("timeData updated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const calculateBeatPerMinute = (inputs) => {
    const signal_output = Array.from(
      // eslint-disable-next-line no-undef
      ECG_signal_processing_ECG(inputs.data, inputs.freq)
    ); // HeartRate, PR_RR, QRS_duration, Quality_index, P, Q, R, S, T
    console.log(inputs);
    console.log(inputs.data[Array.from(signal_output[4])[0]]);
    console.log(signal_output[0]);
    console.log(signal_output[1]);
    console.log(signal_output[2]);
    console.log(signal_output[3]);
    console.log(Array.from(signal_output[4]));
    console.log(Array.from(signal_output[5]));
    console.log(Array.from(signal_output[6]));
    console.log(Array.from(signal_output[7]));
    console.log(Array.from(signal_output[8]));

    if (inputs.freq !== 0) {
      const heartBeat = Number(
        signal_output[Object.keys(signal_output)[0]]
      ).toFixed(0);
      const PR_RR_Interval = Number(
        signal_output[Object.keys(signal_output)[1]]
      ).toFixed(2);
      const QRS_Duration = Number(
        signal_output[Object.keys(signal_output)[2]]
      ).toFixed(2);
      setHeartBeat(heartBeat);
      setPR_RR_INTERVAL(PR_RR_Interval);
      setQRSDuration(QRS_Duration);
      setQualityIndex(
        Number(signal_output[Object.keys(signal_output)[3]]).toFixed(0)
      );
      let newPArr = [];
      let newQArr = [];
      let newRArr = [];
      let newSArr = [];
      let newTArr = [];
      for (const p of Array.from(signal_output[4]))
        newPArr.push({ x: p, y: inputs.data[p] });
      for (const q of Array.from(signal_output[5]))
        newQArr.push({ x: q, y: inputs.data[q] });
      for (const r of Array.from(signal_output[6]))
        newRArr.push({ x: r, y: inputs.data[r] });
      for (const s of Array.from(signal_output[7]))
        newSArr.push({ x: s, y: inputs.data[s] });
      for (const t of Array.from(signal_output[7]))
        newTArr.push({ x: t, y: inputs.data[t] });
      console.log("newParr: " + JSON.stringify(newPArr));
      setP(newPArr);
      setQ(newQArr);
      setR(newRArr);
      setS(newSArr);
      setT(newTArr);
      // addToDB(heartBeat, PR_RR_Interval, QRS_Duration);
    }
  };

  return (
    <MeasureBase
      {...{
        name: "ecg",
        command: 0x02,
        action: calculateBeatPerMinute,
        texts: ["Heart beat: " + heartBeat],
        title: (openModal) => (
          <>
            <h2 className="measure-title">Cardiogram</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                  Please put your right and left fingers on ECG sensors and then
                  press
                </h5>
              </Col>
              <Col sm={2}>
                <Button onClick={openModal}>Start</Button>
              </Col>
            </Row>
          </>
        ),
        children: () => (
          <>
            <Row className="measure-button-row">
              <Col>
                <h5 style={{ color: "black" }}>Heartbeat: {heartBeat} (bpm)</h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>
                  PR/RR Interval: {PR_RR_INTERVAL}
                </h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>QRS Duration: {QRS_Duration}</h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>
                  Quality Index: {qualityIndex}
                </h5>
              </Col>
            </Row>
            <Row className="measure-button-row">
              <Col>
                <Link to="/Measure/Measurement">
                  <Button> Back</Button>
                </Link>
              </Col>
              <Col>
                {/* <Link to="/Measure/Measurement/Cardiogram/AbnormalityDetection"> */}
                <Button disabled>Abnormality Detection</Button>
                {/* </Link> */}
              </Col>
              <Col>
                <Button
                  onClick={() =>
                    shareData("CardiogramData", ["Heart beat: " + heartBeat])
                  }
                >
                  output
                </Button>
              </Col>
              <Col>
                <Link to="/">
                  <Button>Save</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={() =>
                    calculateBeatPerMinute({ data: ppg_data, freq: 120 })
                  }
                >
                  Calculate
                </Button>
              </Col>
            </Row>
          </>
        ),
      }}
    />
  );
}

export default Cardiogram;

const ppg_data = [
  26451, 26438, 26434, 26441, 26444, 26428, 26377, 26299, 26223, 26191, 26191,
  26212, 26251, 26301, 26333, 26334, 26286, 26224, 26179, 26156, 26162, 26221,
  26288, 26352, 26416, 26446, 26439, 26428, 26435, 26464, 26518, 26620, 26733,
  26811, 26848, 26846, 26804, 26719, 26645, 26601, 26588, 26602, 26651, 26707,
  26726, 26708, 26659, 26581, 26501, 26443, 26443, 26479, 26525, 26582, 26620,
  26621, 26582, 26539, 26509, 26496, 26512, 26555, 26606, 26673, 26760, 26859,
  26948, 27016, 27069, 27101, 27115, 27120, 27126, 27133, 27144, 27175, 27225,
  27281, 27327, 27362, 27375, 27359, 27335, 27316, 27297, 27275, 27275, 27292,
  27293, 27304, 27302, 27262, 27201, 27134, 27069, 27015, 26963, 26932, 26918,
  26896, 26882, 26897, 26927, 26963, 26999, 27037, 27082, 27127, 27165, 27195,
  27210, 27217, 27207, 27204, 27224, 27245, 27271, 27303, 27323, 27338, 27329,
  27295, 27240, 27183, 27141, 27124, 27147, 27205, 27275, 27342, 27368, 27373,
  27340, 27288, 27218, 27160, 27143, 27150, 27180, 27211, 27247, 27277, 27263,
  27215, 27163, 27116, 27089, 27108, 27127, 27168, 27195, 27203, 27204, 27198,
  27174, 27142, 27112, 27093, 27087, 27085, 27098, 27138, 27187, 27231, 27277,
  27325, 27355, 27374, 27381, 27381, 27360, 27328, 27323, 27309, 27313, 27355,
  27404, 27462, 27518, 27564, 27572, 27543, 27492, 27424, 27364, 27355, 27385,
  27427, 27453, 27443, 27407, 27360, 27308, 27272, 27272, 27295, 27332, 27387,
  27458, 27513, 27530, 27534, 27539, 27545, 27562, 27591, 27620, 27647, 27679,
  27705, 27726, 27709, 27669, 27625, 27593, 27567, 27553, 27552, 27552, 27549,
  27570, 27592, 27597, 27579, 27548, 27539, 27549, 27561, 27577, 27603, 27619,
  27614, 27610, 27620, 27638, 27668, 27708, 27756, 27806, 27850, 27887, 27904,
  27904, 27917, 27944, 27964, 27977, 27982, 27984, 27971, 27959, 27978, 28012,
  28069, 28147, 28209, 28253, 28271, 28262, 28223, 28164, 28097, 28063, 28062,
  28084, 28128, 28189, 28235, 28252, 28237, 28205, 28150, 28096, 28046, 28029,
  28054, 28100, 28152, 28202, 28246, 28258, 28228, 28181, 28149, 28123, 28101,
  28083, 28060, 28031, 27999, 27955, 27906, 27840, 27775, 27712, 27659, 27608,
  27586, 27601, 27627, 27672, 27727, 27776, 27827, 27868, 27902, 27933, 27949,
  27953, 27940, 27930, 27938, 27949, 27969, 27989, 28020, 28060, 28089, 28108,
  28117, 28107, 28094, 28097, 28127, 28167, 28222, 28276, 28321, 28338, 28327,
  28303, 28276, 28256, 28253, 28266, 28301, 28348, 28381, 28408, 28434, 28451,
  28455, 28448, 28455, 28477, 28517, 28580, 28620, 28630, 28645, 28640, 28621,
  28610, 28617, 28630, 28662, 28658, 28688, 28718, 28729, 28728, 28727, 28736,
  28752, 28788, 28846, 28907, 28955, 28991, 29013, 29020, 29012, 29004, 29001,
  29013, 29033, 29069, 29113, 29152, 29186, 29207, 29207, 29206, 29196, 29182,
  29171, 29155, 29110, 29046, 28968, 28893, 28839, 28808, 28787, 28773, 28766,
  28749, 28729, 28705, 28690, 28680, 28690, 28723, 28753, 28778, 28789, 28789,
  28772, 28734, 28699, 28676, 28690, 28739, 28795, 28830, 28845, 28848, 28853,
  28843, 28823, 28822, 28836, 28861, 28884, 28906, 28909, 28879, 28843, 28805,
  28764, 28715, 28679, 28667, 28675, 28696, 28715, 28736, 28726, 28679, 28615,
  28549, 28496, 28464, 28455, 28474, 28510, 28541, 28563, 28563, 28564, 28547,
  28517, 28503, 28505, 28507, 28491, 28496, 28522, 28535, 28551, 28574, 28590,
  28597, 28606, 28630, 28653, 28680, 28723, 28778, 28833, 28887, 28930, 28959,
  28982, 28995, 28990, 28973, 28971, 28973, 28970, 28947, 28916, 28866, 28814,
  28777, 28760, 28743, 28741, 28751, 28741, 28721, 28710, 28709, 28699, 28709,
  28733, 28754, 28766, 28776, 28791, 28803, 28828, 28869, 28900, 28926, 28943,
  28942, 28927, 28905, 28899, 28908, 28931, 28968, 29007, 29042, 29070, 29074,
  29065, 29049, 29021, 28998, 28992, 28986, 28996, 29011, 29011, 28995, 28976,
  28952, 28918, 28895, 28884, 28881, 28892, 28922, 28941, 28949, 28946, 28919,
  28886, 28868, 28876, 28905, 28961, 29023, 29071, 29094, 29105, 29095, 29066,
  29037, 29010, 28990, 28991, 29006, 29019, 29017, 29015, 29011, 29003, 29006,
  29018, 29025, 29020, 29007, 29001, 28993, 28993, 28999, 29014, 29014, 29008,
  28996, 28969, 28935, 28890, 28846, 28814, 28788, 28771, 28760, 28747, 28725,
  28708, 28702, 28716, 28731, 28748, 28784, 28809, 28827, 28851, 28861, 28865,
  28875, 28898, 28916, 28933, 28953, 28981, 29005, 29034, 29056, 29070, 29088,
  29096, 29093, 29097, 29108, 29124, 29137, 29148, 29155, 29157, 29150, 29131,
  29111, 29096, 29092, 29097, 29104, 29096, 29073, 29029, 28983, 28952, 28938,
  28934, 28945, 28968, 28982, 28984, 28983, 28971, 28942, 28929, 28918, 28913,
  28918, 28949, 28980, 29012, 29035, 29039, 29043, 29045, 29063, 29096, 29129,
  29170, 29222, 29267, 29302, 29335, 29348, 29342, 29344, 29347, 29347, 29355,
  29376, 29402, 29429, 29454, 29466, 29469, 29455, 29426, 29381, 29333, 29272,
  29227, 29200, 29177, 29159, 29147, 29136, 29134, 29150, 29167, 29183, 29199,
  29213, 29226, 29236, 29233, 29231, 29229, 29228, 29226, 29232, 29229, 29211,
  29192, 29166, 29130, 29095, 29063, 29039, 29031, 29035, 29050, 29070, 29078,
  29084, 29088, 29078, 29069, 29055, 29050, 29049, 29054, 29060, 29066, 29064,
  29061, 29056, 29055, 29053, 29050, 29046, 29033, 29023, 29018, 29014, 29010,
  29010, 28994, 28979, 28967, 28958, 28947, 28940, 28926, 28917, 28914, 28912,
  28906, 28890, 28892, 28891, 28890, 28908, 28930, 28953, 28978, 29013, 29030,
  29031, 29026, 29014, 29001, 28997, 28999, 28998, 29008, 29014, 29023, 29025,
  29015, 29011, 29016, 29021, 29017, 29011, 28991, 28958, 28909, 28853, 28802,
  28754, 28723, 28715, 28718, 28731, 28752, 28777, 28801, 28816, 28833, 28851,
  28871, 28881, 28893, 28903, 28924, 28967, 29018, 29072, 29123, 29161, 29184,
  29193, 29183, 29161, 29134, 29129, 29141, 29172, 29222, 29280, 29330, 29363,
  29373, 29366, 29339, 29319, 29307, 29303, 29308, 29325, 29349, 29363, 29372,
  29365, 29344, 29328, 29312, 29302, 29315, 29330, 29348, 29363, 29367, 29366,
  29365, 29360, 29366, 29389, 29412, 29427, 29443, 29460, 29483, 29495, 29505,
  29509, 29505, 29510, 29512, 29522, 29535, 29550, 29566, 29584, 29591, 29595,
  29589, 29586, 29587, 29585, 29596, 29607, 29625, 29648, 29661, 29663, 29648,
  29618, 29575, 29531, 29490, 29458, 29440, 29437, 29448, 29467, 29482, 29493,
  29505, 29519, 29536, 29554, 29582, 29611, 29645, 29679, 29712, 29731, 29730,
  29713, 29683, 29657, 29640, 29635, 29652, 29684, 29711, 29736, 29742, 29734,
  29716, 29701, 29694, 29691, 29695, 29705, 29714, 29716, 29710, 29686, 29663,
  29638, 29615, 29607, 29607, 29608, 29614, 29613, 29612, 29604, 29596, 29592,
  29587, 29585, 29582, 29572, 29557, 29536, 29515, 29503, 29504, 29515, 29528,
  29538, 29545, 29550, 29551, 29558, 29555, 29559, 29565, 29571, 29586, 29595,
  29601, 29602, 29600, 29594, 29581, 29573, 29572, 29578, 29593, 29605, 29604,
  29589, 29559, 29511, 29461, 29420, 29399, 29385, 29383, 29385, 29381, 29375,
  29362, 29345, 29331, 29332, 29348, 29362, 29385, 29397, 29400, 29394, 29389,
  29389, 29392, 29393, 29395, 29387, 29378, 29364, 29350, 29335, 29304, 29271,
  29244, 29225, 29219, 29220, 29237, 29256, 29272, 29276, 29262, 29225, 29179,
  29138, 29096, 29079, 29083, 29095, 29112, 29135, 29152, 29155, 29156, 29147,
  29140, 29141, 29133, 29120, 29114, 29110, 29105, 29103, 29106, 29109, 29119,
  29125, 29135, 29160, 29183, 29201, 29213, 29230, 29240, 29238, 29239, 29248,
  29269, 29295, 29323, 29356, 29373, 29375, 29370, 29365, 29354, 29345, 29346,
  29356, 29369, 29384, 29406, 29427, 29428, 29404, 29362, 29305, 29240, 29180,
  29143, 29128, 29123, 29142, 29170, 29198, 29221, 29236, 29240, 29246, 29247,
  29246, 29259, 29274, 29296, 29313, 29315, 29300, 29268, 29230, 29199, 29190,
  29209, 29238, 29272, 29305, 29325, 29327, 29324, 29319, 29314, 29325, 29343,
  29364, 29382, 29396, 29395, 29379, 29358, 29344, 29327, 29315, 29324, 29343,
  29370, 29387, 29398, 29401, 29394, 29375, 29360, 29356, 29358, 29370, 29396,
  29412, 29413, 29414, 29406, 29392, 29381, 29366, 29367, 29388, 29414, 29442,
  29474, 29497, 29519, 29536, 29553, 29558, 29566, 29578, 29590, 29611, 29638,
  29671, 29707, 29727, 29744, 29755, 29755, 29745, 29732, 29727, 29726, 29729,
  29738, 29745, 29730, 29696, 29641, 29573, 29500, 29442, 29403, 29388, 29401,
  29419, 29432, 29430, 29423, 29416, 29415, 29419, 29436, 29468, 29498, 29532,
  29562, 29578, 29578, 29563, 29543, 29520, 29506, 29513, 29537, 29567, 29597,
  29620, 29631, 29628, 29610, 29585, 29568, 29567, 29579, 29601, 29634, 29660,
  29680, 29684, 29674, 29651, 29615, 29586, 29575, 29577, 29596, 29623, 29654,
  29679, 29700, 29711, 29714, 29717, 29720, 29727, 29724, 29726, 29732, 29735,
  29728, 29715, 29693, 29677, 29669, 29667, 29671, 29670, 29669, 29665, 29648,
  29635, 29622, 29607, 29602, 29607, 29625, 29643, 29652, 29649, 29630, 29605,
  29576, 29545, 29520, 29500, 29492, 29498, 29512, 29529, 29535, 29519, 29476,
  29409, 29333, 29265, 29220, 29205, 29219, 29242, 29274, 29308, 29331, 29339,
  29333, 29330, 29336, 29354, 29377, 29398, 29416, 29428, 29426, 29412, 29392,
  29373, 29364, 29373, 29391, 29413, 29434, 29453, 29464, 29471, 29474, 29473,
  29479, 29484, 29497, 29513, 29521, 29518, 29501, 29478, 29449, 29418, 29392,
  29376, 29372, 29381, 29396, 29409, 29422, 29429, 29422, 29398, 29373, 29362,
  29356, 29371, 29394, 29419, 29445, 29460, 29466, 29462, 29449, 29433, 29425,
  29426, 29443, 29471, 29505, 29539, 29561, 29567, 29566, 29556, 29552, 29548,
  29557, 29569, 29587, 29604, 29621, 29629, 29633, 29628, 29618, 29610, 29613,
  29614, 29614, 29605, 29579, 29549, 29515, 29475, 29436, 29405, 29380, 29371,
  29371, 29370, 29365, 29361, 29348, 29331, 29319, 29318, 29326, 29338, 29355,
  29362, 29373, 29392, 29396, 29397, 29404, 29412, 29411, 29413, 29427, 29446,
  29473, 29507, 29550, 29586, 29611, 29627, 29633, 29633, 29620, 29608, 29599,
  29589, 29579, 29575, 29581, 29589, 29588, 29587, 29580, 29566, 29547, 29534,
  29512, 29501, 29496, 29501, 29511, 29522, 29530, 29546, 29553, 29560, 29562,
  29564, 29562, 29553, 29548, 29550, 29555, 29571, 29587, 29613, 29626, 29632,
  29639, 29644, 29646, 29647, 29648, 29658, 29673, 29688, 29704, 29715, 29722,
  29733, 29739, 29743, 29748, 29739, 29722, 29697, 29663, 29625, 29594, 29560,
  29533, 29492, 29448, 29406, 29367, 29335, 29307, 29293, 29293, 29298, 29302,
  29300, 29295, 29277, 29258, 29241, 29233, 29235, 29246, 29261, 29273, 29273,
  29258, 29244, 29242, 29250, 29273, 29309, 29351, 29386, 29410, 29424, 29425,
  29425, 29422, 29423, 29433, 29454, 29476, 29491, 29496, 29487, 29462, 29429,
  29401, 29371, 29346, 29330, 29324, 29329, 29341, 29361, 29385, 29389, 29376,
  29349, 29317, 29293, 29289, 29297, 29321, 29349, 29378, 29395, 29404, 29404,
  29401, 29397, 29391, 29390, 29406, 29424, 29445, 29455, 29465, 29463, 29454,
  29426, 29398, 29371, 29363, 29375, 29402, 29435, 29465, 29482, 29480, 29451,
  29396, 29326, 29255, 29200, 29179, 29179, 29187, 29207, 29215, 29211, 29193,
  29168, 29131, 29116, 29123, 29141, 29170, 29200, 29225, 29236, 29229, 29215,
  29194, 29182, 29181, 29189, 29212, 29234, 29257, 29282, 29300, 29302, 29292,
  29277, 29272, 29269, 29275, 29294, 29304, 29314, 29323, 29323, 29317, 29303,
  29288, 29269, 29253, 29246, 29252, 29259, 29269, 29270, 29266, 29259, 29247,
  29233, 29225, 29222, 29229, 29250, 29281, 29312, 29340, 29362, 29380, 29386,
  29389, 29394, 29403, 29413, 29429, 29455, 29477, 29500, 29523, 29542, 29547,
  29551, 29542, 29532, 29533, 29541, 29551, 29564, 29583, 29598, 29610, 29621,
  29615, 29610, 29599, 29583, 29572, 29558, 29548, 29546, 29541, 29535, 29522,
  29511, 29505, 29503, 29499, 29503, 29516, 29532, 29549, 29559, 29573, 29581,
  29598, 29613, 29640, 29675, 29697, 29706, 29690, 29664, 29634, 29609, 29600,
  29606, 29628, 29652, 29676, 29702, 29712, 29705, 29689, 29667, 29646, 29625,
  29623, 29624, 29628, 29642, 29659, 29666, 29659, 29641, 29606, 29560, 29528,
  29508, 29501, 29514, 29532, 29556, 29571, 29573, 29562, 29544, 29514, 29483,
  29455, 29427, 29410, 29399, 29396, 29393, 29391, 29386, 29376, 29356, 29331,
  29312, 29293, 29295, 29307, 29332, 29349, 29362, 29367, 29357, 29334, 29304,
  29272, 29245, 29227, 29234, 29234, 29227, 29215, 29198, 29173, 29150, 29127,
  29116, 29114, 29128, 29151, 29179, 29203, 29220, 29236, 29239, 29238, 29234,
  29241, 29252, 29268, 29287, 29308, 29316, 29321, 29323, 29321, 29311, 29304,
  29305, 29307, 29304, 29301, 29293, 29270, 29253, 29235, 29209, 29187, 29174,
  29161, 29154, 29153, 29160, 29163, 29167, 29169, 29181, 29188, 29186, 29184,
  29175, 29175, 29181, 29193, 29213, 29229, 29248, 29269, 29280, 29296, 29324,
  29349, 29361, 29367, 29368, 29359, 29359, 29352, 29353, 29357, 29369, 29386,
  29417, 29454, 29492, 29516, 29531, 29536, 29521, 29497, 29470, 29454, 29450,
  29455, 29474, 29501, 29526, 29541, 29542, 29528, 29482, 29414, 29334, 29262,
  29204, 29171, 29158, 29154, 29150, 29132, 29101, 29069, 29043, 29016, 28991,
  28984, 28994, 29013, 29025, 29046, 29055, 29056, 29056, 29054, 29056, 29060,
  29075, 29096, 29116, 29128, 29123, 29114, 29107, 29087, 29073, 29072, 29086,
  29102, 29135, 29162, 29181, 29192, 29191, 29181, 29154, 29125, 29106, 29092,
  29097, 29113, 29136, 29163, 29175, 29169, 29149, 29118, 29092, 29073, 29068,
  29078, 29094, 29115, 29140, 29164, 29164, 29144, 29113, 29075, 29045, 29029,
  29035, 29069, 29114, 29164, 29217, 29261, 29268, 29258, 29230, 29204, 29177,
  29175, 29197, 29234, 29275, 29324, 29363, 29398, 29414, 29417, 29409, 29398,
  29388, 29373, 29348, 29325, 29295, 29262, 29232, 29208, 29178, 29143, 29110,
  29071, 29042, 29020, 29013, 29016, 29040, 29054, 29048, 29024, 28982, 28940,
  28888, 28844, 28830, 28801, 28819, 28848, 28864, 28865, 28861, 28839, 28799,
  28771, 28767, 28773, 28812, 28869, 28932, 28991, 29035, 29060, 29064, 29057,
  29043, 29029, 29027, 29039, 29049, 29065, 29078, 29091, 29094, 29097, 29101,
  29103, 29115, 29125, 29134, 29144, 29141, 29133, 29125, 29115, 29104, 29096,
  29088, 29087, 29097, 29109, 29128, 29148, 29166, 29174, 29182, 29190, 29199,
  29210, 29235, 29271, 29309, 29341, 29361, 29372, 29371, 29363, 29350, 29343,
  29350, 29371, 29403, 29438, 29468, 29487, 29497, 29492, 29469, 29440, 29417,
  29401, 29385, 29365, 29347, 29331, 29314, 29301, 29288, 29267, 29242, 29217,
  29206, 29206, 29209, 29236, 29272, 29305, 29335, 29359, 29375, 29386, 29394,
  29401, 29406, 29419, 29440, 29468, 29503, 29531, 29562, 29582, 29591, 29584,
  29578, 29567, 29554, 29553, 29552, 29565, 29583, 29603, 29625, 29635, 29626,
  29604, 29570, 29538, 29511, 29499, 29493, 29498, 29510, 29518, 29529, 29530,
  29523, 29508, 29486, 29460, 29433, 29426, 29422, 29420, 29431, 29444, 29444,
  29435, 29419, 29403, 29387, 29378, 29370, 29373, 29384, 29396, 29405, 29421,
  29430, 29429, 29423, 29416, 29405, 29409, 29427, 29450, 29487, 29523, 29549,
  29571, 29582, 29586, 29578, 29556, 29522, 29483, 29449, 29425, 29419, 29427,
  29433, 29436, 29425, 29401, 29369, 29339, 29314, 29302, 29308, 29325, 29346,
  29372, 29394, 29405, 29408, 29407, 29405, 29404, 29405, 29407, 29411, 29421,
  29426, 29422, 29416, 29409, 29404, 29398, 29402, 29411, 29428, 29450, 29481,
  29506, 29529, 29537, 29531, 29514, 29492, 29476, 29462, 29468, 29491, 29517,
  29551, 29578, 29600, 29604, 29599, 29588, 29571, 29563, 29564, 29582, 29609,
  29642, 29670, 29689, 29698, 29685, 29660, 29635, 29617, 29611, 29615, 29636,
  29655, 29674, 29679, 29692, 29691, 29681, 29670, 29661, 29655, 29660, 29669,
  29685, 29704, 29712, 29709, 29704, 29687, 29645, 29588, 29518, 29455, 29401,
  29366, 29340, 29332, 29323, 29305, 29278, 29245, 29212, 29188, 29186, 29200,
  29230, 29269, 29307, 29326, 29323, 29301, 29264, 29227, 29207, 29191, 29184,
  29188, 29199, 29217, 29234, 29252, 29266, 29275, 29271, 29260, 29250, 29246,
  29258, 29276, 29306, 29340, 29369, 29383, 29379, 29363, 29343, 29323, 29306,
  29294, 29287, 29281, 29290, 29305, 29308, 29310, 29317, 29321, 29329, 29343,
  29365, 29391, 29408, 29421, 29423, 29423, 29425, 29416, 29410, 29409, 29408,
  29420, 29449, 29485, 29520, 29548, 29578, 29599, 29610, 29604, 29584, 29566,
  29558, 29556, 29569, 29598, 29626, 29648, 29656, 29639, 29598, 29534, 29466,
  29405, 29365, 29355, 29365, 29383, 29402, 29413, 29400, 29367, 29323, 29280,
  29253, 29251, 29266, 29303, 29344, 29383, 29413, 29424, 29419, 29394, 29359,
  29318, 29287, 29280, 29290, 29309, 29327, 29345, 29356, 29349, 29330, 29302,
  29275, 29255, 29249, 29264, 29281, 29306, 29320, 29314, 29291, 29257, 29218,
  29187, 29167, 29152, 29153, 29171, 29194, 29219, 29235, 29242, 29233, 29211,
  29185, 29159, 29147, 29143, 29150, 29176, 29212, 29244, 29269, 29281, 29285,
  29274, 29255, 29244, 29255, 29272, 29304, 29348, 29391, 29418, 29424, 29410,
  29389, 29361, 29336, 29320, 29323, 29334, 29349, 29365, 29373, 29368, 29352,
  29322, 29272, 29221, 29164, 29126, 29114, 29106, 29109, 29124, 29140, 29141,
  29137, 29115, 29094, 29080, 29079, 29094, 29112, 29135, 29157, 29163, 29155,
  29126, 29084, 29048, 29017, 28995, 28986, 28993, 29001, 28999, 28995, 28988,
  28976, 28947, 28927, 28906, 28896, 28899, 28920, 28941, 28954, 28965, 28968,
  28951, 28923, 28898, 28875, 28873, 28894, 28914, 28943, 28970, 28992, 28993,
  28978, 28952, 28918, 28896, 28897, 28916, 28945, 28984, 29025, 29061, 29075,
  29071, 29058, 29042, 29023, 29022, 29041, 29073, 29114, 29154, 29198, 29222,
  29243, 29236, 29229, 29217, 29208, 29217, 29243, 29279, 29321, 29358, 29372,
  29363, 29328, 29275, 29212, 29161, 29136, 29125, 29134, 29154, 29188, 29219,
  29242, 29254, 29243, 29217, 29189, 29176, 29182, 29195, 29221, 29250, 29274,
  29286, 29285, 29270, 29247, 29229, 29223, 29230, 29248, 29270, 29295, 29323,
  29348, 29359, 29362, 29356, 29347, 29338, 29334, 29332, 29330, 29324, 29321,
  29310, 29304, 29293, 29281, 29263, 29248, 29239, 29237, 29247, 29265, 29283,
  29293, 29301, 29293, 29282, 29270, 29256, 29247, 29242, 29249, 29277, 29310,
  29340, 29372, 29391, 29392, 29389, 29385, 29391, 29411, 29445, 29488, 29534,
  29577, 29608, 29630, 29640, 29641, 29633, 29629, 29629, 29636, 29646, 29646,
  29638, 29618, 29589, 29555, 29523, 29485, 29450, 29426, 29423, 29433, 29465,
  29501, 29534, 29559, 29574, 29574, 29564, 29543, 29515, 29493, 29473, 29463,
  29459, 29464, 29474, 29487, 29502, 29510, 29508, 29500, 29491, 29477, 29473,
  29481, 29501, 29534, 29560, 29574, 29582, 29570, 29539, 29496, 29462, 29436,
  29427, 29435, 29463, 29485, 29504, 29517, 29516, 29500, 29466, 29426, 29399,
  29388, 29393, 29411, 29432, 29441, 29448, 29450, 29445, 29439, 29434, 29433,
  29440, 29457, 29481, 29507, 29521, 29527, 29522, 29511, 29498, 29489, 29488,
  29487, 29493, 29498, 29490, 29474, 29452, 29428, 29404, 29378, 29351, 29320,
  29275, 29222, 29178, 29127, 29082, 29042, 29002, 28971, 28950, 28938, 28939,
  28956, 28979, 29004, 29033, 29064, 29081, 29069, 29042, 29002, 28967, 28942,
  28935, 28953, 28983, 29015, 29046, 29067, 29075, 29065, 29044, 29018, 28995,
  28996, 29020, 29058, 29107, 29155, 29182, 29196, 29189, 29157, 29114, 29084,
  29074, 29081, 29109, 29159, 29194, 29214, 29221, 29193, 29146, 29103, 29067,
  29056, 29075, 29116, 29171, 29220, 29256, 29275, 29270, 29244, 29211, 29182,
  29161, 29152, 29164, 29191, 29229, 29273, 29307, 29330, 29334, 29325, 29307,
  29280, 29260, 29256, 29272, 29305, 29341, 29365, 29376, 29378, 29357, 29337,
  29315, 29290, 29272, 29255, 29242, 29231, 29213, 29188, 29154, 29113, 29070,
  29030, 29002, 28992, 29000, 29042, 29086, 29119, 29136, 29140, 29116, 29078,
  29037, 29010, 28989, 28986, 29007, 29043, 29080, 29105, 29129, 29128, 29110,
  29093, 29089, 29098, 29118, 29146, 29184, 29221, 29247, 29267, 29280, 29285,
  29284, 29276, 29264, 29260, 29270, 29278, 29295, 29306, 29310, 29297, 29282,
  29268, 29264, 29264, 29275, 29284, 29292, 29307, 29321, 29338, 29347, 29353,
  29357, 29358, 29365, 29382, 29408, 29439, 29456, 29473, 29487, 29501, 29510,
  29514, 29514, 29514, 29524, 29537, 29554, 29560, 29570, 29577, 29577, 29578,
  29568, 29551, 29536, 29524, 29515, 29510, 29511, 29511, 29494, 29456, 29405,
  29343, 29286, 29237, 29203, 29192, 29195, 29203, 29210, 29218, 29218, 29211,
  29205, 29209, 29213, 29227, 29246, 29271, 29296, 29320, 29341, 29351, 29344,
  29335, 29326, 29326, 29337, 29356, 29386, 29426, 29460, 29491, 29520, 29538,
  29540, 29531, 29513, 29499, 29491, 29489, 29495, 29506, 29520, 29529, 29523,
  29517, 29501, 29483, 29453, 29445, 29444, 29448, 29458, 29469, 29467, 29459,
  29444, 29413, 29379, 29351, 29337, 29338, 29337, 29337, 29335, 29329, 29328,
  29327, 29322, 29319, 29310, 29317, 29332, 29348, 29373, 29390, 29406, 29405,
  29385, 29364, 29341, 29334, 29334, 29337, 29352, 29380, 29404, 29424, 29432,
  29420, 29391, 29350, 29301, 29251, 29222, 29211, 29208, 29204, 29205, 29206,
  29201, 29193, 29179, 29167, 29152, 29148, 29159, 29176, 29190, 29193, 29182,
  29163, 29142, 29132, 29121, 29115, 29121, 29138, 29164, 29188, 29209, 29231,
  29239, 29238, 29242, 29248, 29251, 29267, 29294, 29327, 29362, 29397, 29424,
  29432, 29427, 29412, 29392, 29371, 29363, 29362, 29374, 29395, 29422, 29452,
  29484, 29497, 29502, 29482, 29450, 29415, 29390, 29389, 29404, 29437, 29477,
  29509, 29528, 29527, 29512, 29484, 29450, 29424, 29408, 29406, 29415, 29440,
  29477, 29510, 29531, 29548, 29548, 29514, 29476, 29440, 29415, 29411, 29428,
  29451, 29487, 29517, 29520, 29497, 29448, 29374, 29303, 29248, 29218, 29202,
  29206, 29239, 29272, 29291, 29307, 29310, 29293, 29263, 29242, 29228, 29227,
  29230, 29243, 29261, 29278, 29284, 29283, 29268, 29245, 29218, 29195, 29177,
  29165, 29171, 29188, 29209, 29223, 29230, 29231, 29223, 29216, 29216, 29219,
  29220, 29230, 29247, 29260, 29269, 29273, 29270, 29259, 29239, 29219, 29203,
  29189, 29176, 29172, 29176, 29199, 29222, 29245, 29252, 29243, 29219, 29193,
  29184, 29187, 29195, 29217, 29248, 29276, 29301, 29316, 29327, 29326, 29322,
  29310, 29302, 29298, 29299, 29305, 29327, 29354, 29377, 29394, 29396, 29382,
  29370, 29356, 29339, 29324, 29320, 29312, 29304, 29300, 29289, 29253, 29198,
  29134, 29071, 28992, 28944, 28924, 28918, 28920, 28934, 28944, 28938, 28932,
  28920, 28894, 28865, 28832, 28805, 28789, 28796, 28807, 28842, 28887, 28921,
  28944, 28939, 28912, 28873, 28838, 28801, 28787, 28795, 28818, 28856, 28895,
  28930, 28955, 28973, 28974, 28975, 28981, 28997, 29015, 29039, 29077, 29106,
  29124, 29139, 29137, 29123, 29102, 29075, 29051, 29048, 29051, 29075, 29101,
  29124, 29136, 29139, 29129, 29109, 29089, 29067, 29065, 29080, 29105, 29131,
  29144, 29132, 29112, 29087, 29059, 29027, 29020, 29032, 29073, 29128, 29179,
  29224, 29253, 29270, 29264, 29245, 29220, 29193, 29178, 29186, 29211, 29244,
  29277, 29306, 29320, 29315, 29282, 29233, 29169, 29109, 29066, 29024, 28988,
  28974, 28959, 28949, 28934, 28914, 28886, 28865, 28857, 28863, 28866, 28873,
  28897, 28928, 28957, 28975, 28985, 28979, 28963, 28950, 28942, 28945, 28965,
  29002, 29040, 29072, 29083, 29079, 29064, 29038, 29010, 28995, 28997, 29020,
  29050, 29087, 29116, 29145, 29162, 29158, 29143, 29122, 29100, 29080, 29070,
  29080, 29092, 29109, 29123, 29124, 29117, 29097, 29071, 29038, 29002, 28982,
  28971, 28976, 28996, 29022, 29041, 29045, 29029, 29004, 28970, 28934, 28914,
  28913, 28923, 28929, 28947, 28968, 28984, 28997, 29004, 28999, 28988, 28972,
  28949, 28933, 28913, 28899, 28894, 28904, 28919, 28953, 28987, 29016, 29034,
  29039, 29030, 29014, 29000, 28975, 28956, 28942, 28926, 28917, 28905, 28883,
  28852, 28813, 28772, 28722, 28691, 28687, 28701, 28744, 28793, 28834, 28862,
  28864, 28856, 28818, 28760, 28697, 28652, 28636, 28638, 28663, 28712, 28760,
  28783, 28805, 28818, 28811, 28793, 28776, 28774, 28783, 28806, 28845, 28882,
  28904, 28910, 28908, 28892, 28853, 28800, 28753, 28718, 28703, 28692, 28703,
  28734, 28757, 28774, 28780, 28774, 28752, 28722, 28691, 28653, 28624, 28606,
  28590, 28574, 28565, 28549, 28533, 28507, 28477, 28448, 28437, 28448, 28480,
  28510, 28538, 28566, 28572, 28566, 28551, 28525, 28503, 28491, 28508, 28552,
  28605, 28657, 28705, 28737, 28754, 28752, 28727, 28689, 28661, 28642, 28634,
  28640, 28662, 28692, 28707, 28698, 28666, 28627, 28586, 28553, 28531, 28541,
  28575, 28625, 28668, 28691, 28688, 28667, 28621, 28572, 28527, 28476, 28438,
  28427, 28444, 28482, 28521, 28549, 28572, 28581, 28563, 28533, 28503, 28480,
  28464, 28464, 28482, 28508, 28538, 28557, 28558, 28550, 28534, 28509, 28471,
  28452, 28439, 28427, 28419, 28429, 28437, 28436, 28435, 28439, 28437, 28429,
  28420, 28416, 28413, 28396, 28389, 28392, 28385, 28357, 28329, 28310, 28289,
  28273, 28274, 28288, 28313, 28354, 28408, 28433, 28428, 28401, 28367, 28321,
  28279, 28271, 28306, 28354, 28415, 28477, 28508, 28511, 28490, 28454, 28394,
  28341, 28303, 28258, 28227, 28214, 28204, 28177, 28159, 28122, 28067, 27997,
  27938, 27885, 27853, 27841, 27849, 27888, 27934, 27986, 28014, 28016, 27987,
  27945, 27878, 27815, 27777, 27755, 27745, 27740, 27743, 27733, 27722, 27719,
  27716, 27712, 27708, 27723, 27732, 27734, 27733, 27747, 27757, 27769, 27773,
  27764, 27740, 27717, 27709, 27729, 27739, 27772, 27812, 27834, 27836, 27830,
  27815, 27792, 27775, 27769, 27777, 27806, 27854, 27896, 27929, 27943, 27941,
  27927, 27892, 27864, 27852, 27854, 27865, 27900, 27950, 27997, 28026, 28051,
  28058, 28044, 28019, 28004, 28004, 28025, 28063, 28114, 28156, 28181, 28190,
  28176, 28147, 28132, 28110, 28109, 28124, 28141, 28158, 28188, 28205, 28211,
  28195, 28152, 28088, 28001, 27906, 27809, 27744, 27724, 27728, 27772, 27837,
  27898, 27947, 27960, 27947, 27926, 27891, 27846, 27802, 27796, 27811, 27847,
  27886, 27928, 27959, 27976, 27986, 27983, 27977, 27954, 27919, 27909, 27921,
  27941, 27974, 28011, 28020, 28018, 28005, 27968, 27912, 27867, 27839, 27829,
  27841, 27871, 27911, 27940, 27954, 27955, 27945, 27919, 27899, 27892, 27895,
  27928, 27983, 28044, 28102, 28146, 28169, 28172, 28166, 28153, 28136, 28152,
  28186, 28226, 28272, 28314, 28347, 28364, 28381, 28391, 28407, 28424, 28452,
  28484, 28522, 28560, 28596, 28628, 28652, 28665, 28672, 28664, 28663, 28664,
  28677, 28705, 28744, 28782, 28802, 28797, 28770, 28704, 28619, 28550, 28519,
  28512, 28525, 28541, 28552, 28544, 28523, 28502, 28479, 28458, 28451, 28473,
  28499, 28507, 28513, 28515, 28496, 28469, 28449, 28422, 28397, 28373, 28363,
  28348, 28347, 28363, 28397, 28439, 28486, 28528, 28551, 28553, 28539, 28511,
  28490, 28483, 28480, 28488, 28505, 28503, 28494, 28479, 28457, 28422, 28389,
  28359, 28329, 28313, 28323, 28350, 28371, 28390, 28404, 28400, 28369, 28326,
  28279, 28255, 28252, 28259, 28286, 28326, 28344, 28332, 28307, 28265, 28224,
  28182, 28160, 28165, 28188, 28237, 28289, 28329, 28362, 28369, 28344, 28312,
  28290, 28278, 28276, 28291, 28311, 28338, 28352, 28348, 28330, 28293, 28239,
  28181, 28109, 28057, 28032, 28024, 28044, 28085, 28136, 28179, 28200, 28187,
  28148, 28097, 28055, 28054, 28078, 28109, 28147, 28198, 28232, 28229, 28201,
  28163, 28114, 28067, 28039, 28052, 28096, 28148, 28188, 28225, 28255, 28251,
  28233, 28188, 28125, 28057, 28010, 28008, 28039, 28100, 28152, 28183, 28195,
  28193, 28154, 28096, 28027, 27968, 27948, 27980, 28027, 28079, 28120, 28135,
  28123, 28100, 28065, 28025, 28002, 28001, 28015, 28048, 28086, 28119, 28133,
  28134, 28118, 28096, 28067, 28032, 27998, 27984, 27994, 28021, 28066, 28113,
  28159, 28195, 28202, 28171, 28118, 28059, 28018, 28025, 28065, 28117, 28183,
  28245, 28284, 28302, 28309, 28287, 28228, 28143, 28059, 27979, 27924, 27906,
  27922, 27951, 27994, 28010, 27986, 27930, 27858, 27770, 27713, 27704, 27728,
  27783, 27838, 27892, 27932, 27926, 27886, 27830, 27760, 27699, 27671, 27665,
  27694, 27738, 27794, 27840, 27862, 27862, 27839, 27801, 27762, 27739, 27729,
  27737, 27763, 27803, 27849, 27875, 27882, 27866, 27835, 27777, 27731, 27701,
  27675, 27667, 27666, 27673, 27686, 27688, 27668, 27636, 27600, 27571, 27559,
  27577, 27621, 27683, 27737, 27777, 27776, 27761, 27721, 27666, 27621, 27617,
  27657, 27722, 27793, 27860, 27921, 27949, 27950, 27927, 27882, 27821, 27786,
  27802, 27845, 27930, 28032, 28127, 28177, 28187, 28159, 28112, 28054, 28001,
  27971, 27979, 28007, 28032, 28033, 27999, 27933, 27835, 27725, 27619, 27545,
  27472, 27444, 27459, 27490, 27542, 27595, 27629, 27651, 27660, 27639, 27595,
  27548, 27520, 27529, 27578, 27645, 27712, 27758, 27782, 27780, 27756, 27720,
  27696, 27688, 27695, 27730, 27777, 27843, 27910, 27958, 27986, 27995, 27979,
  27949, 27919, 27906, 27899, 27914, 27955, 27998, 28033, 28064, 28073, 28062,
  28040, 28015, 27995, 27987, 27985, 27988, 28006, 28038, 28088, 28127, 28144,
  28157, 28147, 28109, 28083, 28071, 28076, 28109, 28168, 28243, 28311, 28351,
  28352, 28323, 28275, 28230, 28199, 28186, 28185, 28200, 28239, 28281, 28315,
  28340, 28362, 28366, 28358, 28349, 28339, 28334, 28327, 28303, 28282, 28254,
  28213, 28177, 28145, 28101, 28050, 28010, 27990, 27982, 27989, 28018, 28056,
  28084, 28107, 28126, 28112, 28071, 28012, 27941, 27879, 27856, 27865, 27895,
  27949, 28004, 28057, 28093, 28110, 28102, 28081, 28070, 28081, 28105, 28157,
  28213, 28275, 28326, 28351, 28336, 28298, 28234, 28146, 28075, 28039, 28046,
  28090, 28155, 28221, 28274, 28294, 28289, 28256, 28200, 28118, 28056, 28020,
  28025, 28058, 28108, 28161, 28203, 28223, 28223, 28202, 28158, 28112, 28064,
  28022, 28014, 28037, 28073, 28124, 28179, 28218, 28225, 28214, 28187, 28143,
  28106, 28087, 28088, 28125, 28184, 28245, 28296, 28325, 28317, 28249, 28151,
  28045, 27952, 27914, 27903, 27925, 27970, 28014, 28048, 28081, 28098, 28085,
  28054, 28003, 27941, 27893, 27882, 27903, 27942, 27987, 28018, 28034, 28022,
  27978, 27927, 27872, 27854, 27866, 27901, 27963, 28024, 28076, 28102, 28104,
  28090, 28064, 28031, 28005, 27989, 27998, 28007, 28019, 28037, 28059, 28072,
  28073, 28072, 28061, 28046, 28020, 28001, 27990, 28007, 28031, 28048, 28066,
  28088, 28101, 28102, 28100, 28088, 28071, 28058, 28047, 28049, 28070, 28101,
  28128, 28155, 28180, 28191, 28184, 28176, 28181, 28200, 28203, 28210, 28231,
  28264, 28284, 28287, 28276, 28255, 28224, 28191, 28155, 28120, 28085, 28042,
  28002, 27979, 27964, 27943, 27929, 27922, 27917, 27922, 27937, 27966, 28014,
  28071, 28115, 28139, 28139, 28113, 28069, 28035, 28012, 27995, 27993, 28012,
  28032, 28042, 28046, 28031, 27987, 27925, 27871, 27829, 27817, 27832, 27856,
  27894, 27936, 27973, 28001, 28008, 27996, 27970, 27932, 27891, 27873, 27871,
  27902, 27942, 27975, 28005, 28018, 28008, 27967, 27910, 27858, 27823, 27816,
  27839, 27882, 27924, 27956, 27981, 27999, 27991, 27961, 27917, 27877, 27861,
  27895,
];
