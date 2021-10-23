<template>
  <div class="q-gutter-sm">
    <div class="row">
      <div class="col-12">
        <p class="text-body1">{{ description }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <q-table
          table-class="screenwide"
          title="Propriedades singulares"
          :rows="tableRows"
          :columns="tableColumns"
          flat
        >
          <template v-slot:top-right>
            <q-btn
              color="primary"
              icon-right="archive"
              label="Export to csv"
              no-caps
              @click="exportTable"
            />
          </template>
        </q-table>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Expandir gráficos</q-item-label>
              <q-item-label caption>
                Recomendado para melhor visualização de dados granulares
              </q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle color="green" v-model="largeAllCharts" val="friend" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="row">
      <div :class="(largeAllCharts) ? 'col-sm-12 col-md-12 col-lg-12'
                          : (largeChart === '') ?
                          'col-sm-12 col-md-12 col-lg-4' :
                          (largeChart === `bar${property}`) ?
                          'col-sm-12 col-md-12 col-lg-6' :
                          'col-sm-12 col-md-12 col-lg-3'"
           v-for="(property, index) in arrayableProperties"
           :key="index"
      >
        <q-btn v-if="largeAllCharts === false"
                round
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
    <div class="row">
      <div :class="(largeAllCharts) ? 'col-sm-12 col-md-12 col-lg-12'
                          : (largeChart === '') ?
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
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-3"
           v-for="(struture, index) in structures"
           :key="index"
      >
        <q-tree node-key="label"
                :nodes="[struture]"
                :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DescriptionPropMixin from 'components/mixins/DescriptionPropMixin';
import { exportFile, useQuasar } from 'quasar';

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val;
  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}

export default {
  name: 'StepSixContent',
  mixins: [DescriptionPropMixin],
  props: {
    mainContent: {
      type: Object,
      required: true,
    },
    comparables: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      largeAllCharts: false,
      largeChart: '',
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
    structures() {
      const strutures = [];
      const contents = this.comparables.slice();
      contents.push(this.mainContent);
      contents.forEach((content, i) => {
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
      });
      return strutures;
    },
    tableColumns() {
      return this.singleProperties.map((x) => ({
        name: x,
        label: x,
        field: x,
        sortable: true,
      }));
    },
    tableRows() {
      const contents = this.comparables.slice();
      contents.push(this.mainContent);
      return contents;
    },
    singleProperties() {
      const keys = Object.keys(this.mainContent);
      const singles = [];
      keys.forEach((key) => {
        if (!Array.isArray(this.mainContent[key])) singles.push(key);
      });
      return singles;
    },
    arrayableProperties() {
      const keys = Object.keys(this.mainContent);
      const arrayable = [];
      keys.forEach((key) => {
        if (Array.isArray(this.mainContent[key])) arrayable.push(key);
      });
      return arrayable;
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
    setLargeChart(chart) {
      this.largeChart = (this.largeChart === chart) ? '' : chart;
    },
    processMainArrayableValue(values) {
      const data = {};
      values.forEach((x) => {
        data[x] = (data[x] || 0) + 1;
      });
      return data;
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
    exportTable() {
      const content = [this.tableColumns.map((col) => wrapCsvValue(col.label))].concat(
        this.tableRows.map((row) => this.tableColumns.map((col) => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format,
        )).join(',')),
      ).join('\r\n');

      const status = exportFile(
        'table-export.csv',
        content,
        'text/csv',
      );

      if (status !== true) {
        useQuasar().notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        });
      }
    },

  },
};
</script>

<style scoped>
.screenwide {
  max-width: 100% !important
}

.screenwide > .q-table {
  max-width: 100% !important
}

.screenwide > td {
  white-space: normal !important;
  word-wrap: normal !important;
  hyphens: manual

}

.screenwide > th {
  text-align: center !important
}

</style>
