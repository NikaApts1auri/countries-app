import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./contact.css";

interface IFormType {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}

const schema = yup
  .object({
    first_name: yup.string().required("First name is a required field"),
    last_name: yup.string().required("Last name is a required field"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is a required field"),
    message: yup.string().required("Message is required"),
  })
  .required();

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormType>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormType> = (data) => {
    console.log(data);
    reset(); //ინფუთების გასუფთავება
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="label" htmlFor="first_name">
              First Name
            </label>
            <input
              className={`input ${errors.first_name ? "input-error" : ""}`}
              type="text"
              placeholder="Enter your first name"
              {...register("first_name")}
              id="first_name"
            />
            {errors.first_name && (
              <p className="error-message">{errors.first_name.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label className="label" htmlFor="last_name">
              Last Name
            </label>
            <input
              className={`input ${errors.last_name ? "input-error" : ""}`}
              type="text"
              placeholder="Enter your last name"
              {...register("last_name")}
              id="last_name"
            />
            {errors.last_name && (
              <p className="error-message">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className={`input ${errors.email ? "input-error" : ""}`}
              type="email"
              placeholder="Please enter your email address"
              {...register("email")}
              id="email"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          {/* Textarea */}
          <div className="form-group">
            <label className="label" htmlFor="textarea">
              Message
            </label>
            <textarea
              id="textarea"
              className={`textarea ${errors.message ? "input-error" : ""}`}
              rows={4}
              placeholder="Write your message here..."
              {...register("message")}
            />
            {errors.message && (
              <p className="error-message">{errors.message.message}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
