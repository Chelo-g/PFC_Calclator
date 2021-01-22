import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    mixins: [HorizontalBar,reactiveProp],
    props: ['options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
}