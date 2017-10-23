/*
* @Author: Administrator
* @Date:   2017-10-19 22:34:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-19 22:48:34
*/
var _mm = require('util/mm.js');
var _cart = {
	//获取购物车数量
	getCartCount:function(resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/cart/get_cart_product_count.do'),
			success:resolve,
			error:reject
		});
	}
}
module.exports = _cart;