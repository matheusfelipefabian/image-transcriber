<script setup>
import { image } from '../stores/image.js';

import { onMounted, reactive } from 'vue';

import {
    Chart,
    BarController,
    BarElement,
    LinearScale,
    CategoryScale,
} from 'chart.js';
import BarChart from './BarChart.vue';
import PieChart from './PieChart.vue';

Chart.register(BarController, BarElement, LinearScale, CategoryScale);

const props = defineProps({
    showStatistics: Boolean,
});

let frequencyChartData = reactive({
    data: [],
    labels: [],
});

let uniqueVsRepeatedWordsChartData = reactive({
    data: [],
    labels: [],
});

const wordsByAppears = new Map();

onMounted(() => {
    formatTextData();
    FrequencyChart();
    uniqueVsRepeatedWordsChart();
});

const formatTextData = () => {
    const text = image.value.text;

    text.split(' ').forEach((word) => {
        if (wordsByAppears.has(word))
            wordsByAppears.set(word, wordsByAppears.get(word) + 1);
        else wordsByAppears.set(word, 1);
    });
};

const uniqueVsRepeatedWordsChart = () => {
    const labels = ['Unique', 'Repeated'];
    const data = [0, 0];
    wordsByAppears.forEach((value, key) => {
        if (value === 1) data[0] += 1;
        else data[1] += 1;
    });

    uniqueVsRepeatedWordsChartData.data = data;
    uniqueVsRepeatedWordsChartData.labels = labels;
};
const FrequencyChart = () => {
    let MapToArray = Array.from(wordsByAppears, ([word, appears]) => ({
        word,
        appears,
    }));

    MapToArray.sort((a, b) => b.appears - a.appears);

    const dataAux = [];
    const labelsAux = [];
    const length = MapToArray.length > 10 ? 10 : MapToArray.length;
    for (let i = 0; i < length; i++) {
        dataAux.push(MapToArray[i].appears);
        labelsAux.push(MapToArray[i].word);
    }

    frequencyChartData.data = dataAux;
    frequencyChartData.labels = labelsAux;
};
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="container">
                <h5 class="card-title text-center">Statistics</h5>
                <div class="row mt-2">
                    <div class="col-sm-12 col-md-6 d-flex flex-column">
                        <div class="card flex-grow-1">
                            <BarChart :chartData="frequencyChartData" />
                        </div>
                    </div>

                    <div class="col-sm-12 col-md-6 d-flex flex-column">
                        <div class="card card-list flex-grow-1">
                            <PieChart
                                :chartData="uniqueVsRepeatedWordsChartData"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
