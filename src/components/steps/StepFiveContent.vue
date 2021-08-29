<template>
  <div class="row q-gutter-sm">
    <div class="col-12">
      <p class="text-body1">
        {{ description }}
      </p>
    </div>
    <div class="col-3" v-for="index in parseInt(count)" :key="index">
      <q-file
        accept="application/json"
        outlined
        :for="index.toString()"
        v-model="files[index]"
        @change="onFileChange"
      />
    </div>
  </div>
</template>

<script>
import DescriptionPropMixin from 'components/mixins/DescriptionPropMixin';
import InputFileMethodMixin from 'components/mixins/InputFileMethodMixin';

export default {
  name: 'StepFiveContent',
  mixins: [DescriptionPropMixin, InputFileMethodMixin],
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      files: [],

    };
  },
};
</script>

<style scoped>

</style>
