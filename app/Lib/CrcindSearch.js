'use strict'

const { ioc } = use('@adonisjs/fold')
const parser = require('xml2json')

/** Class representing an instance of CrcindSearch. */
class CrcindSearch {

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
      let result = (await this.axios.get(`http://www.crcind.com/csp/samples/SOAP.Demo.cls?soap_method=GetListByName&name=${formatedData}`)).data
      result = parser.toJson(result, { object: true })['SOAP-ENV:Envelope']['SOAP-ENV:Body']
      result = result.GetListByNameResponse.GetListByNameResult ? result.GetListByNameResponse.GetListByNameResult.PersonIdentification : []
  
      // media: tvShow
        // kind: 'person',
  
      return result.map(({ Name }) => {
        return {
          category: 'person',
          name: Name,
          author: 'Not available',
          previewUrl: 'Not available',
          origin: 'crcind'
        }
      })
    } catch (error) {
      console.error(error)
      return []
    }
  }
}

ioc.singleton('App/Lib/CrcindSearch', () => {
  const axios = use('axios')
  return new CrcindSearch(axios)
})

module.exports = ioc.use('App/Lib/CrcindSearch')