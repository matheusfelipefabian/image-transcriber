<script setup>
import ImageUploader from './ImageUploader.vue';
import ImageTranscriber from './ImageTranscriber.vue';

</script>

<template>
    <main>
        <div class="container d-flex flex-column">
            <div class="row mt-2 flex-grow-1">
                <div class="col-sm-12 col-md-6 d-flex">
                    <ImageUploader
                        class="main-card flex-grow-1" />
                </div>

                <div class="col-sm-12 col-md-6 d-flex">
                    <ImageTranscriber class="main-card flex-grow-1" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.main-card {
    min-height: 300px;
}
</style>