/*
* @Author: Administrator
* @Date:   2017-10-13 23:01:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-02 22:58:18
*/
'use strict';
require('./index.css');

require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var bannerTemp = require('./banner.string');
var navSide = require('page/common/nav-side/index.js');

var _mm = require('util/mm.js');
navSide.init({
	name:'about'
});
$(function() {
	var bannerHtml = _mm.renderHtml(bannerTemp);
	$(".loadding").html(bannerHtml);
	$('.banner').unslider({
		dots:true 
	});
});
