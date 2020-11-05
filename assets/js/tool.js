export const inBrowser = typeof window !== 'undefined'
export const URL = inBrowser ? window.URL || window.webkitURL || window.mozURL : null

export const _ready = 'ready'
export const _uploading = 'uploading'
export const _error = 'error'
export const _success = 'success'

export function initFile(name = '', size = 0, status = '', progress = 0, file = null) {
  const base64 = (file && file.base64) || createURL(file)
  const url = (file && file.url) || ''

  return { name, size, url, base64, status, progress, file }
}

export function processFiles(files, eachCb, cb) {
  const arr = []
  const len = files.length

  for (let i = 0; i < len; i++) {
    let file = files[i]
    const newFile = initFile(file.name, file.size, _ready, 0, file)
    arr[i] = newFile
    eachCb(newFile, i)
  }
  cb(arr)
}

function createURL(file) {
  if (file && URL) {
    return URL.createObjectURL(file)
  }
  return ''
}

export function evalOpts(data, ...args) {
  if (typeof data === 'function') {
    return data.apply(this, args)
  }
  return data
}
