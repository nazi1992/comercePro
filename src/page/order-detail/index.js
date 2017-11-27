/*
* @Author: Administrator
* @Date:   2017-10-26 20:33:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-27 23:07:50
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	data:{
		orderNumber:_mm.getUrlParam('orderNumber')
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		//初始化左边菜单\
		navSide.init({
			name:'order-detail'
		})
		this.loadDetail();
	},
	bindEvent:function()
	{
		var _this = this;
		$(document).on('click','.order-cancel',function(){
			if(window.confirm('确认取消该订单吗？'));
			_order.cancelOrder(_this.data.orderNumber,function(res){
				_mm.successTips('该订单取消成功');
				_this.loadDetail();
			},function(errMsg){
				_mm.errorTips(errMsg);
			})
		})
	},
	loadDetail:function(){
		var _this = this,
			orderDetailHtml = '',
			$listCon = $('.panel-body');
			_order.getOrderDetail(this.data.listParam,function(res){
				_this.dataFilter(res);
				//渲染
				orderDetailHtml = _mm.renderHtml(templateIndex,res);
				$listCon.html(orderDetailHtml);
				
			},function(errMsg){
				$listCon.html('<p class="err-tip">'+errMsg+'</p>')
			})
	},
	dataFilter:function(res){
		data.needPay = data.status ==10;
		data.isCancelable =  data.status ==10;
	}
	
	
};
$(function(){
	page.init();
})