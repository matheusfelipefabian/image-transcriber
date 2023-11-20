<script setup>
import {
    Chart,
    BarController,
    BarElement,
    LinearScale,
    CategoryScale,
} from 'chart.js';
import { ref, onMounted, nextTick } from 'vue';

Chart.register(BarController, BarElement, LinearScale, CategoryScale);

const props = defineProps({
    chartData: Object,
});

const canvas = ref(null);
const chart = ref(null);

onMounted(() => {
    nextTick(() => {
        updateChart();
    });
});

const updateChart = () => {
    if (!chart.value) {
        const ctx = document.getElementById('barChart').getContext('2d');
        chart.value = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: props.chartData.labels,
                datasets: [
                    {
                        label: '',
                        data: props.chartData.data,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Most Frequent Words',
                    },
                },
            },
        });
    } else {
        chart.value.data.labels = props.chartData.labels;
        chart.value.data.datasets[0].data = props.chartData.data;
        chart.value.update();
    }
};

</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="chart-container">
                <canvas id="barChart"></canvas>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chart-container {
    height: 300px;
}
</style>
