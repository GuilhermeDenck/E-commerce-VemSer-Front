import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { connect, DispatchProp } from "react-redux";
import {
  BtnForm,
  Container,
  InputForm,
  CenterCustom,
} from "../../global.style";
import { NewRequestPurchase, PurchaseDTO } from "../../models/PurchaseDTO";
import { RootState } from "../../store";
import { handleCreateList, handleCreateTopic, handleDeleteItem, handleFinallyTopic } from "../../store/action/purchaseAction";
import { Theme } from "../../theme";
import {
  ContainerRequest,
  ContainerRequestForm,
  DivItens,
  TextAreaCustom,
} from "./RequestPurchase.style";

import { imgConverter, redirectAdmin, maskMoney } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { isLoggedDTO } from "../../models/UserDTO";
import { FaTrashAlt } from "react-icons/fa";
//pagina de compra pro usuário tipo colaborador
const RequestPurchase = ({
  user,
  auth,
  dispatch,
}: isLoggedDTO & PurchaseDTO & DispatchProp) => {
  const [arrayItens, setArrayItens] = useState<NewRequestPurchase[]>([]);

  const navigate = useNavigate();
  const [idTopic, setIdTopic] = useState(0)

  useEffect(() => {
    redirectAdmin(navigate, user.profile);
  }, [user]);

  const formikTopic = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (valuesTopic) => {
      // handleCreateTopic(valuesTopic, setIdTopic);
      console.log(valuesTopic)
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      file: "",
    },
    onSubmit: (values, actions) => {
      handleFinallyTopic(idTopic);
      actions.resetForm();
      formikTopic.resetForm()
    },
  });
  return (
    <Container>
      <CenterCustom>
        <h3>Cadastrar compra</h3>
      </CenterCustom>
      <ContainerRequest>
        <ContainerRequestForm>

          
          <form onSubmit={formikTopic.handleSubmit}>
            <InputForm
              placeholder="Título da lista"
              width={"100%"}
              height={"40px"}
              id="title"
              name="title"
              type="text"
              onChange={formikTopic.handleChange}
              value={formikTopic.values.title}
              onBlur={() => handleCreateTopic(formikTopic.values, setIdTopic)}
            />
            {/* <button type="submit" >Criar tarefa</button> */}
          </form>

          <form onSubmit={formik.handleSubmit}>
            <InputForm
              placeholder="Nome do item"
              width={"100%"}
              height={"40px"}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />

            <TextAreaCustom
              placeholder="Descrição"
              rows={10}
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />

            <InputForm
              placeholder="Valor do item"
              width={"100%"}
              height={"40px"}
              id="price"
              name="price"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.price}
            />

            <div>
              <label htmlFor="profileImage">Envio de Imagem</label>
              <InputForm
                placeholder="Arquivo"
                width={"100%"}
                height={"40px"}
                id="profileImage"
                name="profileImage"
                type="file"
                onChange={(event) =>
                  imgConverter(event, formik.setFieldValue, "file")
                }
              />
            </div>

            <CenterCustom>
              <BtnForm
                width={"300px"}
                color={"#25292a"}
                type="button"
                onClick={() => handleCreateList(formik.values, idTopic, setArrayItens, arrayItens, formik.resetForm)}
              >
                Adicionar
              </BtnForm>
              <BtnForm width={"300px"} color={"#25292a"} type="submit">
                Finalizar
              </BtnForm>
            </CenterCustom>
          </form>
        </ContainerRequestForm>
        {arrayItens.map((item, index) => (
          <DivItens key={index}>
            <p>Nome: {item.name}</p>
            <p>Descrição: {item.description}</p>
            <p>Valor: R$ {item.price}</p>
            {/* <button onClick={() => handleDeleteItem(index)}>
              {" "}
              <FaTrashAlt />{" "}
            </button> */}
          </DivItens>
        ))}
      </ContainerRequest>
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.purchaseReducer,
  user: state.authReducer,
});

export default connect(mapStateToProps)<any>(RequestPurchase);
