<template>
  <div>
    <h1 class="text-center">Encuestas</h1>
    <v-list-item v-for="survey in surveys" :key="survey.id" link :to="{ name: 'survey', params: { id: survey.id } }">
      <v-list-item-content>
        <v-list-item-title>> {{ survey.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Surveys',
  data: () => ({
    surveys: []
  }),
  created () {
    this.getSurveys()
  },
  methods: {
    getSurveys () {
      axios.get('http://localhost:8000/api/surveys/')
        .then(res => this.surveys = res.data)
    }
  }
}
</script>
