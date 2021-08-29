import { Notify } from 'quasar';

export default {
  data() {
    return {
      mainContent: undefined,
      comparables: [],
      comparableDisabled: '',
      countability: 1,

    };
  },
  methods: {
    incompatibleFileFormat(inputId, property) {
      Notify.create({
        type: 'danger',
        message: `O arquivo comparável nº ${inputId} contém uma propriedade inválida ${property}`,
      });
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.readFile(files[0], e.target.id);
    },

    readFile(file, inputId) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        if (inputId === 'main') {
          this.mainContent = json;
          this.comparables = [];
          this.comparableDisabled = false;
          localStorage.setItem('_visfisioMainContent', JSON.stringify(json));
          this.$emit('stepTwo:update', this.mainContent);
        } else if (this.comparableValidate(json, inputId)) {
          this.comparables[`${inputId}`] = json;
          this.$emit('stepFive:update', this.comparables);
        } else {
          document.getElementById(inputId).value = null;
        }
      };
      reader.readAsText(file);
    },

    comparableValidate(json, inputId) {
      let result = true;
      const properties = Object.getOwnPropertyNames(json);
      const mainProperties = Object.getOwnPropertyNames(JSON.parse(localStorage.getItem('_visfisioMainContent')));
      properties.forEach((property) => {
        if (!mainProperties.includes(property)) {
          result = false;
          this.incompatibleFileFormat(inputId, property);
        }
      });
      return result;
    },
  },
};
