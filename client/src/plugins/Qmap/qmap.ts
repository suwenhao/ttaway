// const url = `//webapi.amap.com/maps?v=1.4.13&key=您申请的key值&callback=initAMap`
const url = `//map.qq.com/api/js?v=2.exp&key=O65BZ-NZWKO-YQ2WB-S6XJU-2MAQZ-TYBXP&callback=init&libraries=convertor`

export default function bmap() {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    if (window.QMap) {
      // @ts-ignore
      resolve(window.QMap)
    } else {
      const script = document.createElement('script')
      script.src = url
      script.onerror = reject
      document.head.appendChild(script)
    }
    // @ts-ignore
    window.init = () => {
      // @ts-ignore
      resolve(window.qq)
    }
  })
}
