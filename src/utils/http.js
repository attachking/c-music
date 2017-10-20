import $ from 'jquery'
import {baseParams} from './config'

export function jsonp(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'jsonp',
      jsonp: 'jsonpCallback',
      data: Object.assign({}, data, baseParams),
      success(res) {
        resolve(res)
      },
      error(err) {
        reject(err)
      }
    })
  })
}
