<template>
    <q-page class="q-ma-lg">
      <q-card class="q-pa-lg ">
        <q-stepper
          v-model="step"
          color="primary"
          keep-alive
          animated
        >
          <q-step :name="stepOne.name"
                  :icon="stepOne.icon"
                  :title="stepOne.title"
          >
            <step-one-content
              :description="stepOne.description"
              @stepOne:update="patients = $event"
            />
          </q-step>
          <q-step :name="stepTwo.name"
                  :icon="stepTwo.icon"
                  :title="stepTwo.title"
          >
            <step-two-content
              :description="stepTwo.description"
              @stepTwo:update="mainContent = $event"
            />
          </q-step>

          <q-step :name="stepThree.name"
                  :icon="stepThree.icon"
                  :title="stepThree.title"
          >
            <step-three-content
              :description="stepThree.description"
              @stepThree:update="comparable = $event"
            />
          </q-step>
          <q-step :name="stepFour.name"
                  :icon="stepFour.icon"
                  :title="stepFour.title"
          >
            <step-four-content
              :description="stepFour.description"
              @stepFour:update="count = $event"
            />
          </q-step>
          <q-step :name="stepFive.name"
                  :icon="stepFive.icon"
                  :title="stepFive.title"
          >
            <step-five-content
              :description="stepFive.description"
              :count="parseInt(count)"
              @stepFive:update="comparables = $event"
            />
          </q-step>
          <q-step :name="stepSix.name"
                  :title="stepSix.title"
                  :icon="stepSix.icon"
                  >
            <step-six-content
              :main-content="mainContent"
              :comparables="comparables"
              :description="stepSix.description"
              />
          </q-step>
        </q-stepper>
        <q-card-actions>
          <q-btn @click="step = (step === 3 && comparable === false) ? 6 : step + 1"
                 v-if="nextButton"
                 color="primary"
                 outline
                 label="Avançar"
          />
          <q-btn v-if="previousButton"
                 flat
                 @click="step = (step === 6 && comparable === false) ? 3 : step - 1"
                 color="primary"
                 label="Voltar"
                 class="q-ml-sm"
          />
        </q-card-actions>
      </q-card>

    </q-page>

</template>

<script>
import { ref } from 'vue';

import StepOneContent from 'components/steps/StepOneContent';
import StepTwoContent from 'components/steps/StepTwoContent';
import StepThreeContent from 'components/steps/StepThreeContent';
import StepFourContent from 'components/steps/StepFourContent';
import StepFiveContent from 'components/steps/StepFiveContent';
import StepSixContent from 'components/steps/StepSixContent';

export default {
  components: {
    StepSixContent,
    StepFiveContent,
    StepFourContent,
    StepThreeContent,
    StepTwoContent,
    StepOneContent,
  },

  data() {
    return {
      mainContent: null,
      comparable: null,
      step: ref(1),
      patients: null,
      comparables: [],
      count: null,
    };
  },
  computed: {
    nextButton() {
      if (this.step === 1) return !(this.patients === null);
      if (this.step === 2) return !(this.mainContent === null);
      if (this.step === 3) return !(this.comparable === null);
      if (this.step === 4) return (this.count > 0);
      if (this.step === 5) return (this.comparables.length - 1 === parseInt(this.count, 10));
      return false;
    },
    previousButton() {
      return this.step !== 1;
    },
    stepOne() {
      return {
        name: 1,
        title: 'Delimitação',
        icon: 'settings',
        description: 'Estamos na primeira etapa. Ela é primordial para compreendermos qual o tipo de análise '
          + 'necessitada. Preencha um dos campos abaixo indicando o intuito desta sessão.',

      };
    },
    stepTwo() {
      return {
        name: 2,
        title: 'Seleção do primeiro arquivo',
        icon: 'upload_file',
        description: (this.patients === 'one') ? 'Selecione o arquivo da primeira sessão e avance até a próxima etapa.' : 'Selecione o arquivo de sessão do primeiro paciente e avance até a próxima etapa.',
      };
    },
    stepThree() {
      return {
        name: 3,
        title: 'Comparações',
        icon: 'compare_arrows',
        description: (this.patients === 'one') ? 'Você deseja importar mais sessões do mesmo paciente?' : 'Vocề deseja importar mais sessões de outros pacientes?',
      };
    },
    stepFour() {
      return {
        name: 4,
        title: 'Quantidade de comparações',
        icon: 'calculate',
        description: 'Quantas sessões a mais você gostaria de comparar?',
      };
    },
    stepFive() {
      return {
        name: 5,
        title: 'Arquivos comparáveis',
        icon: 'upload_file',
        description: 'Insira os arquivos comparáveis (apenas um arquivo por campo)',
      };
    },
    stepSix() {
      return {
        name: 6,
        title: 'Resultados',
        icon: 'addchart',
        description: 'Resultados obtidos',
      };
    },
  },

};
</script>
