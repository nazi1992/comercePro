/*
* @Author: Administrator
* @Date:   2017-10-26 20:33:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-26 21:20:29
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
	data:{
		listParam:{
			pageNum:1,
			pageSize:10
		}
	},
	init:function(){
		this.onLoad();
	},
	onLoad:function(){
		//初始化左边菜单\
		navSide.init({
			name:'order-list'
		})
		this.loadOrderList();
	},
	loadOrderList:function(){
		var _this = this,
			orderListHtml = '',
			$listCon = $('.panel-body');
			_order.getOrderList(this.data.listParam,function(res){
				//渲染
				orderListHtml = _mm.renderHtml(templateIndex,res);
				$listCon.html(orderListHtml);
				//加载分页信息
				_this.loadPagination({
					hasPreviousPage : res.hasPreviousPage,
					prePage : res.prePage,
					hasNextPage : res.hasNextPage,
					nextPage : res.nextPage,
					pageNum : res.pageNum,
					pages : res.pages
				});
			},function(errMsg){
				$listCon.html('<p class="err-tip">加载订单失败，请刷新重试</p>')
			})
	},
	
	//加载分页信息 
	loadPagination:function(pageInfo){
		var _this = this;
		this.pagination  ?  "":(this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
				container:$('.pagelation'),onSelectPage:function(pageNum){
					_this.data.listParam.pageNum  = pageNum;
					_this.loadOrderList();
				}
			})
		);

	}
};
$(function(){
	page.init();
})