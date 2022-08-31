import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import TotalStats from '../TotalStats'
import './index.css'
import SearchResult from '../SearchResult'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    statesInfo: [],
    searchInput: '',
    filteredSearchList: [],
  }

  componentDidMount() {
    this.getAllStatesData()
  }

  getAllStatesData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      let countryWideConfirmedCases = 0
      let countryWideRecoveredCases = 0
      let countryWideDeceasedCases = 0
      let countryWideActiveCases = 0

      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          countryWideConfirmedCases += total.confirmed ? total.confirmed : 0
          countryWideRecoveredCases += total.recovered ? total.recovered : 0
          countryWideDeceasedCases += total.deceased ? total.deceased : 0
        }
      })
      countryWideActiveCases +=
        countryWideConfirmedCases -
        (countryWideRecoveredCases + countryWideDeceasedCases)

      const states = statesList.map(each => ({
        stateName: each.state_name,
        stateCode: each.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.confirmed),

        recovered: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.recovered),

        deceased: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.deceased),

        other: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.other),
        population: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.population),
      }))

      this.setState({
        totalActiveCases: countryWideActiveCases,
        totalConfirmedCases: countryWideConfirmedCases,
        totalRecoveredCases: countryWideRecoveredCases,
        totalDeceasedCases: countryWideDeceasedCases,
        isLoading: false,
        statesInfo: states,
      })
    }
  }

  renderLoader = () => (
    <div testid="homeRouteLoader" className="loader">
      <Loader type="TailSpin" color="#007BFF" height="50" />
    </div>
  )

  renderEntireNationData = () => {
    const {
      totalActiveCases,
      totalConfirmedCases,
      totalDeceasedCases,
      totalRecoveredCases,
    } = this.state

    return (
      <>
        <div
          className="state-block-column-container"
          testid="countryWideConfirmedCases"
        >
          <p className="stats-title red">Confirmed</p>
          <img
            src="https://res.cloudinary.com/drytxchra/image/upload/v1661774685/check-mark_1_yctj1i.png"
            className="stats-icon"
            alt="country wide confirmed cases pic"
          />

          <p className="stats-number red">{totalConfirmedCases}</p>
        </div>
        <div
          className="state-block-column-container"
          testid="countryWideActiveCases"
        >
          <p className="stats-title blue">Active</p>
          <img
            src="https://res.cloudinary.com/drytxchra/image/upload/v1661774686/protection_1_zudke5.png"
            className="stats-icon"
            alt="country wide active cases pic"
          />

          <p className="stats-number blue">{totalActiveCases}</p>
        </div>
        <div
          className="state-block-column-container"
          testid="countryWideRecoveredCases"
        >
          <p className="stats-title green">Recovered</p>
          <img
            src="https://res.cloudinary.com/drytxchra/image/upload/v1661774685/recovered_1_u9gaxm.png"
            className="stats-icon"
            alt="country wide recovered cases pic"
          />

          <p className="stats-number green">{totalActiveCases}</p>
        </div>
        <div
          className="state-block-column-container"
          testid="countryWideRecoveredCases"
        >
          <p className="stats-title grey">Deceased</p>
          <img
            src="https://res.cloudinary.com/drytxchra/image/upload/v1661774684/breathing_1_bu3czh.png"
            className="stats-icon"
            alt="country wide deceased cases pic"
          />

          <p className="stats-number grey">{totalActiveCases}</p>
        </div>
      </>
    )
  }

  onSubmitSearchInput = () => {
    this.getStateWiseList()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getStateWiseList()
    }
  }

  render() {
    const {searchInput, filteredSearchList, isLoading} = this.state
    const showSearchList =
      filteredSearchList.length !== 0 ? this.showSearchList : ''

    return (
      <>
        <div className="home-container">
          <Header />
          <div className="responsive-container">
            <div className="search-btn-container">
              <button
                testid="searchButton"
                type="button"
                className="search-button"
                onClick={this.onSubmitSearchInput}
              >
                <BsSearch className="search-icon" />
              </button>

              <input
                className="search-input"
                type="search"
                placeholder="Enter the State"
                onChange={this.onGetSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
            </div>
            {searchInput.length > 0 ? showSearchList : ''}
            {isLoading ? (
              this.renderLoader
            ) : (
              <>
                <div className="country-stats-container">
                  {this.renderEntireNationData}
                </div>
                <div className="state-table-container">
                  {/* this.renderAllStatesList */}
                </div>
              </>
            )}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
