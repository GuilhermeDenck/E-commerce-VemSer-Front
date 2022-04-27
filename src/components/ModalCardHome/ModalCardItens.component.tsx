import React, { useEffect, useState } from "react";
import { ENDPOINT_TOPICS } from "../../constants";
import api from "../../service/api";
import {
  CardItem,
  ContainerModal,
  Modal,
  BtnClose,
} from "./ModalCardItens.style";
import { AiFillCloseCircle } from "react-icons/ai";
import { ItensInTopicDTO } from "../../models/ModalsDTO";

type Event = {
  id: number | undefined,
  onClick: () => void;
};

const ModalCardItens = ({ id, onClick }: Event) => {
  const [ItensInTopic, setItensInTopic] = useState<Array<ItensInTopicDTO>>([]);

  const getItensTopic = async (id: number | undefined) => {
    try {
      const { data } = await api.get(
        `${ENDPOINT_TOPICS.GET_ITEMS_TOPIC}/${id}`
      );
      setItensInTopic(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ItensInTopic);

  useEffect(() => {
    getItensTopic(id);
  }, []);

  return (
    <ContainerModal>
      <Modal>
        <BtnClose onClick={() => onClick}>
          {" "}
          <AiFillCloseCircle />{" "}
        </BtnClose>
        {ItensInTopic.map((item: ItensInTopicDTO, index: number) => (
          <CardItem key={index}>
            <img
              src={`data:image/jpeg;base64,${item.file}`}
              alt="imagem do iten"
            />
            <p>{item.itemName.toUpperCase()}</p>
            <p>{item.description}</p>
            <p>{item.value}</p>
          </CardItem>
        ))}
      </Modal>
    </ContainerModal>
  );
};

export default ModalCardItens;
