/*
* @Author: Administrator
* @Date:   2017-11-03 20:16:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-21 23:02:34
*/
require('./index.css');

var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var addressAddTemplate = require('./address-add.string');

var addressModel = {
	show:function(option){
		//option的绑定
		this.option  = option;
		this.$modalWrap = $('.add-body');
		//渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	hide:function(){

	},
	loadModal:function(){
		var addressModelHtml = _mm.renderHtml(addressAddTemplate,this.option.data);
		this.$modalWrap.html(addressModelHtml);
		//加载省份
		this.loadProvince();
		//加载城市
		this.loadCities();
	},
	loadProvince:function(){
		
	}
};

module.exports = addressModel;