export const formatSpecs = (params: any, food_id: string) => {
  let { specs, foodcate_id, shop_id } = params
  specs.forEach((item: any) => {
    item.sub.forEach((jtem: any) => {
      jtem.specs_name = item.name
      jtem.specs_id = item.id
      jtem.food_id = food_id
      jtem.foodcate_id = foodcate_id
      jtem.shop_id = shop_id
      jtem.name = jtem.spec
    })
  })
  let newSpecs: any = []
  specs.forEach((item: any) => {
    newSpecs.push(...item.sub)
  })
  return newSpecs
}
