'use strict'

const { ioc } = use('@adonisjs/fold')

/** Class representing an instance of TvmazeSearch. */
class TvmazeSearch {

  /**
   *
   * @param {Object} axios instance of axios
   */
  constructor (axios) {
    this.axios = axios
  }

  /**
   *
   * @param {String} data the data we most format
   */
  formatDataToQuery (data) {
    return decodeURIComponent(String(data)).toLowerCase()
  }

  /**
   *
   * @param {String} data the data we want to find
   * @returns {Array} return an array of object with the result of the query
   */
  async executeQuery (data) {
    const formatedData = this.formatDataToQuery(data)
    try {
      const result = (await this.axios.get(`http://api.tvmaze.com/search/shows?q=${formatedData}`)).data
  
      // media: tvShow
        // kind: 'tv-episode',
  
      return result.map(({ show }) => {
        const { url, name } = show
        return {
          category: 'tv-show',
          name,
          author: 'Not available',
          previewUrl: url,
          origin: 'tvmaze'
        }
      })
    } catch (error) {
      console.error(error)
      return []
    }
  }
}

ioc.singleton('App/Lib/TvmazeSearch', () => {
  const axios = use('axios')
  return new TvmazeSearch(axios)
})

module.exports = ioc.use('App/Lib/TvmazeSearch')