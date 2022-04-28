import { useState } from "react";
import { ENDPOINT_TOPICS } from "../../constants";
import api from "../../service/api";

export const getTopics = async (
  setListTopics: Function,
  setAllPages: Function,
  page: number,
  setIsSearch: Function
) => {
  try {
    const { data } = await api.get(`${ENDPOINT_TOPICS.GET_ALL}=${page}`);
    console.log(`${ENDPOINT_TOPICS.GET_ALL}=${page}`)
    setIsSearch(false);
    setAllPages(data.totalPages);
    setListTopics(data.content);
  } catch (error) {
    console.log(error);
  }
};

export const getItensTopic = async (id: number, setListItens: Function, setLoading: Function) => {
  try {
    const { data } = await api.get(
      `${ENDPOINT_TOPICS.GET_ITEMS_TOPIC}/${id}` 
    );
    setLoading(false);
    setListItens(data);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
