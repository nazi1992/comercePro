/*
* @Author: Administrator
* @Date:   2017-10-19 22:34:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-27 23:06:27
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
	},
	getOrderList:function(listParam,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/order/list.do'),
			method:'POST',
			data:listParam,
			success:resolve,
			error:reject
		});
	},
	getOrderDetail:function(orderNumber,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/order/detail.do'),
			method:'POST',
			data:{
				orderNo:orderNumber
			}
			,
			success:resolve,
			error:reject
		});
	},
	//取消订单
	cancelOrder:function(orderNumber,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/order/cancel.do'),
			method:'POST',
			data:{
				orderNo:orderNumber
			}
			,
			success:resolve,
			error:reject
		});
	}
}
module.exports = _product;