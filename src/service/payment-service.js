/*
* @Author: Administrator
* @Date:   2017-10-19 22:34:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-29 21:05:13
*/
var _mm = require('util/mm.js');
var _product = {
	//获取二维码图片及订单信息
	getPaymentInfo:function(orderNumber,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/order/pay.do'),
			method:'POST',
			data:{
				orderNo:orderNumber
			},
			success:resolve,
			error:reject
		});
	},
	//监听订单状态
	getPaymentStatus:function(orderNumber,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/order/query_order_pay_status.do'),
			method:'POST',
			data:{
				orderNo:orderNumber
			},
			success:resolve,
			error:reject
		});
	},
	
}
module.exports = _product;