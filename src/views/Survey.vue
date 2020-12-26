<template>
  <div>
    <h1 class="text-center">Encuestas</h1>
    <h2>{{ survey.name }}</h2>
    <!-- <pre>{{ answers }}</pre> -->
    <v-form v-model="isValid" ref="form" @submit.prevent="send">
      <v-card class="my-5 mx-2" v-for="(question, index) in survey.questions" :key="question.id">
        <v-card-title>{{ question.title }}</v-card-title>
        <v-card-text>
          <div v-if="question.type == 't'">
            <v-textarea
              v-model="answers[index].body"
              solo
              label="Respuesta"
              rows="3"
              :rules="[rules.required]"
            ></v-textarea>
          </div>
          <div v-else-if="question.type == 'a'">
            <v-radio-group
              v-model="answers[index].option_id"
              column
              :rules="[rules.required]"
            >
              <v-radio
                v-for="option in question.options"
                :key="option.id"
                :label="option.description"
                :value="option.id"
              ></v-radio>
            </v-radio-group>
          </div>
          <div v-else-if="question.type == 'o'">
            <v-select
              v-model="answers[index].options"
              :items="question.options"
              item-text="description"
              item-value="id"
              label="Opciones"
              multiple
              chips
              :rules="[rules.required]"
            ></v-select>
          </div>
        </v-card-text>
      </v-card>
      <div class="text-center">
        <v-btn
          depressed
          color="primary"
          type="submit"
          :disabled="!isValid"
        >
          Enviar
        </v-btn>
      </div>
    </v-form>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Surveys',
  data: () => ({
    survey: null,
    answers: [],
    isValid: false,
    rules: {
      required: val => !!val || 'Este campo es requerido'
    }
  }),
  created () {
    this.getSurvey()
  },
  methods: {
    getSurvey () {
      let surveyId = this.$route.params.id
      axios.get('http://localhost:8000/api/surveys/' + surveyId + '/')
        .then(res => {
          this.survey = res.data
          
          res.data.questions.map(question => {
            this.answers.push({
              question: question.id,
              option_id: null,
              options: null,
              body: null
            })
          })
        })
    },
    send () {
      if (this.isValid) {
        axios.post('http://localhost:8000/api/answers/', this.answers)
          .then(res => alert(res.data))
      } else {
        this.validate()
      }
    },
    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>
