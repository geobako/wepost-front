<template>
  <div class="home">
    <div class="home__container">
      <va-infinite-scroll :load="loadMore">
        <div class="row " v-for="article in articles" :key="article._id">
          <div class="flex  w-100 mb-8">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "Home",

  data() {
    return {
      value: "",
      data: []
    };
  },
  computed: mapState({
    articles: state => state.articles,
    currentPage: state => state.currentPage,
    lastPage: state => state.lastPage
  }),

  methods: {
    formatDate: date => moment(date).format("DD/MM/YYYY"),
    loadMore: () => {
      console.log(this.currentPage, this.lastPage);
      if (this.currentPage < this.lastPage) {
        this.$store.dispatch("getArticles", { page: this.currentPage + 1 });
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
