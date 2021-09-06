import { createStore } from "vuex";
import { GET_ARTICLES, LOGIN_USER, CREATE_ARTICLE } from "./types";
import axios from "axios";
import { useToast } from "vue-toastification";

const apiUrl = process.env.VUE_APP_API_URL;

const toast = useToast();

export default createStore({
  state: {
    articles: [],
    currentPage: 1,
    lastPage: 1,
    authenticated: false,
    token: "",
    loading: false,
    fetchingMore: false,
    loggingIn: false
  },
  getters: {
    loading: state => {
      return state.loading;
    },
    fetchingMore: state => {
      return state.fetchingMore;
    },
    articles: state => {
      return state.articles;
    },
    currentPage: state => {
      return state.currentPage;
    },
    lastPage: state => {
      return state.lastPage;
    },
    authenticated: state => {
      return state.authenticated;
    },
    token: state => {
      return state.token;
    },
    loggingIn: state => {
      return state.loggingIn;
    }
  },
  mutations: {
    [GET_ARTICLES.START]: state => {
      state.loading = true;
    },
    [GET_ARTICLES.SUCCESS]: (state, data) => {
      if (data.currentPage > 1) {
        state.articles = [...state.articles, ...data.articles];
      } else {
        state.articles = data.articles;
      }
      state.articles = data.articles;
      state.currentPage = data.currentPage;
      state.lastPage = data.lastPage;
      state.loading = false;
    },
    [GET_ARTICLES.ERROR]: (state, articles) => {
      state.loading = false;
    },
    [LOGIN_USER.START]: state => {
      state.loggingIn = true;
    },
    [LOGIN_USER.SUCCESS]: (state, data) => {
      state.authenticated = true;
      state.loggingIn = false;
      state.token = data.token;
    },
    [LOGIN_USER.ERROR]: state => {
      state.authenticated = false;
      state.loggingIn = false;
    }
  },
  actions: {
    async getArticles({ commit }, params) {
      try {
        commit(GET_ARTICLES.START);
        const reqParams = params ? params : {};
        const response = await axios.get(`${apiUrl}/article/all`, reqParams);

        commit(GET_ARTICLES.SUCCESS, response.data.data);
      } catch (error) {
        commit(GET_ARTICLES.ERROR);
      }
    },
    async login({ commit }, params) {
      try {
        commit(LOGIN_USER.START);
        const response = await axios.post(`${apiUrl}/auth/login`, params);
        commit(LOGIN_USER.SUCCESS, response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
        commit(LOGIN_USER.ERROR);
      }
    }
  },
  modules: {}
});
