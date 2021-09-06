<template>
  <div class="home">
    <div class="home__container">
      <va-infinite-scroll :load="loadMore">
        <div class="row " v-for="article in articles" :key="article._id">
          <div @click="onArticleClick(article)" class="flex cursor-pointer  w-100 mb-8">
            <va-card stripe class="card" stripe-color="success">
              <va-card-title>{{ article.title }}</va-card-title>
              <va-card-content>{{ article.description }}</va-card-content>
              <va-card-actions>
                <div class="views">views: {{ article.views }}</div>
                <div class="views mt-2">
                  {{ article.creator.name }} {{ article.creator.surname }}
                </div>
                <div class="views mt-2">{{ this.formatDate(article.createdAt) }}</div>
              </va-card-actions>
            </va-card>
          </div>
        </div>
      </va-infinite-scroll>
    </div>
    <va-modal
      v-model="showModal"
      fullscreen
      :message="selectedArticle?.description"
      hide-default-actions
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import axios from "axios";

const apiUrl = process.env.VUE_APP_API_URL;
export default {
  name: "Home",

  data() {
    return {
      value: "",
      data: [],
      selectedArticle: null,
      showModal: false
    };
  },
  computed: {
    articles() {
      return this.$store.getters.articles;
    },
    currentPage() {
      return this.$store.getters.currentPage;
    },
    lastPage() {
      return this.$store.getters.lastPage;
    }
  },

  methods: {
    async onArticleClick(article) {
      try {
        this.showModal = true;

        this.selectedArticle = article;
        const res = await axios.get(`${apiUrl}/article/${article._id}`);
        this.$store.dispatch("incrementArticleViews", article);
      } catch (e) {}
    },
    formatDate: date => moment(date).format("DD/MM/YYYY"),
    async loadMore() {
      if (this.currentPage < this.lastPage) {
        return this.$store.dispatch("getArticles", { page: this.currentPage + 1 });
      }
    }
  },

  created() {
    this.$store.dispatch("getArticles");
  }
};
</script>

<style lang="scss">
.w-100 {
  width: 100%;
}

.cursor-pointer {
  cursor: pointer;
}
.home {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .mb-8 {
    margin-bottom: 4rem;
  }

  .mt-2 {
    margin-top: 1rem;
  }

  &__container {
    width: 100%;
    max-height: 80vh;

    .views {
      display: flex;
      padding-left: 16px;
    }
    .card {
      padding-bottom: 32px;
    }
  }
}
</style>
