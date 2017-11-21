/*
* @Author: Administrator
* @Date:   2017-11-03 20:16:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-16 23:37:36
*/
require('./index.css');
var nav = require('page/common/nav/index.js');
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
		$(document).on('click','.select-input',function(){
			var $this = $(this),
			productId = $this.parents('.header-icon-body').data('product-id');
			//切换选中状态
			if($this.is(':checked'))
			{
				_cart.selectProduct(productId,function(res){
					_this.renderCart(res);
				},function(){
					_this.showCartError();
				})
				//选中
			}else
			{
				_cart.unselectProduct(productId,function(res){
					_this.renderCart(res);
				},function(){
					_this.showCartError();
				})
			}
		});
	//商品的全选与取消全选
	$(document).on('click','.select-input-all',function(){
			var $this = $(this),
			productId = $this.parents('.header-icon-body').data('product-id');
			//全选
			if($this.is(':checked'))
			{
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				},function(){
					_this.showCartError();
				})
				//选中
			}else
			{//取消全选
				_cart.unselectAllProduct(function(res){
					_this.renderCart(res);
				},function(){
					_this.showCartError();
				})
			}
		});
		//商品数量的变化
		$(document).on('click','.cartBtn',function(){
			var $this = $(this),
				$pCount = $this.siblings('.nums-nomal'),
				type = $this.hasClass('nums-del') ?'nums-del':'nums-add',
				productId = $this.parents('.header-icon-body').data('product-id'),
				currCount =parseInt($pCount.val()),
				minCount = 1,
				maxCount = parseInt($pCount.data('max')),
				newCount = 0;
				if(type ==='nums-add')
				{
					if(currCount>=maxCount){
						_mm.errorTips("该商品数量已达上限");
						return;
					}
					newCount = currCount + 1;
				}else if(type==='nums-del')
				{
					if(currCount<=minCount)
					{
						return;
					}
					newCount = currCount-1;
				}
				//更新购物车商品数量
				_cart.updateProduct({
					productId:productId,
					count:newCount
				},function(res){
					_this.renderCart(res);
				},function(){
					_this.showCartError();
				})
		});
		//删除单个商品
		$(document).on('click','.goods-option',function(){
			if(window.confirm('确认要删除该商品？')){
				var productId = $(this).parents('.header-icon-body').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		//删除选中商品(一个或多个)
		$(document).on('click','.delete-select',function(){
			if(window.confirm('确认要删除该商品？')){
				var arrProductIds = [],
				$selectedItem = $('.select-input:checked');
				for(var i=0;i<$selectedItem.length;i++){//循环查找选中的productIds
					arrProductIds.push($($selectedItem[i]).parents('.header-icon-body').data('.product-id'));
				}
				if(arrProductIds.length){
					_this.deleteCartProduct(arrProductIds.join(','));

				}else
				{
					_mm.errorTips('你还没有选中要删除的商品');
				}
			}
		});
		//提交购物车
		$(document).on('click','.count-all',function(){
			//总价大于0，进行提交
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice>0){
				window.location.href="./confirm.html";
			}else
			{
				_mm.errorTips('请选择商品在提交');
			}
		});
	},
	//加载购物车数据
	loadCart:function(){
		var html = '',_this =this;
		//获取购物车列表
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(){
			_this.showCartError();
		})		
	},
	renderCart:function(data){
		this.filter(data);
		//缓存购物车信息
		this.data.cartInfo = data;
		//生成HTML
		var cartHtml = _mm.renderHtml(templateIndex,data);
		$('.page-wrap').html(cartHtml);
		//通知导航的购物车更新数量
		nav.loadCartCount();
	},
	//数据 匹配
	filter:function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},//显示错误信息
	showCartError:function(){
		$('page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试呢。<p>')

	},
	//删除指定商品,支持批量删除,用逗号分割
	deleteCartProduct:function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds,function(res){
					_this.renderCart(res);
				},function(){
					_this.showCartError();
				});
	}
};

$(function(){
	page.init();
});