export const DBUser = {
  name: "userDB",
  version: 4,
  objectStoresMeta: [
    {
      store: "cardiogramData",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "ecgData", keypath: "ecgData", options: { unique: false } },
        { name: "date", keypath: "date", options: { unique: false } },
        { name: "heartBeat", keypath: "heartBeat", options: { unique: false } },
        { name: "PRRRInterval", keypath: "PRRRInterval", options: { unique: false } },
        { name: "QRSDuration", keypath: "QRSDuration", options: { unique: false } }
      ],
    },
    {
      store: "oximetryData",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "ppgData", keypath: "ppgData", options: { unique: false } },
        { name: "date", keypath: "date", options: { unique: false } },
        { name: "heartBeat", keypath: "heartBeat", options: { unique: false } },
        { name: "SPO2", keypath: "SPO2", options: { unique: false } },
      ],
    },
    {
      store: "BPData",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "ppgData", keypath: "ppgData", options: { unique: false } },
        { name: "forceData", keypath: "forceData", options: { unique: false } },
        { name: "date", keypath: "date", options: { unique: false } },
        { name: "SYS_DIA", keypath: "SYS_DIA", options: { unique: false } },
      ],
    },
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        { name: "weight", keypath: "weight", options: { unique: false } },
        { name: "height", keypath: "height", options: { unique: false } },
        { name: "dob", keypath: "dob", options: { unique: false } },
        { name: "gender", keypath: "gender", options: { unique: false } },
      ],
    }
  ],
};
