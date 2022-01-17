import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";

type SearchForm = {
  term: string;
};

const Input = () => {
  const [isSearch, setIsSearch] = React.useState(false);
  const {
    setValue,
    register,
    setFocus,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<SearchForm>({ mode: "onChange" });

  const onSubmit = (value: SearchForm) => {
    console.log(value);
  };

  const onClick = () => {
    setIsSearch((pre) => {
      if (pre) {
        clearErrors("term");
        setValue("term", "");
      }
      return !pre;
    });
    setFocus("term");
  };

  return (
    <div className="relative">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        onClick={() => onClick()}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isSearch ? " -translate-x-48" : ""
        } right-3 w-4 text-stone-400 cursor-pointer hover:scale-110 active:scale-100 transition-all duration-190 z-10`}
      >
        <path
          fill="currentColor"
          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
        />
      </motion.svg>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`relative flex items-center h-full ${
          isSearch ? "scale-x-100" : "scale-x-0"
        } transition-all duration-200 origin-right`}
      >
        <input
          {...register("term", {
            required: { value: true, message: "Required" },
          })}
          placeholder="Search For"
          className="w-30 pl-9 pr-3 py-1.5  mr-3 bg-stone-300 text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 rounded-md"
        />
        {errors?.term?.message && (
          <ErrorMessage
            styles={"absolute left-1 bottom-0 text-red-700"}
            message={errors.term.message}
          />
        )}
      </form>
    </div>
  );
};

export default Input;
