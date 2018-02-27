<script>
import { mapState, mapActions } from 'vuex'
import Highcharts from 'highcharts'
export default{
  name: 'Dashboard',
  mounted () {
    this.fetchCategories()
  },
  watch: {
    categories () {
      this.setupCharts()
    }
  },
  methods: {
    ...mapActions('categories', {
      fetchCategories: 'fetch'
    }),
    setupCharts () {
      Highcharts.chart(this.$refs.chartContainer, {
        credits: {
          href: 'http://localhost:8080/',
          text: '::Single Page Application::'
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Quantidade de produtos por categorias'
        },
        tooltip: {
          pointFormat: '{series.name}:<b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            }
          }
        },
        series: [{
          name: 'Produtos',
          colorByPoint: true,
          data: this.dataSource
        }]
      })
    }
  },
  computed: {
    ...mapState('categories', {
      categories (state) {
        return state.list
      }
    }),
    dataSource () {
      return this.categories.map(category => {
        return {
          name: category.name,
          y: category.products.length
        }
      })
    }
  }
}
</script>

<template>
<div>
    <div class="chart-container" ref="chartContainer"></div>
</div>
</template>

<style scoped>
.chart-container {
  width: 720px;
  height: 360px;
  margin: 0 auto;
  background-color: #f4f4f4;
}

</style>