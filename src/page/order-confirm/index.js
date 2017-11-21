/*
* @Author: Administrator
* @Date:   2017-11-03 20:16:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-21 22:57:49
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');

var addressTemplate = require('./address-list.string');
var productTemplate = require('./product-list.string');
var addressModal =  require('./address-add.js');
var page = {
	data:{
		selectedAddressId:null
		
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		//如果未传productId，则返回到首页
		
		this.loadAddressList();
		this.loadProductList();

	},
	bindEvent:function(){
		var _this = this;
		//地址的选择
		$(document).on('click','.address-item',function(){
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			_this.data.selectedAddressId = $(this).data('id');
		});
		//订单的提交
		$(document).on('click','.order-submit',function(){
			var shippingId = _this.data.selectedAddressId;
			if(shipping){
				_order.createOrder({shippingId:shippingId},function(res){
					window.location.href="./payment.html?orderNumber="+res.orderNo;
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
		});
		
		//地址的添加
		$(document).on('click','.new-address',function(){
			addressModal.show({
				isUpdate:false,
				onSuccess:function(){
					_this.loadAddressList();
				}
			});
		});
	},
	//加地址信息
	loadAddressList:function(){
		var html = '',_this =this;
		//获取购物车列表
		_address.getAddressList(function(res){
			var AddressListHtml =_mm.renderHtml(addressTemplate,res);
			$('.address-model').html(AddressListHtml);
			_this.renderCart(res);
		},function(){
			$('.address-model').html('<p>地址加载失败，请刷新后重试</p>');
		})		
	},
	// 加载商品信息
	loadProductList:function(){
		var html = '',_this =this;
	
		_order.getProductList(function(res){
			var ProductListHtml =_mm.renderHtml(productTemplate,res);
			$('.list-model').html(ProductListHtml);
			_this.renderCart(res);
		},function(){
			$('.list-model').html('<p>商品加载失败，请刷新后重试</p>');
		})		
	},
	renderCart:function(data){
		
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
		
	}
};

$(function(){
	page.init();
});