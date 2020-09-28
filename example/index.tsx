import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Resolver, useForm } from "react-hook-form";
import { RhfPasswordField, RhfSelect, RhfTextField } from "../src/componets";
import { Container } from "@material-ui/core";
import { propertyOf as p } from "../src/utils";
import { useCallback, useMemo } from "react";
import { RhfButton } from "../src/componets/RhfButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { RhfDatePicker } from "../src/componets/RhfDatePicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// @ts-ignore
import JalaliUtils from "@date-io/jalaali";
import jMoment from "moment-jalaali";

interface Values {
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: "male" | "female" | "other";
  password: string;
  confirmPassword: string;
}

const App = () => {
  const resolver = useMemo<Resolver<Values>>(
    () =>
      yupResolver(
        Yup.object().shape({
          [p<Values>("firstName")]: Yup.string().required(),
          [p<Values>("lastName")]: Yup.string().required(),
          [p<Values>("birthdate")]: Yup.date().required(),
          [p<Values>("gender")]: Yup.string()
            .required()
            .oneOf(["male", "female", "other"]),
          [p<Values>("password")]: Yup.string()
            .required()
            .matches(
              new RegExp(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
              )
            ),
          [p<Values>("confirmPassword")]: Yup.string()
            .required()
            .oneOf([Yup.ref(p<Values>("password"))]),
        })
      ),
    []
  );

  const defaultValues = useMemo<Partial<Values>>(
    () => ({
      gender: "male",
    }),
    []
  );

  const { handleSubmit, formState, control, errors, register } = useForm<
    Values
  >({
    mode: "all",
    resolver,
    defaultValues,
  });

  const onSubmit = useCallback((values: Values): Promise<void> => {
    return new Promise<void>(resolve => {
      setTimeout(resolve, 3000);
    }).then(() => {
      console.log(values);
    });
  }, []);

  const selectItems = useMemo(
    () => [
      { value: "male", label: "male" },
      { value: "female", label: "female" },
      { value: "other", label: "other" },
    ],
    []
  );

  return (
    <Container maxWidth="md">
      <MuiPickersUtilsProvider
        libInstance={jMoment}
        utils={JalaliUtils}
        locale="fa"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <RhfTextField
            name={p<Values>("firstName")}
            rhfError={errors.firstName}
            inputRef={register}
            label={p<Values>("firstName")}
          />
          <RhfTextField
            name={p<Values>("lastName")}
            rhfError={errors.lastName}
            label={p<Values>("lastName")}
            inputRef={register}
          />
          <RhfDatePicker
            name={p<Values>("birthdate")}
            rhfError={errors.birthdate}
            label={p<Values>("birthdate")}
            // @ts-ignore
            control={control}
          />
          <RhfSelect
            name={p<Values>("gender")}
            rhfError={errors.gender}
            label={p<Values>("gender")}
            // @ts-ignore
            control={control}
            items={selectItems}
          />
          <RhfPasswordField
            name={p<Values>("password")}
            rhfError={errors.password}
            label={p<Values>("password")}
            inputRef={register}
          />
          <RhfPasswordField
            name={p<Values>("confirmPassword")}
            rhfError={errors.confirmPassword}
            label={p<Values>("confirmPassword")}
            inputRef={register}
          />

          <RhfButton
            // @ts-ignore
            formState={formState}
          />
        </form>
      </MuiPickersUtilsProvider>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
