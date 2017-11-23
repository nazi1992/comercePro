/*
* @Author: Administrator
* @Date:   2017-11-03 20:16:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-23 22:15:54
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
		//编辑收货地址
		$(document).on('click','.edit',function(e){
			e.stopPropagation();//停止冒泡
				var shippingId = $(this).parents('.address-item').data('id');
							console.log("---gehakg"+shippingId);

				_address.getAddress(shippingId,function(res){
					addressModal.show({
						isUpdate:true,
						data:res,
						onSuccess:function(){
							_this.loadAddressList();
						}
					})
				},function(errMsg){
					console.log("---gehakg"+errMsg);

					_mm.errorTips(errMsg);
				})
			
		});
		//删除地址
		$(document).on('click','.del',function(e){
						e.stopPropagation();//停止冒泡

				var shippingId = $(this).parents('.address-item').data('id');
				if(window.confirm("确认要删除该地址吗？"))
				{
					_address.deleteAddress(shippingId,function(res){
					_this.loadAddressList();
					},function(errMsg){
						console.log("---gehakg"+errMsg);

						_mm.errorTips(errMsg);
					})
				}
				
			
		});
	},
	//加地址信息
	loadAddressList:function(){
				$('.address-model').html('<div>加载中</div>');

		var html = '',_this =this;
		//获取购物车列表
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			var AddressListHtml =_mm.renderHtml(addressTemplate,res);
			$('.address-model').html(AddressListHtml);
			_this.renderCart(res);
		},function(){
			$('.address-model').html('<p>地址加载失败，请刷新后重试</p>');
		})		
	},
	addressFilter:function(data){
		//处理地址列表中选中状态
		if(this.data.selectedAddressId){
			var selectAddressIdFlag = false;
			for(var i=0,length = data.list.length;i<length;i++)
			{
				if(data.list[i].id === this.data.selectedAddressId){
					data.list[i].isActive = true;
					selectAddressIdFlag = true;
				}

			}//如果以前选中的地址不在列表里，将其删除
			if(!selectAddressIdFlag)
			{
				this.data.selectedAddressId = null;
			}
		}
	},
	// 加载商品信息
	loadProductList:function(){
		var html = '',_this =this;
		$('.list-model').html('<div>加载中</div>');
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