/*
* @Author: Administrator
* @Date:   2017-11-03 20:16:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-13 23:17:03
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');

var templateIndex = require('./index.string');

var page = {
	data:{
		
		
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		//如果未传productId，则返回到首页
		
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		//图片预览
		// $(document).on('mouseenter','.img-item',function(){
		// 	var imageUrl = $(this).find('.p-img').attr('src');
		// 	$('.main-img').attr('src',imageUrl);
		// });
	
		
	},
	//加载购物车数据
	loadCart:function(){
		var html = '',_this =this,
		$pageWrap = $('.page-wrap');
		//$pageWrap.html('<div class="loading"></div>')
		
	},
	//数据 匹配
	filter:function(data){
	}
};

$(function(){
	page.init();
});