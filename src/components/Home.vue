<script setup>
import { ref } from 'vue';

import ImageUploader from './ImageUploader.vue';
import ImageTranscriber from './ImageTranscriber.vue';
import Statistics from './Statistics.vue';

let showStatistics = ref(false);
</script>

<template>
    <main>
        <div class="container d-flex flex-column">
            <div class="row mt-2 flex-grow-1">
                <div class="col-sm-12 col-md-6 d-flex">
                    <ImageUploader
                        class="main-card flex-grow-1"
                        @updateShowStatistics="showStatistics = false"
                    />
                </div>

                <div class="col-sm-12 col-md-6 d-flex">
                    <ImageTranscriber
                        class="main-card flex-grow-1"
                        @updateShowStatistics="showStatistics = true"
                    />
                </div>
            </div>
        </div>

        <div v-if="showStatistics" class="container mt-5">
            <Statistics :showStatistics="showStatistics" />
        </div>
    </main>
</template>

<style scoped>
.main-card {
    min-height: 300px;
}
</style>
