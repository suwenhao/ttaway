export const shopFilter = (sort: any) => {
  switch(sort) {
    case 1: 
      return 'rating'
    case 2: 
      return 'sale'
    case 3: 
      return 'starting_price'
    case 4: 
      return 'shipping_fee'
    case 5: 
      return 'distanceValue'
  }
}
interface PTimebigsmall{
  (startTime: string, endTime: string): boolean;
}
export const timebigsmall: PTimebigsmall = (start: string, end: string) => {
  let date = new Date()
    let currentTime = date.getTime()
    let Y = date.getFullYear()+ '-';
    let M =  (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate();
    let startTime = new Date(`${Y}${M}${D} ${start}`).getTime()
    let endTime = new Date(`${Y}${M}${D} ${end}`).getTime()
    if (currentTime<startTime||currentTime>endTime){
      return true
    } else {
      return false
    }
}

export const activePrice = (as, price) => {
  as.forEach((item) => {
    switch(item.val){
      case 'jian':
        var data = item.offer_data.split(':')
        data = data.map((v) => {
          let manjian = v.split(',')
          return {
            man: manjian[0],
            jian: manjian[1]
          }
        })
        data.sort((a, b) => a.man - b.man)
        var deng = data[0]
        data.forEach(k => {
          if (price>k.man) {
            deng = k
          } else {
            return
          }
        })
        price -= parseFloat(deng.jian)
        break;
      case 'shou':
      case 'xin':
        price -= parseFloat(item.offer_data)
        break;
      default:
        break;
    }
  })
  return price<0?0:price
}