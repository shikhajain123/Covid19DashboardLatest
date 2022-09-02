import {Component} from 'react'
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxix,
  Tooltip,
  Legend,
  Bar,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class ChartsData extends Component {
  state = {
    isLoading: true,
    alldata: '',
    forOtherChart: '',
  }

  componentDidMount() {
    this.getChartData()
  }

  getChartData = async () => {
    const stateCode = this.props
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data`
    const options = {
      method: 'GET',
    }
  }
}

export default ChartsData
