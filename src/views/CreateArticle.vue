<template>
  <div class="create-article">
    <div class="create-article__container">
      <va-input
        class="mb-4"
        v-model="title"
        label="Title"
        placeholder="Title"
        messages="Required"
      />
      <va-input class="mb-4" v-model="subtitle" label="Subtitle" placeholder="Subtitle" />
      <va-input
        class="mb-4"
        type="textarea"
        v-model="description"
        label="Description"
        placeholder="Description"
        :min-rows="4"
        :max-rows="6"
        messages="Required"
        autosize
      />

      <va-button
        :disabled="checkVal"
        @click="createArticle"
        class="mr-4"
        :loading="loggingIn"
        size="medium"
      >
        Create article
      </va-button>
    </div>
  </div> </template
>;

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const apiUrl = process.env.VUE_APP_API_URL;

export default {
  setup() {
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      title: "",

      subtitle: "",
      description: "",
      loading: false
    };
  },

  computed: {
    token() {
      return this.$store.getters.token;
    },
    authenticated() {
      return this.$store.getters.authenticated;
    },
    checkVal: function() {
      const result = !this.title || !this.description;
      return result;
    }
  },
  methods: {
    async createArticle(event) {
      const params = {
        title: this.title,
        subtitle: this.subtitle || undefined,
        description: this.description
      };
      try {
        this.loading = true;
        const res = await axios.post(`${apiUrl}/article`, params, {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        this.loading = false;
        this.$router.push("/");
      } catch (e) {
        this.toast.error("Something went wrong");
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss">
.create-article {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    width: 400px;
  }
}
</style>
