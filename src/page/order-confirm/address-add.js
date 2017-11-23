/*
* @Author: Administrator
* @Date:   2017-11-03 20:16:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-23 21:50:18
*/
require('./index.css');

var _mm = require('util/mm.js');
var _address = require('service/address-service.js');
var addressAddTemplate = require('./address-add.string');
var loadd = require('util/cities/index.js');
var addressModel = {
	show:function(option){
		//option的绑定
		this.option  = option;
		this.option.data = option.data || {};
		$('.addAddress-model').show();
		this.$modalWrap = $('.add-body');
		//渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	hide:function(){
		$('.addAddress-model').hide();
		
	},
	loadModal:function(){
		var addressModelHtml = _mm.renderHtml(addressAddTemplate,{
			isUpdate:this.option.isUpdate,
			data:this.option.data
		});
		this.$modalWrap.html(addressModelHtml);
		//加载省份
		this.loadProvince();
		//加载城市
		this.loadCities();
	},
	loadCities:function(){
		//如果是更新地址，并且有城市信息做城市的回填
		if(this.option.isUpdate&&this.option.data.receiverCity){
			$('#city').html('<option>'+this.option.data.receiverCity+'</option>');
		}
	},
	loadProvince:function(){
		$('#province').html("<option>请选择<option>");

		for(var i=0,len =loadd.length; i<len;i++){
			$('#province').append("<option value='"+loadd[i][0]+"'>"+loadd[i][0]+"<option>");
		}
		//如果是更新地址，并且有省份信息做省份的回填
		console.info(this.option.isUpdate+","+this.option.data.receiverProvince);
		if(this.option.isUpdate&&this.option.data.receiverProvince){
			$('#province').html('<option>'+this.option.data.receiverProvince+'</option>');
		}
	},
	bindEvent:function(){
		var _this = this;
		$(document).on('click','.close',function(){
			_this.hide();
		});
		$("#province").change(function(){
		 	 var province = $(this).val();
		 	for(var i=0;i<loadd.length;i++){
				if(province==loadd[i][0])
				{
					$('#city').html('');
					for(var j=0;j<loadd[i].length-1;j++)
					{

						$('#city').append("<option value='"+loadd[i][j+1]+"'>"+loadd[i][j+1]+"<option>")

					}
				}
			}
		});
		//提交收货地址
		$(document).on('click','.submit',function(){
			var result = _this.getReceiverInfo();
			isUpdate = _this.option.isUpdate;
			if(!isUpdate && result.status)
			{
				_address.save(result.data,function(res){
					_mm.successTips('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess ==='function'&&_this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
				//使用新地址
			}else if(isUpdate&&result.status)
			{
				_address.update(result.data,function(res){
					_mm.successTips('地址修改成功');
					_this.hide();
					typeof _this.option.onSuccess ==='function'&&_this.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
				//更新收件人，并且验证通过
			}else
			{
				_mm.errorTips(result.errMsg|| '好像哪里不对了~');
			}
		});

		
	},
	//获取表单里收件人信息的方法，并做表单的验证
	getReceiverInfo:function(){
		var reveiverInfo = {};
		result = {
			status:false
		};
		reveiverInfo.receiverName = $.trim(this.$modalWrap.find("#revicer-name").val());
		reveiverInfo.receiverProvince = $.trim(this.$modalWrap.find("#province").val());
		reveiverInfo.receiverCity = $.trim(this.$modalWrap.find("#city").val());
		reveiverInfo.receiverAddress = $.trim(this.$modalWrap.find("#revicer-address").val());
		reveiverInfo.receiverPhone = $.trim(this.$modalWrap.find("#revicer-phone").val());
		reveiverInfo.receiverEmail = $.trim(this.$modalWrap.find("#revicer-email").val());
		if(this.option.isUpdate){
			reveiverInfo.id =  this.$modalWrap.find('#receiver-id').val();
		}
		if(!reveiverInfo.receiverName)
		{
			result.errMsg = "请输入收件人姓名";
		}else if(!reveiverInfo.receiverProvince)
		{
			result.errMsg = "请输入收件人所在省份";

		}else if(!reveiverInfo.receiverPhone)
		{
			result.errMsg = "请输入收件人联系电话";

		}else if(!reveiverInfo.receiverCity)
		{
			result.errMsg = "请输入收件人所在城市";

		}else if(!reveiverInfo.receiverAddress)
		{
			result.errMsg = "请输入收件人详细地址";

		}else if(!reveiverInfo.receiverEmail)
		{
			result.errMsg = "请输入收件人邮编";

		}else{
			result.status = true;
			result.data = reveiverInfo;
		}
		return result;

	}
};

module.exports = addressModel;