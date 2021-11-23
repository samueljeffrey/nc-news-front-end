import axios from "axios";

const api = axios.create({
  baseURL: "https://samueljeffrey-nc-news.herokuapp.com/api",
});

export const getTopics = () => {
  return api.get("/topics").then((response) => {
    return response.data.topics;
  });
};

export const getArticles = (topic, sort, order) => {
  let path = "/articles";
  if (topic === "all") {
    path += `?sort_by=${sort}&order=${order}`;
  } else {
    path += `?topic=${topic}&sort_by=${sort}&order=${order}`;
  }
  return api.get(path).then((response) => {
    return response.data.articles;
  });
};

export const getComments = (id) => {
  return;
};
