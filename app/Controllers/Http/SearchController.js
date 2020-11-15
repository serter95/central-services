'use strict'

const { validateAll, sanitize } = use('Validator')
const ValidationException = use('App/Exceptions/ValidationException')
const AppleSearch = use('App/Lib/AppleSearch')
const TvmazeSearch = use('App/Lib/TvmazeSearch')
const CrcindSearch = use('App/Lib/CrcindSearch')

class SearchController {
  /**
  * @swagger
  * /api/search/{data}:
  *   get:
  *     tags:
  *       - Searchs
  *     summary: Get all result from diferents searching services
  *     parameters:
  *       - name: data
  *         description: the data given from the user
  *         in: path
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: Return an array of results
  *         example:
  *           category: feature-movie
  *           name: Adam
  *           author: Max Mayer
  *           previewUrl: https://video-ssl.itunes.apple.com/itunes-assets/Video124/v4/27/06/6d/27066d71-3da9-436d-88fb-daa6ba55461b/mzvf_2864497229953009356.640x360.h264lc.U.p.m4v
  *           origin: apple
  * @descriptor Method that return a list of result from other services.
  * @param {string} data data given from the user
  * @return {Array} return an array of objects
  */
  async index ({ params }) {
    // reglas para sanear los datos
    const sanitizationRules = { data: 'trim' }
    // saneamos los datos
    const sanitizedData = await sanitize(params, sanitizationRules)
    // reglas del  validador
    const rules = { data: 'required|string' }
    // se aplica la validacion de los datos
    const validation = await validateAll(sanitizedData, rules)
    if (validation.fails()) {
      throw new ValidationException(validation.messages())
    }

    const { data } = sanitizedData

    const appleResult = await AppleSearch.executeQuery(data)
    const tvmazeResult = await TvmazeSearch.executeQuery(data)
    const crcindSearch = await CrcindSearch.executeQuery(data)

    const arrayConcat = [...appleResult, ...tvmazeResult, ...crcindSearch]
    
    arrayConcat.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }

      // a must be equal to b
      return 0;
    })

    return arrayConcat
  }
}

module.exports = SearchController
