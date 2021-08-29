<template>
  <div class="row">
    <div class="col-12">
      <p class="text-body1">
        {{ description }}
      </p>
    </div>
    <div class="col-6">
      <q-file
        accept="application/json"
        outlined
        for="main"
        @change="onFileChange"
        v-model="file"
      />
    </div>
  </div>
</template>

<script>
import DescriptionPropMixin from 'components/mixins/DescriptionPropMixin';
import InputFileMethodMixin from 'components/mixins/InputFileMethodMixin';

export default {
  name: 'StepTwoContent',
  mixins: [DescriptionPropMixin, InputFileMethodMixin],
  data() {
    return {
      file: null,
    };
  },
};
</script>

<style scoped>

</style>
