import { InputText } from "primereact/inputtext";

export const InputTextGroup = ({ state, setState, label, placeHolder }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "0.5em 0",
      }}
    >
      <label htmlFor={label} style={{ marginBottom: "0.4em" }}>
        {label}
      </label>
      <InputText
        id={label}
        aria-describedby={label}
        style={{ width: "100%" }}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeHolder}
      />
    </div>
  );
};
