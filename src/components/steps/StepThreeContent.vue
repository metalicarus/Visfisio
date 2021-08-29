<template>
    <div class="row">
      <div class="col-12">
        <p class="text-body1">
          {{ description }}
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
  name: 'StepThreeContent',
  components: { RadioDecision },
  mixins: [DescriptionPropMixin],
  computed: {
    options() {
      return [
        {
          label: 'Sim',
          caption: 'Ao importar mais arquivos você contemplará uma perspectiva longitudinal.',
          value: true,
          color: 'accent',
        },
        {
          label: 'Não',
          caption: 'Você receberá os resultados pontuais de uma única sessão.',
          value: false,
          color: 'purple',
        },
      ];
    },
  },
  methods: {
    change(value) {
      this.$emit('stepThree:update', value);
    },
  },
};
</script>

<style scoped>

</style>
