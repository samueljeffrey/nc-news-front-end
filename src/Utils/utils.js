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

export const getUsers = () => {
  return api.get("/users").then((response) => {
    return response.data.users;
  });
};

export const getSingleArticle = (id) => {
  return api.get(`/articles/${id}`).then((response) => {
    return response.data.article;
  });
};

export const getComments = (id) => {
  return api.get(`/articles/${id}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const voteOnArticle = (id, vote) => {
  return api.patch(`/articles/${id}`, { inc_votes: vote }).then((response) => {
    return response.data.article;
  });
};

export const deleteComment = (id) => {
  return api
    .delete(`/comments/${id}`)
    .then(() => {
      return "done";
    })
    .catch((err) => {
      return err;
    });
};

export const getSingleUser = (username) => {
  return api.get(`/users/${username}`).then((response) => {
    return response.data.user;
  });
};

export const postComment = (id, username, body) => {
  return api
    .post(`/articles/${id}/comments`, { username, body })
    .then(() => {
      return "done";
    })
    .catch((err) => {
      return err;
    });
};
