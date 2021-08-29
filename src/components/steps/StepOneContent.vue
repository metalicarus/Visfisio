<template>
    <div class="row">
      <div class="col-12">
        <p class="text-body1">
           {{description}}
        </p>
      </div>
      <div class="col-12">
        <radio-decision
          :options="options"
          @decision:update="change"
        />
      </div>
    </div>
</template>

<script>

import DescriptionPropMixin from 'components/mixins/DescriptionPropMixin';
import RadioDecision from 'components/basic/RadioDecision';

export default {
  components: { RadioDecision },
  mixins: [DescriptionPropMixin],
  name: 'StepOneContent',
  computed: {
    options() {
      return [
        {
          label: 'Um Paciente',
          caption: 'Análise pontual ou longitudinal de um mesmo paciente',
          value: 'one',
          color: 'orange',
        },
        {
          label: 'Vários Pacientes',
          caption: 'Análise comparativa entre um ou mais pacientes',
          value: 'various',
          color: 'cyan',
        },
      ];
    },
  },
  methods: {
    change(value) {
      this.$emit('stepOne:update', value);
    },
  },
};
</script>

<style scoped>

</style>
