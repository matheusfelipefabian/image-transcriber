<script setup>


import { image } from '../stores/image.js';

const imageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        image.value.setImageUrl(URL.createObjectURL(file));
    }
};
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title text-center">Selected Image</h5>
            <hr />
            <div>
                <div v-if="image.url">
                    <img
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
