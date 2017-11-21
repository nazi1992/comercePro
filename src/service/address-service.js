/*
* @Author: Administrator
* @Date:   2017-10-19 22:34:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-20 21:24:34
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
	}
}
module.exports = _address;