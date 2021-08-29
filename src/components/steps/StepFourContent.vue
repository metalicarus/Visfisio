<template>
  <div class="row">
    <div class="col-12">
      <p class="text-body1">
        {{ description }}
      </p>
    </div>
    <div class="col-6">
      <q-input type="number"
               v-model="count"
               @change="change"
               outlined
      />
    </div>
  </div>
</template>

<script>
import DescriptionPropMixin from 'components/mixins/DescriptionPropMixin';

export default {
  name: 'StepFourContent',
  mixins: [DescriptionPropMixin],
  data() {
    return {
      count: 1,
    };
  },
  mounted() {
    this.change();
  },
  methods: {
    change() {
      this.$emit('stepFour:update', this.count);
    },
  },
};
</script>

<style scoped>

</style>
