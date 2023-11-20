<script setup>
import { createWorker } from 'tesseract.js';
import { image } from '../stores/image.js';
import { ref } from 'vue';

const isTranscribing = ref(false);

const transcribeImage = async () => {
    isTranscribing.value = true;
    const worker = await createWorker('eng');
    const transcribedImage = await worker.recognize(image.value.url);
    image.value.setText(transcribedImage.data.text);
    await worker.terminate();
    isTranscribing.value = false;
};

const emitUpdateShowStatistics = () => {
    emit('updateShowStatistics');
};

const emit = defineEmits(['updateShowStatistics']);

</script>

<template>
    <div class="card">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title text-center">Image Text</h5>
            <hr />
            <div class="flex-grow-1 d-flex mb-3">
                <textarea v-model="image.text" style="width: 100%"></textarea>
            </div>

            <div class="buttons mt-auto">
                <button
                    :disabled="isTranscribing"
                    class="btn btn-primary"
                    @click="transcribeImage"
                >
                    <span v-if="isTranscribing">Transcribing...</span>
                    <span v-else>Transcribe</span>
                </button>
                <button
                    :disabled="image.text == ''"
                    class="btn btn-primary"
                    @click="emitUpdateShowStatistics"
                >
                    Show Statistics
                </button>
                <button
                    class="btn btn-primary"
                >
                    Download
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.buttons {
    display: flex;
    justify-content: space-between;
}
</style>
