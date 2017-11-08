/*
* @Author: Administrator
* @Date:   2017-11-07 23:09:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-08 23:49:30
*/
require("./index.css");

var  templatePagination= require("./index.string");
var _mm = require("util/mm.js");

var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container:null,
		pageNum:1,
		pagerange:3,
		onSelectPage:null
	};
	///事件的处理
	$(document).on('click','.pg-item',function(){
		var $this = $(this);
		//对于active和disabled，不做处理
		if($this.hasClass('active')||$this.hasClass('disabled')){
			return;
		}
		typeof _this.option.onSelectPage ==='function'
		?_this.option.onSelectPage($this.data('value')):null;
	});
}
//渲染分页组件
Pagination.prototype.render = function(userOption){
	this.option = $.extend({},this.defaultOption,userOption);
	//判断容器是否为合法的jquery对象
	if(!(this.option.container instanceof jQuery))
	{
		return;
	}
	if(this.option.pages ==1)
	{
		return;
	}
	//渲染分页内容
	this.option.container.html(this.getPaginationHtml());
}
Pagination.prototype.getPaginationHtml = function(userOption){
	var html='',
		option = this.option,
		pageArray = [],
		start = option.pageNum - option.pageRange>0
		?option.pageNum - option.pageRange:1,
		end =  option.pageNum + option.pageRange<option.pages?option.pageNum + option.pageRange:option.pages;
	pageArray = [];
	pageArray.push({
		name:'上一页',
		value:this.option.prePage,
		disabled:!this.option.hasPreviousPage
	})
	//数字按钮的处理
	for(var i=start;i<=end;i++)
	{
		pageArray.push({
			name:i,
			value:i,
			active:(i===option.pageNum)
		})
	}
	pageArray.push({
		name:'下一页',
		value:this.option.nextPage,
		disabled:!this.option.hasNextPage
	});
	html = _mm.renderHtml(templatePagination,{
		pageArray:pageArray,
		pageNum:option.pageNum,
		pages:option.pages
	})
	return html;
}
module.exports = Pagination;