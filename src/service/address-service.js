/*
* @Author: Administrator
* @Date:   2017-10-19 22:34:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-23 21:59:00
*/
var _mm = require('util/mm.js');
var _address = {
	//获取商品列表
	getAddressList:function(resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/shipping/list.do'),
			data:{
				pageSize:50
			},
			success:resolve,
			error:reject
		});
	},
	getProductDetail:function(productId,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/product/detail.do'),
			method:'POST',
			data:{
				productId:productId
			},
			success:resolve,
			error:reject
		});
	},//新建地址
	save:function(addressInfo,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/shipping/add.do'),
			method:'POST',
			data:addressInfo,
			success:resolve,
			error:reject
		});
	},
	//更新地址
	update:function(addressInfo,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/shipping/update.do'),
			method:'POST',
			data:addressInfo,
			success:resolve,
			error:reject
		});
	},
	//更新地址
	deleteAddress:function(shippingId,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/shipping/del.do'),
			method:'POST',
			data:{
				"shippingId":shippingId
			},
			success:resolve,
			error:reject
		});
	},
	//获取收件人信息
	getAddress:function(shippingId,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/shipping/select.do'),
			method:'POST',
			data:{
				shippingId:shippingId
			},
			success:resolve,
			error:reject
		});
	}
}
module.exports = _address;