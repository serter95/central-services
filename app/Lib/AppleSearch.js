'use strict'

const { ioc } = use('@adonisjs/fold')

/** Class representing an instance of AppleSearch. */
class AppleSearch {

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
    return decodeURIComponent(String(data)).toLowerCase().split(' ').join('+')
  }

  /**
   *
   * @param {String} data the data we want to find
   * @returns {Array} return an array of object with the result of the query
   */
  async executeQuery (data) {
    const formatedData = this.formatDataToQuery(data)
    try {
      // media: movie
        // kind: 'feature-movie'
      
      // media: podcast
        // kind: 'podcast'
      
      // media: music
        // kind: 'song'
      
      // media: musicVideo
        // kind: 'music-video'
      
      // media: audiobook
        // wrapperType: 'audiobook'
      
      // media: shortFilm
        // wrapperType: 
      
      // media: tvShow
        // kind: 'tv-episode',
      
      // media: software
        // kind: 'software',
      
      // media: ebook
        // kind: 'ebook'
      
      const result = (await this.axios.get(`https://itunes.apple.com/search?term=${formatedData}&limit=25&media=all`)).data
      return result.results.map(({ kind, wrapperType, artistName, trackName, collectionName, previewUrl, trackViewUrl }) => {
        return {
          category: kind || wrapperType,
          name: trackName || collectionName,
          author: artistName,
          previewUrl: previewUrl || trackViewUrl,
          origin: 'apple'
        }
      })
    } catch (error) {
      console.error(error)
      return []
    }
  }
}

ioc.singleton('App/Lib/AppleSearch', () => {
  const axios = use('axios')
  return new AppleSearch(axios)
})

module.exports = ioc.use('App/Lib/AppleSearch')