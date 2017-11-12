/*
* @Author: Administrator
* @Date:   2017-11-03 20:16:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-12 17:24:24
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
		
		productId:_mm.getUrlParam('productId')|| '',
		detailInfo:{}
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
		var _this = this;
		//图片预览
		$(document).on('mouseenter','.img-item',function(){
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src',imageUrl);
		});
	
		
		var minCount = 1;
		$(document).on('click','.nums-del',function(){
				var $pCount = $('.p-count');
				var currCount = 1,
		minCount = 1,
		maxCount = _this.data.detailInfo.stock || 1;
			currCount = parseInt($pCount.val());
			currCount = currCount>minCount?currCount-1:minCount;
			$pCount.val(currCount);
		});
		$(document).on('click','.nums-add',function(){
				var $pCount = $('.p-count');
				var currCount = parseInt($pCount.val());
				maxCount = _this.data.detailInfo.stock || 1;

				currCount = currCount<maxCount?currCount+1:maxCount;
				$pCount.val(currCount);
		});
		//加入购物车
		$(document).on('click','.cart',function(){
				_cart.addToCart({
					productId:_this.data.productId,
					count:$('.p-count').val()
				},function(res){
					window.location.href="./result.html?type=cart-add";
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
		});
	},
	//加载商品详情数据
	loadDetail:function(){
		var html = '',_this =this,
		$pageWrap = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>')
		_product.getProductDetail(this.data.productId,function(res){
			_this.filter(res);
			//缓存住detail的数据
			_this.data.detailInfo = res;
			html = _mm.renderHtml(templateIndex,res);
			$pageWrap.html(html);
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">此商品太淘气了,找不到</p>');

		});
	},
	//数据 匹配
	filter:function(data){
		data.subImages = data.subImages.split(",");
	}
};

$(function(){
	page.init();
});