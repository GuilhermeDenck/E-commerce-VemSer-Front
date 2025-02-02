import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { connect, DispatchProp } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ModalCreateUserAdm, CardAdm, Pagination } from "../../components";
import { isLoggedDTO, UsersAdmDTO } from "../../models/UserDTO";
import { RootState } from "../../store";
import { TYPE_USERS } from "../../constants";
import {
  Container,
  InputForm,
  IconSearch,
  CenterCustom,
  TitleNotFoundInfo,
} from "../../global.style";
import {
  BtnAdm,
  DivSearch,
  ParagraphInfo,
  ContainerAdmin,
} from "./Administration.style";
import {
  getAllUsers,
  getUserSearch,
  handleProfile,
} from "../../store/action/adminActions";

const Administration = ({ user, dispatch }: isLoggedDTO & DispatchProp) => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState<Array<UsersAdmDTO>>([]);
  const [isAddUser, setIsAddUser] = useState(false);

  const [page, setPage] = useState<number>(0);
  const [allPagesPrincipal, setallPagesPrincipal] = useState<number>(0);
  const [allPagesSearch, setAllPagesSearch] = useState<number>(0);

  const [isSearchUser, setIsSearchUser] = useState<boolean>(false);
  const [userFind, setUserFind] = useState<Array<UsersAdmDTO>>([]);
  const [pageFind, setPageFind] = useState<number>(0);
  const [userSearch, setUserSearch] = useState("");

  useEffect(() => {
    if (user?.profile !== TYPE_USERS.ADMIN) {
      navigate("/");
    }
    if (!isSearchUser) {
      getAllUsers(setAllUsers, page, setallPagesPrincipal, setIsSearchUser);
    }
  }, [page]);

  useEffect(() => {
    handleUserSearch();
  }, [userSearch, pageFind]);

  const handleUserSearch = async () => {
    setIsSearchUser(true);
    getUserSearch(pageFind, setAllPagesSearch, userSearch, setUserFind);
  };

  const formik = useFormik({
    initialValues: {
      type: "COLLABORATOR",
    },
    onSubmit: (values) => {},
  });

  return (
    <Container>
      <CenterCustom>
        <ParagraphInfo>Deseja cadastrar um novo usuário? </ParagraphInfo>
        <BtnAdm
          width={"300px"}
          background={"#4CAF50"}
          color={"#FFFFFF"}
          onClick={() => setIsAddUser(true)}
        >
          Cadastrar novo usuário
        </BtnAdm>
      </CenterCustom>
      <DivSearch>
        <InputForm
          width={"50%"}
          height={"40px"}
          placeholder="Pesquisar"
          onChange={(event) => setUserSearch(event.target.value)}
        />
        <IconSearch />
      </DivSearch>
      <CenterCustom>
        <h3>Usuários Cadastrados: </h3>
      </CenterCustom>

      <ContainerAdmin>
        {isSearchUser ? (
          userFind?.length ? (
            userFind.map((user: UsersAdmDTO) => (
              <form
                onSubmit={(event) =>
                  handleProfile(
                    setAllUsers,
                    formik.resetForm,
                    event,
                    user.userId,
                    formik.values.type,
                    page,
                    setallPagesPrincipal,
                    setUserSearch,
                    setIsSearchUser
                  )
                }
                key={user.userId}
              >
                <CardAdm
                  imgUser={user?.image}
                  fullName={user?.fullName}
                  group={user?.groups}
                  formik={formik}
                />
              </form>
            ))
          ) : (
            <CenterCustom>
              <TitleNotFoundInfo>Nenhum Usuário encontrado</TitleNotFoundInfo>
            </CenterCustom>
          )
        ) : allUsers?.length ? (
          allUsers?.map((user: UsersAdmDTO) => (
            <form
              onSubmit={(event) =>
                handleProfile(
                  setAllUsers,
                  formik.resetForm,
                  event,
                  user.userId,
                  formik.values.type,
                  page,
                  setallPagesPrincipal,
                  setUserSearch,
                  setIsSearchUser
                )
              }
              key={user.userId}
            >
              <CardAdm
                imgUser={user?.image}
                fullName={user?.fullName}
                group={user?.groups}
                formik={formik}
              />
            </form>
          ))
        ) : (
          <CenterCustom>
            <TitleNotFoundInfo>Nenhum Usuário encontrado</TitleNotFoundInfo>
          </CenterCustom>
        )}

        {isAddUser && (
          <ModalCreateUserAdm onClick={() => setIsAddUser(false)} />
        )}
      </ContainerAdmin>
      {!isSearchUser
        ? allUsers?.length > 0 && (
            <Pagination
              page={page}
              onPageChange={(index: number) => setPage(index)}
              allPages={allPagesPrincipal}
            />
          )
        : userFind?.length > 0 && (
            <Pagination
              page={pageFind}
              onPageChange={(index: number) => setPageFind(index)}
              allPages={allPagesSearch}
            />
          )}
    </Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer,
});

export default connect(mapStateToProps)(Administration);
