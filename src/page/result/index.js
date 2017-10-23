/*
* @Author: Administrator
* @Date:   2017-10-23 19:58:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-23 21:04:54
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default';
		$('.'+type+'-success').show();
})