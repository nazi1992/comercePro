/*
* @Author: Administrator
* @Date:   2017-10-19 22:34:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-12 15:33:33
*/
var _mm = require('util/mm.js');
var _product = {
	//获取商品列表
	getProductList:function(listParam,resolve,reject){
		_mm.request({
			url:_mm.getServerUrl('/product/list.do'),
			method:'POST',
			data:listParam,
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
module.exports = _product;