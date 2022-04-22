import * as Yup from "yup";
import PasswordStrengthBar from "react-password-strength-bar";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";
import { Theme } from "../../theme";
import {
  Btn,
  Input,
  Title,
  DivErrorYup,
  ContainerTitle,
  ContainerGetInfo,
  ContainerPrincipal,
} from "../../global.style";
import { DivEye, DivInputsLogin, DivLogo } from "../Login/Login.style";

import { RegisterDTO } from "../../models/UserDTO";
import { handleRegister } from "../../store/action/authActions";
import { hasLogin } from "../../utils/utils";

const Register = ({ auth, dispatch }: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const navigate = useNavigate();

  const data = new FormData();

  const register = (values: RegisterDTO) => {
    const objTeste = {
      fullname: formik.values.user,
      email: formik.values.email,
      password: formik.values.password,
    };
    data.append("dados", JSON.stringify(objTeste));
    if (values.password === values.confirmPassword) {
      handleRegister(data, dispatch, navigate);
    } else {
      console.log("A senha deve ser igual a confirmação");
    }
  };

  const imgConverter = (event: any) => {
    const profileImage = event?.target?.files[0];
    formik.setFieldValue("profileImage", profileImage);
    data.append("profileImage", profileImage);
  };

  useEffect(() => {
    hasLogin(navigate);
  }, []);

  const formik = useFormik({
    initialValues: {
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: null,
    },
    validationSchema: Yup.object({
      user: Yup.string()
        .min(2, "Este é um nome muito curto.")
        .max(50, "Esse é mesmo o seu nome ou você deitou no teclado?")
        .matches(
          /[^0-9$*&@#]/gi,
          "Você precisa preencher esse campo apenas com letras"
        )
        .required("Você precisa preencher esse campo"),
      email: Yup.string()
        .email("Este campo precisa ser preenchido com um email.")
        .required("Você precisa preencher esse campo"),
      password: Yup.string()
        .min(8, "Sua senha deve conter pelo menos 8 caracteres")
        .max(30, "Sua senha deve ter no máximo 30 caracteres")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]/,
          "Sua senha precisa conter pelo menos um caractere especial, uma letra maiúscula, uma letra minúscula e um número."
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    }),
    onSubmit: (values) => {
      // register(values);
      console.log(values);
    },
  });

  return (
    <ContainerPrincipal>
      <ContainerTitle>
        <Title size="50px" spacing="normal">
          Sistema de
        </Title>
        <Title size="70px" spacing="30px">
          Vendas
        </Title>
      </ContainerTitle>
      <ContainerGetInfo>
        <DivLogo>
          <Logo />
        </DivLogo>
        <form onSubmit={formik.handleSubmit}>
          <DivInputsLogin>
            <Input
              width="99%"
              height="40px"
              placeholder="Nome Completo"
              id="user"
              name="user"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.user}
            />
            {formik.errors.user && formik.touched.user ? (
              <DivErrorYup>{formik.errors.user}</DivErrorYup>
            ) : null}
            <Input
              width="99%"
              height="40px"
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <DivErrorYup>{formik.errors.email}</DivErrorYup>
            ) : null}
            <div>
              <Input
                width="99%"
                height="40px"
                placeholder="Password"
                id="password"
                name="password"
                type={showPassword ? "password" : "text"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <DivErrorYup>{formik.errors.password}</DivErrorYup>
              ) : null}
              <DivEye>
                {showPassword ? (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                )}
              </DivEye>
            </div>

            {formik.values.password.length > 0 && (
              <PasswordStrengthBar
                password={formik.values.password}
                barColors={[
                  "#B83E26",
                  "#FFB829",
                  "#009200",
                  "#009200",
                  "#009200",
                  "#009200",
                ]}
                minLength={8}
              />
            )}

            <Input
              width="99%"
              height="40px"
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <DivErrorYup>As senhas estão diferentes.</DivErrorYup>
            ) : null}

            <Input
              width="99%"
              height="40px"
              id="profileImage"
              name="profileImage"
              type="file"
              onChange={(event) => imgConverter(event)}
            />

            <Btn width="100%" type="submit" color={Theme.color.primary}>
              Submit
            </Btn>
          </DivInputsLogin>
        </form>
      </ContainerGetInfo>
    </ContainerPrincipal>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(Register);
