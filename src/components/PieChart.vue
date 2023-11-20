<script setup>
import { ref, onMounted, nextTick } from 'vue';
import {
    Chart,
    PieController,
    CategoryScale,
    ArcElement,
    Title,
    Tooltip,
} from 'chart.js';

Chart.register(PieController, CategoryScale, ArcElement, Title, Tooltip);

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
        const ctx = document.getElementById('pieChart').getContext('2d');
        chart.value = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: props.chartData.labels,
                datasets: [
                    {
                        data: props.chartData.data,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Unique Words vs Repeated Words',
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
        <div class="card-body d-flex justify-content-center align-items-center">
            <div class="chart-container">
                <canvas id="pieChart"></canvas>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-body {
    height: 100%;
}
.chart-container {
    height: 300px;
}
</style>
