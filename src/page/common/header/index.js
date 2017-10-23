/*
* @Author: Administrator
* @Date:   2017-10-19 21:25:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-22 17:39:23
*/
require('./index.css');
var _mm = require('util/mm.js');

//导航
var header = {
	init:function()
	{
		this.bindEvent();
		
		return this;
	},
	onLoad:function()
	{
		var keyword = _mm.getUrlParam('keyword');
		if(keyword)
		{
			$('#search-input').val(keyword);
		}//数据回填到输入搜索框
	},
	bindEvent:function()
	{
		var _this = this;
		//点击搜索按钮以后，做提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车建，后做搜索提交
		$('#search-input').keyup(function(e){
			if(e.keyCode ===13)
			{
				_this.searchSubmit();

			}
		});
	},
	//搜索的提交
	searchSubmit:function()
	{
		var keyword = $.trim($('#search-input').val());
		if(keyword)
		{//如果提交的时候有keyword,正常跳转到列表页
			window.location.href = "./list.html?keyword="+keyword;
		}else
		{//如果keyword为空，直接返回到首页
			_mm.goHome();
		}
	}
};
header.init();//因为不需要对外输出所以直接加载。