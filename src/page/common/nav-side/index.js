/*
* @Author: Administrator
* @Date:   2017-10-22 18:17:01
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-30 22:57:11
*/

require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');


//导航
var nav_side = {
	option:{
		name:'',
		navList:[
			{name:'user-center',desc:'个人中心',href:'./user-center.html'},
			{name:'order-list',desc:'我的订单',href:'./order-list.html'},
			{name:'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
			{name:'about',desc:'关于MMall',href:'./about.html'}

		]
	},
	init:function(option)
	{
		//合并选项
		$.extend(this.option,option);//将用户的数据与定义的数据进行合并
		this.renderNav();

	},
	//渲染导航菜单
	renderNav:function()
	{
		//计算active数据
		for(var i=0,iLength = this.option.navList.length;i<iLength;i++)
		{
			if(this.option.navList[i].name===this.option.name)
			{
				this.option.navList[i].isActive = true;
			}
		};
		//生成与数据匹配的html
		var navHtml = _mm.renderHtml(templateIndex,{
			navList:this.option.navList
		});
		//放入容器
		$('.nav-side').html(navHtml);
	}
};
module.exports = nav_side;