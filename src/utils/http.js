import $ from 'jquery'
import {baseParams, AGENT} from './config'

export function jsonp(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'jsonp',
      jsonp: 'jsonpCallback',
      data: Object.assign({}, baseParams, data),
      success(res) {
        resolve(res)
      },
      error(err) {
        reject(err)
      }
    })
  })
}
export function post(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: AGENT + url,
      method: 'post',
      data: data,
      success(res) {
        resolve(res)
      },
      error(err) {
        reject(err)
      }
    })
  })
}
export function get(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      method: 'get',
      data: data,
      success(res) {
        resolve(res)
      },
      error(err) {
        reject(err)
      }
    })
  })
}
