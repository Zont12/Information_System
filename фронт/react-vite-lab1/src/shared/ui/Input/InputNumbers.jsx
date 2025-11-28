function InputNumbers({ name, value, onChange, placeholder, disabled }) {
  const MAX_LEN = 9;

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
      type="number"
      name={name}
      value={value ?? ""}
      onChange={handleChange}
      maxLength={MAX_LEN}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

export default InputNumbers;
