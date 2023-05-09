export const DBConfig = {
  name: "hekidesk",
  version: 1,
  objectStoresMeta: [
    {
      store: "users",
      storeConfig: { keypath: "id", autoIncrement: true },
      storeSchema: [
        { name: "username", keypath: "username", options: { unique: true } },
        {
          name: "dateOfBirth",
          keypath: "dateOfBirth",
          options: { unique: false },
        },
        { name: "weight", keypath: "weight", options: { unique: false } },
        { name: "height", keypath: "height", options: { unique: false } },
        { name: "gender", keypath: "gender", options: { unique: false } },
      ],
    },
    {
      store:""
    }
  ],
};
