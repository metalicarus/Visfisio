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
          <q-step :name="6"
                  title="Resultados"
                  icon="addchart"
                  >
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-lg-3"
                       v-for="(struture, index) in strutures"
                       :key="index"
                  >
                    <q-tree node-key="label"
                            :nodes="[struture]"
                            :key="index"
                    />
                  </div>
                </div>
<!--                <div class="row" v-if="step === 6">-->
<!--                  <div :class="(largeChart === property) ?-->
<!--                          'col-sm-12 col-md-12 col-lg-8' :-->
<!--                          'col-sm-12 col-md-12 col-lg-4'"-->
<!--                       v-for="(property, index) in arrayableProperties"-->
<!--                       :key="index"-->
<!--                       @click="setLargeChart(property)"-->
<!--                  >-->
<!--                    <div v-for="(arr, arrIndex) in arrayableContent" :key="arrIndex">-->
<!--                      <apexchart type="bar"-->
<!--                                 v-if="arr.series[0].property === property"-->
<!--                                 :series="arr.series"-->
<!--                                 :options="arr['chartOptions']"-->
<!--                                 height="auto"-->
<!--                                 width="100%"-->
<!--                      />-->
<!--                      <apexchart type="line"-->
<!--                                 v-if="arr.series[0].property === property"-->
<!--                                 :series="arr.series"-->
<!--                                 :options="arr['chartOptions']"-->
<!--                                 height="auto"-->
<!--                                 width="100%"-->
<!--                      />-->
<!--                    </div>-->
<!--                  </div>-->

<!--                </div>-->

            <div class="row" v-if="step === 6">
              <div :class="(largeChart === '') ?
                          'col-sm-12 col-md-12 col-lg-4' :
                          (largeChart === `bar${property}`) ?
                          'col-sm-12 col-md-12 col-lg-6' :
                          'col-sm-12 col-md-12 col-lg-3'"
                   v-for="(property, index) in arrayableProperties"
                   :key="index"
              >
                <q-btn round
                       flat
                       icon="open_in_full"
                       size="sm"
                       @click="setLargeChart(`bar${property}`)"
                />
                <div v-for="(arr, arrIndex) in arrayableContent" :key="arrIndex">
                  <apexchart type="bar"
                             v-if="arr.series[0].property === property"
                             :series="arr.series"
                             :options="arr['chartOptions']"
                             height="auto"
                             width="100%"
                  />
                </div>
              </div>

            </div>
            <div class="row" v-if="step === 6">
              <div :class="(largeChart === '') ?
                          'col-sm-12 col-md-12 col-lg-4' :
                          (largeChart === `line${property}`) ?
                          'col-sm-12 col-md-12 col-lg-6' :
                          'col-sm-12 col-md-12 col-lg-3'"
                   v-for="(property, index) in arrayableProperties"
                   :key="index"
              >
                <q-btn round
                       flat
                       icon="open_in_full"
                       size="sm"
                       @click="setLargeChart(`line${property}`)"
                />
                <div v-for="(arr, arrIndex) in arrayableContent" :key="arrIndex">
                  <apexchart type="line"
                             v-if="arr.series[0].property === property"
                             :series="arr.series"
                             :options="arr['chartOptions']"
                             height="auto"
                             width="100%"
                  />
                </div>
              </div>

            </div>
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

export default {
  components: {
    StepFiveContent,
    StepFourContent,
    StepThreeContent,
    StepTwoContent,
    StepOneContent,
  },

  data() {
    return {
      largeChart: '',
      mainContent: null,
      comparable: null,
      step: ref(1),
      patients: null,
      comparables: [],
      count: null,
      options: {},
      series: [44, 55, 41, 17, 15],
      arrayableLabels: {
        chart: {
          height: 350,
          width: '100%',
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
        },
        title: {
          text: null,
          align: 'center',
          style: {
            color: '#444',
          },
        },
      },

    };
  },
  computed: {
    strutures() {
      const strutures = [];

      const contents = [...this.comparables];
      contents.push(this.mainContent);

      contents.forEach((content, i) => {
        if (content !== undefined) {
          const keys = Object.keys(content);
          const obj = {
            label: i,
            children: [],
          };
          keys.forEach((x) => {
            if (!Array.isArray(content[x])) {
              obj.children.push({ label: `${x}: ${content[x]}` });
            }
          });
          strutures.push(obj);
        }
      });
      return strutures;
    },
    arrayableProperties() {
      const keys = Object.keys(this.mainContent);
      const arrayable = [];
      keys.forEach((key) => {
        if (Array.isArray(this.mainContent[key])) arrayable.push(key);
      });
      return arrayable;
    },
    singleProperties() {
      const keys = Object.keys(this.mainContent);
      const singles = [];
      keys.forEach((key) => {
        if (!Array.isArray(this.mainContent[key])) singles.push(key);
      });
      return singles;
    },
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
        description: 'Estamos na primeira etapa. Ela é primordial para compreendermos qual o tipo de análise'
          + 'necessitada. Preencha um dos campos abaixo indicando o intuito desta sessão.',

      };
    },
    stepTwo() {
      return {
        name: 2,
        title: 'Seleção do primeiro arquivo',
        icon: 'upload_file',
        description: 'Selecione o arquivo do primeiro paciente e avance até a próxima etapa.',
      };
    },
    stepThree() {
      return {
        name: 3,
        title: 'Comparações',
        icon: 'compare_arrows',
        description: 'Vocề deseja importar mais arquivos de sessões de outros pacientes?',
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
    arrayableContent() {
      const series = [];
      this.arrayableProperties.forEach((property) => {
        const serie = { property, name: 'Principal', data: {} };
        const result = { chartOptions: null, series: [] };

        serie.data = this.processMainArrayableValue(this.mainContent[property]);
        const comparables = this.processComparablesArrayblesValues(property, this.comparables);

        const options = JSON.parse(JSON.stringify(this.arrayableLabels));
        options.chart.type = 'bar';
        options.xaxis.categories = Object.getOwnPropertyNames(serie.data);
        options.title.text = property;

        comparables.props.forEach((prop) => {
          if (!options.xaxis.categories.includes(prop)) options.xaxis.categories.push(prop);
        });

        // options.xaxis.categories.sort();

        result.chartOptions = options;

        comparables.series.forEach((comparable) => {
          const normalized = this.dataNormalize(serie.data, comparable.data);
          serie.data = normalized.a;
        });

        comparables.series.forEach((comparable) => {
          const normalized = this.dataNormalize(serie.data, comparable.data);
          comparable.data = Object.values(normalized.b);
        });

        serie.data = Object.values(serie.data);
        result.series.push(serie);
        result.series = [...result.series, ...comparables.series];

        series.push(result);
      });
      return series;
    },
  },
  methods: {
    setLargeChart(chart) {
      console.log(chart);
      this.largeChart = (this.largeChart === chart) ? '' : chart;
    },
    dataNormalize(a, b) {
      Object.getOwnPropertyNames(a).sort().forEach((property) => {
        if (!(property in b)) b[property] = 0;
      });

      Object.getOwnPropertyNames(b).sort().forEach((property) => {
        if (!(property in a)) a[property] = 0;
      });
      return {
        a, b,
      };
    },
    processComparablesArrayblesValues(property, values) {
      const series = [];
      let props = [];
      values.forEach((x, i) => {
        const serie = { property, name: `Comparável ${i + 1}`, data: {} };
        serie.data = this.processMainArrayableValue(x[property]);
        props = [...props, ...Object.getOwnPropertyNames(serie.data)];
        series.push(serie);
      });
      props.filter((item, index) => props.indexOf(item) === index);
      return {
        series,
        props,
      };
    },
    processMainArrayableValue(values) {
      const data = {};
      values.forEach((x) => {
        data[x] = (data[x] || 0) + 1;
      });
      return data;
    },

  },
};
</script>
