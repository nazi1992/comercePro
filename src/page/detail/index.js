/*
* @Author: Administrator
* @Date:   2017-11-03 20:16:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-09 22:03:29
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product_service.js');
var _cart = require('service/cart-service.js');

var templateIndex = require('./index.string');

var page = {
	data:{
		
		productId:_mm.getUrlParam('productId')|| ''
		
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		//如果未传productId，则返回到首页
		if(!this.data.productId)
		{
			_mm.goHome();

		}
		this.loadDetail();
	},
	bindEvent:function(){
		
	},
	//加载商品详情数据
	loadDetail:function(){
		
	}
};

$(function(){
	page.init();
});