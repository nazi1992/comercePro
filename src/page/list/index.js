/*
* @Author: Administrator
* @Date:   2017-11-03 20:16:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-08 23:50:20
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product_service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
	data:{
		listParam:{
			keyword:_mm.getUrlParam('keyword')|| '',
			categoryId:_mm.getUrlParam('categoryId')|| '',
			orderBy:_mm.getUrlParam('orderBy')|| 'default',
			pageNum:_mm.getUrlParam('pageNum')|| '1',
			pageSize:_mm.getUrlParam('pageSize')|| '5'
		}
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		this.loadList();
	},
	bindEvent:function(){
		var _this = this;
		$(".active").click(function(){
			console.info(1111);
			
			if(event.srcElement.nodeName.toLowerCase()=='i')
			{
				if($(event.srcElement).hasClass("sort1"))
				{
					$(event.srcElement).addClass("sort2");
					$(event.srcElement).removeClass("sort1");

					_this.data.listParam.orderBy = "price_desc";

				}
				else
				{
					$(event.srcElement).addClass("sort1");
					$(event.srcElement).removeClass("sort2");
					_this.data.listParam.orderBy = "price_asc";


				}
			}
				
			
			_this.loadList();
		});
	},
	//加载数据
	loadList:function(){
		var _this = this,
			listHtml = '',
		    listParam = this.data.listParam;
		_product.getProductList(listParam,function(res){
				listHtml = _mm.renderHtml(templateIndex,{
					list:res.list
				});
				$('#list_ulId').html(listHtml);
				_this.loadPagination({
					hasPreviousPage : res.hasPreviousPage,
					prePage : res.prePage,
					hasNextPage : res.hasNextPage,
					nextPage : res.nextPage,
					pageNum : res.pageNum,
					pages : res.pages
				});
		},function(errMsg){
			_mm.errorTips(errMsg)
		})
	},
	//加载分页信息 
	loadPagination:function(pageInfo){
		var _this = this;
		this.pagination  ?  "":(this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
				container:$('.pagelation'),onSelectPage:function(pageNum){
					_this.data.listParam.pageNum  = pageNum;
					_this.loadList();
				}
			})
		);

	},
};

$(function(){
	page.init();
});