<script setup>
import { defineEmits } from 'vue';
import { image } from '../stores/image.js';

const emit = defineEmits();

const imageUpload = (event) => {
    image.value.setText('');
    const file = event.target.files[0];
    if (file) {
        image.value.setImageUrl(URL.createObjectURL(file));
        emit('updateShowStatistics');
    }
};
</script>

<template>
    <div class="card">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title text-center">Selected Image</h5>
            <hr />
            <div class="flex-grow-1">
                <div v-if="image.url">
                    <img
                        class="p-3"
                        :src="image.url"
                        alt="Uploaded Image"
                        width="500"
                    />
                </div>
            </div>
            <div class="mt-auto">
                <input type="file" @change="imageUpload" />
            </div>
        </div>
    </div>
</template>
