export const DBConfig = {
  name: "userDB",
  version: 1,
  objectStoresMeta: [
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
    },
  ],
};
