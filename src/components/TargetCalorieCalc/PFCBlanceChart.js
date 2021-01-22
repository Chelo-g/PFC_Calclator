import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    mixins: [Doughnut,reactiveProp],
    props: ['options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
}