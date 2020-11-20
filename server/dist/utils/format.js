"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSpecs = void 0;
exports.formatSpecs = (params, food_id) => {
    let { specs, foodcate_id, shop_id } = params;
    specs.forEach((item) => {
        item.sub.forEach((jtem) => {
            jtem.specs_name = item.name;
            jtem.specs_id = item.id;
            jtem.food_id = food_id;
            jtem.foodcate_id = foodcate_id;
            jtem.shop_id = shop_id;
            jtem.name = jtem.spec;
        });
    });
    let newSpecs = [];
    specs.forEach((item) => {
        newSpecs.push(...item.sub);
    });
    return newSpecs;
};
//# sourceMappingURL=format.js.map