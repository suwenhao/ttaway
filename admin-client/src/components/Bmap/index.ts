const url = `//api.map.baidu.com/api?v=2.0&ak=pytiagygFfZqXK0QtRSZnRYnxSeApL8y&callback=init`

export default function bmap() {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    if (window.BMap) {
      // @ts-ignore
      resolve(window.BMap)
    } else {
      const script = document.createElement('script')
      script.src = url
      script.onerror = reject
      document.head.appendChild(script)
    }
    // @ts-ignore
    window.init = () => {
      // @ts-ignore
      resolve(window.BMap)
    }
  })
}