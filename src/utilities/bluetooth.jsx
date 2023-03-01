import { useState } from "react";

const ServiceUUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const ReadCharistristicUUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
const WriteCharistristicUUID = "e505ffd3-ecd5-4365-b57d-70202ab71692";

export const useSignalFeed = () => {
  const [device, setDevice] = useState();
  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);
  const [read_charastirctic, setCharastircticR] = useState();
  const [write_charastirctic, setCharastircticW] = useState();
  const [duration, setDuration] = useState(0);
  const Data = [];
  const disconnect = () => {
    console.log("disconnect");

    device.gatt.disconnect();
    setCharastircticR(null);
    setService();
  };

  const start = async () => {
    console.log("start");
    Data.splice(0, Data.length);

    setDuration(performance.now());
    read_charastirctic.startNotifications();
  };

  const stop = async () => {
    console.log("stop");
    setDuration(0);
    read_charastirctic.stopNotifications();
  };

  const GetFrequency = () => {
    const time = performance.now() - duration;
    return Math.ceil(Data.length / Math.ceil(time / 1000));
  };
  const GetTime = () => performance.now() - duration;

  const connect = () => {
    console.log("connect");
    navigator.bluetooth
      .requestDevice({
        optionalServices: [ServiceUUID],
        // filters: [{ name: "ECG-PPG-Server" }], //todo remove it later
        acceptAllDevices: true,
      })
      .then((device) => {
        setLoading(true);
        setDevice(device);
        device.gatt.connect().then((gatt) => {
          gatt.getPrimaryService(ServiceUUID).then((service) => {
            setService(service);
            service.getCharacteristic(WriteCharistristicUUID).then((char) => {
              char.writeValue(new Uint8Array([0x8f]).buffer);
              setCharastircticW(char);
            });
            service.getCharacteristic(ReadCharistristicUUID).then((char) => {
              setCharastircticR(char);
              setLoading(false);
            });
          });
        });
      });
  };

  const sendCommand = async (command, callBack) => {
    console.log("command ", command);
    write_charastirctic.writeValue(new Uint8Array([command]).buffer);

    read_charastirctic.oncharacteristicvaluechanged = (data) => {
      const red = [];
      const ir = [];
      const ecg = [];
      const force = [];
      const pcg = []
      if(command == 0x01 || command == 0x02){
        for (let i = 0; i < 8; i++) {
        red.push(data.srcElement.value.getUint16(8 * i + 0, true));
        ir.push(data.srcElement.value.getUint16(8 * i + 2, true));
        ecg.push(data.srcElement.value.getInt16(8 * i + 4, true));
        force.push(Bytes2Float16(data.srcElement.value.getUint16(8 * i + 6, true)));
        Data.push(0);
      }}
      else if(command == 0x03)
        for (let i = 0; i < 100; i++){
          console.log(data.srcElement.value.getInt16(2 * i, true) << 8 + data.srcElement.value.getInt16(2 * i + 1, true))
          pcg.push(data.srcElement.value.getInt16(2 * i, true) << 8 + data.srcElement.value.getInt16(2 * i + 1, true))
        }
      callBack({
        red,
        ecg,
        force,
        ir,
        pcg,
      });
    };
  };

  return {
    device,
    stop,
    start,
    isConnected: service !== undefined,
    channelConnected: !!read_charastirctic,
    connect,
    disconnect,
    sendCommand,
    loading,
    GetFrequency,
    GetTime,
  };
};

const Bytes2Float16 = (bytes) => {
  let sign = bytes & 0x8000 ? -1 : 1;
  let exponent = ((bytes >> 10) & 0x1f) - 15;
  let significand = bytes & ~(-1 << 10);

  if (exponent === 16)
    return sign * (significand ? Number.NaN : Number.POSITIVE_INFINITY);

  if (exponent === -15) {
    if (significand === 0) return sign * 0.0;
    exponent = -14;
    significand /= 1 << 9;
  } else significand = (significand | (1 << 10)) / (1 << 10);

  return sign * significand * Math.pow(2, exponent);
};

export const KEYS = ["red", "ir", "ecg", "force", "pcg"];
