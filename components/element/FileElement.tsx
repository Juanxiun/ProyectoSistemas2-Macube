interface dataprops {
  id: string;
  value: string;
  editable: boolean | true;
}

export function FileCargaElement({ id, value, editable }: dataprops) {
  return (
    <div class="">
      <img src={`data:image/jpeg;base64,${value}`} alt="xd" />
      <input
        type="file"
        hidden
        name={id}
        id={id}
        accept=".jpg, .jpeg, image/jpeg"
        readOnly={editable}
      />
    </div>
  );
}
