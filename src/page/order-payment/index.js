/*
* @Author: Administrator
* @Date:   2017-10-26 20:33:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-29 21:04:06
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
	data:{
		orderNumber:_mm.getUrlParam('orderNumber')
	},
	init:function(){
		this.onLoad();
	},
	onLoad:function(){
		
		this.loadpaymentInfo();
	},
	
	loadpaymentInfo:function(){
		var _this = this,
			paymentHtml = '',
			$pageWrap = $('.page-wrap');
			_payment.getPaymentInfo(this.data.orderNumber,function(res){
				//渲染
				paymentHtml = _mm.renderHtml(templateIndex,res);
				$pageWrap.html(paymentHtml);
				_this.listOrderStatus();
			},function(data,errMsg){
				$pageWrap.html('<p class="err-tip">'+errMsg+'</p>')
			})
	},
	//监听订单状态
	listOrderStatus:function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber,function(){
				if(res==true)
				{
					window.location.href="./result.html?type=payment&orderNumber="+_this.data.orderNumber;
				}
			});
		},5e3);
	}
	
	
};
$(function(){
	page.init();
})