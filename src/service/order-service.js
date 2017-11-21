/*
* @Author: Administrator
* @Date:   2017-10-19 22:34:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-21 20:45:18
*/
var _mm = require('util/mm.js');
var _product = {
	//获取商品列表
	getProductList:function(resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/order/get_order_cart_product.do'),
			method:'POST',
			success:resolve,
			error:reject
		});
	},//提交订单
	createOrder:function(orderInfo,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/order/create.do'),
			method:'POST',
			data:orderInfo,
			success:resolve,
			error:reject
		});
	}
}
module.exports = _product;