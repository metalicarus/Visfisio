<template>
  <q-list>
    <q-item tag="label" v-ripple v-for="(option, index) in options" :key="index">
      <q-item-section avatar>
        <q-radio v-model="value"
                 :val="option.value"
                 :color="option.color"
                 @click="change"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{option.label}}</q-item-label>
        <q-item-label caption> {{option.caption}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>

export default {
  name: 'RadioDecision',
  props: {
    options: {
      type: Array,
      required: true,
    },

  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    change() {
      this.$emit('decision:update', this.value);
    },
  },
};
</script>

<style scoped>

</style>
