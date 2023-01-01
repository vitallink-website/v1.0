export const DBUser = {
  name: "userDB",
  version: 2,
  objectStoresMeta: [
    {
      store: "cardiogramData",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "userId", keypath: "userId", options: { unique: false } },
        { name: "ecgData", keypath: "ecgData", options: { unique: false } },
        { name: "date", keypath: "date", options: { unique: false } },
        { name: "heartBeat", keypath: "heartBeat", options: { unique: false } }
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
