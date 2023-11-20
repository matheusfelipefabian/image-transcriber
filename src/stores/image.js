import { ref } from 'vue';

export const image = ref({
    url: '',
    text: '',
});

image.value.setImageUrl = function (value) {
    this.url = value;
};

image.value.setText = function (value) {
    this.text = value;
};
