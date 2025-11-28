function Input({ name, value, onChange }) {
  const MAX_LEN = 8;

  const handleChange = (e) => {
    let v = e.target.value;
    if (v.length > MAX_LEN) {
      v = v.slice(0, MAX_LEN);
    }

    onChange({
      target: {
        name,
        value: v,
      },
    });
  };

  return (
    <input
      type="text"
      name={name}
      value={value ?? ""}
      onChange={handleChange}
      maxLength={MAX_LEN}
    />
  );
}
export default Input;
