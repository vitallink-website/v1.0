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

  const turnOff = () => {
    write_charastirctic.writeValue(new Uint8Array([0x000]).buffer);
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
      const pcg = [];
      const temperature = [];
      if (command === 0x01 || command === 0x02) {
        for (let i = 0; i < 8; i++) {
          red.push(data.srcElement.value.getUint16(8 * i + 0, true));
          ir.push(data.srcElement.value.getUint16(8 * i + 2, true));
          ecg.push(data.srcElement.value.getInt16(8 * i + 4, true));
          force.push(
            Bytes2Float16(data.srcElement.value.getUint16(8 * i + 6, true))
          );
          Data.push(0);
        }
      } else if (command === 0x03) {
        for (let i = 0; i < 100; i++) {
          pcg.push(data.srcElement.value.getInt16(2 * i, true));
        }
      } else if (command === 0x04) {
        temperature.push(
          Bytes2Float16(data.srcElement.value.getUint16(0, true))
        );
      }
      callBack({
        red,
        ecg,
        force,
        ir,
        pcg,
        temperature,
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
    turnOff,
  };
};

const Bytes2Float16 = (bytes) => {
  return (bytes & 0x00ff) + (bytes >> 8) / 100;
};

export const KEYS = ["red", "ir", "pcg", "temperature", "ecg", "force"];
