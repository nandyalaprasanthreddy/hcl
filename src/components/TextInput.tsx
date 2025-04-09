import { useField, useFormikContext } from "formik";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?:string | boolean
}
const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={props.id || props.name}
        className="mb-2 text-sm font-medium text-gray-700"
      >
        {label}
        <span className="text-red-500">*</span>
      </label>
      <input
        {...field}
        {...props}
        id={props.id}
        onChange={handleChange}
        className={`p-2 border ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        } rounded w-full ${props.className}`}
      />
      {props.error ? (
        <div className="text-red-500 text-sm mt-1">{props.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
