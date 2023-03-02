import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

export default function App() {
  const [values, setValues] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    symptoms: [],
  });
  // const [errors, setErrors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  /// add function when value change
  const handleChange = (event) => {
    event.persist();

    if (event.target.name === "symptoms") {
      setValues({
        ...values,
        [event.target.name]: event.target.checked
          ? [...values.symptoms, event.target.value]
          : values.symptoms.filter((symptom) => symptom !== event.target.value),
      });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  console.log("errors", errors);

  const stringJson = JSON.stringify(values);
  return (
    <div className="container">
      <h1>Đăng ký</h1>
      {/* {errors.map((error) => (
        <p key={error}>Error: {error}</p>
      ))} */}
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <p>nhập tên:</p>
        <input
          {...register("name", {
            required: "Required",
          })}
        />
        {errors?.name && <div> {errors?.name?.message}</div>}
        <p>nhập địa chỉ:</p>
        <input
          {...register("address", {
            required: "Required",
          })}
        />
        {errors?.address && <div> {errors?.address?.message}</div>}
        <p>nhập số điện thoại:</p>
        <input
          {...register("phone", {
            required: "Required",
            pattern: {
              value: /^[0-9]+$/i,
              message: "Phone number is invalid",
            },
          })}
        />
        {errors?.phone && <div> {errors?.phone?.message}</div>}
        <p>nhập email:</p>
        <input
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors?.email && <div> {errors?.email?.message}</div>}
        <p>Trong vòng 14 ngày qua có dấu hiệu triệu chứng gì?</p>
        <label>
          <input
            {...register("symptoms", {
              required: "Required",
            })}
            type="checkbox"
            value="ho"
          />
          Ho
        </label>
        <label>
          <input
            {...register("symptoms", {
              required: "Required",
            })}
            type="checkbox"
            value="sot"
          />
          Sốt
        </label>
        <label>
          <input
            {...register("symptoms", {
              required: "Required",
            })}
            type="checkbox"
            value="dau"
          />
          Đau
        </label>
        {errors?.symptoms && <div> {errors?.symptoms?.message}</div>}
        <br />
        <br />
        <p>bấm submit form</p>
        <button>submit nè</button>
      </form>
      <div className="show-json-string-setValues">{stringJson}</div>
    </div>
  );
}
