<script setup>
import { ref } from 'vue';


let imageUrl = ref('');

const imageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        imageUrl.value = URL.createObjectURL(file);
    }
};
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title text-center">Selected Image</h5>
            <hr />
            <div>
                <div v-if="imageUrl">
                    <img
                        :src="imageUrl"
                        alt="Uploaded Image"
                        width="500"
                    />
                </div>
            </div>
            <div>
                <input type="file" @change="imageUpload" />
            </div>
        </div>
    </div>
</template>
