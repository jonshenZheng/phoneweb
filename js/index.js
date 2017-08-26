define(function(require, exports) {
    var $ = require('jquery2'),
        bajs = require('bajs')($),
        live = require('boai.wap.ready')($, bajs),
        header = require('boai.wap.util/public-1')($, bajs);
        //com = require('boai.wap.com/live/public.waike')($, bajs ,live);

    exports.setForm = function(){
        var from = new bajs.ext.AjaxForm([
                    {
                        tag : 'input',
                        prop : {
                            name : 'keyword',
                            type : 'text',
                            value : '输入想查询的关键字',
                            notice : '请输入关键字',
                            require : true,
                            className : 't'
                        }
                    }
                ], {
                    xhr : {
                        url : 'http://m.boai.com/search.php',
                        type : 'GET',
                        data : {
                            keyword : $("#key").val()
                        },
                        dataType : false
                    }
                }, {
                    onReady : function(){
                        $('.search-box').append(this._form);
                    },
                    submit : {
                        value : '搜 索',
                        className : 'submit'
                    }
            });
    }


    $(function(){


        function IsPC() {
            var userAgentInfo = navigator.userAgent,
                Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
                flag = true;

            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }

        exports.setForm();  

        var f3form = new bajs.ext.AjaxForm([
                {
                    tag  : 'input',
                    require : true,
                    title : '姓名',
                    notice : '请输入你的姓名',
                    prop : {
                        name : 'username',
                        type : 'text',
                        value : '请输入你的姓名'
                    }
                },
                {
                    tag  : 'input',
                    require : true,
                    title : '手机',
                    notice : '请输入你的电话',
                    prop : {
                        name : 'phone',
                        type : 'text',
                        value : '请输入你的电话'
                    }
                }                    
            ], {
                xhr : {
                    url : '',
                    type : 'GET',
                    data : {
                        ac : '',
                        source : '',
                        for_url : window.location.href,
                        jibingid : $('#jibingid').val()
                    },
                    dataType : 'jsonp'
                }
            },{
                onReady : function() {
                   $('.f1box .form').append(this._form);
                }, 
                submit : {
                    value : '确认提交',
                    className : 'btn_yy'
                }
            }),
            f11Form = new bajs.com.PageBooking('.f11Form'),
            lazyload = new bajs.view.LazyLoad('img[data-lazy]');


            function abs(num){

            	return num > 0 ? num : -num;

            }


            
            function scroll_box(obj){
                this.ele = $(obj);
                this.move_ele = this.ele.find('.scorlBox');

                var wid =  this.ele.width(),
                    btn_el = this.move_ele.find('.btnbox'),
                    lbox_wid = this.move_ele.find('.s_lbox').width(),
                    btnbox_wid = btn_el.width(),
                    btnbox_margin_l = parseInt(btn_el.css('margin-left')),
                    sty = 0,
                    sty2 = 0,
                    zuli = 0.5,
                    gd_len = 0,    //滚动距离
                    gd_len_tem,
                    speedX,
                    bj_bot = 0,    //滚动到底部的边界（等于$list的高度）
                    scro_y = 0,    //模拟滚动值,
                    scro_tem = 0,  //touchMove时，临时滚动值,
                    scro_res = false, //记录超出滚动高度返回来的方向，t为顶部返回到0，b为底部返回到边界
                    that = this,
                    y_scrol = 0,
                    speedY,
                    y_scrol_tem,
                    timer_y,
                    timer_x,
                    scop_t = 0,
                    $wind = $(window);


                btnbox_wid = btnbox_wid ? btnbox_wid : 0;

                btnbox_margin_l = btnbox_margin_l ? btnbox_margin_l : 0;



                bj_bot = lbox_wid+btnbox_wid+btnbox_margin_l+2-wid;



                function getEvent(e){
                    if(e){
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    else{
                        e = window.event;
                        e.cancelBubble = true;
                        e.returnValue = false;
                    }

                    return e;
                }


                function init(){

                	//以下是滑动手机屏幕

                    if(IsPC()){


                        that.ele.get(0).addEventListener('mousedown',function(e){   

                            e = getEvent(e);

                            sty = e.clientX;
                            sty2 = e.clientY;
                            scop_t = $wind.scrollTop();
                            document.addEventListener('mousemove', mouseMove ,false);
                            document.addEventListener('mouseup', mouseUp, false);
                            
                        },false);

                    }
                    else{

                        that.ele.get(0).addEventListener('touchstart',function(e){    
                            sty = e.touches[0].pageX;
                            sty2 = e.touches[0].pageY;
                            scop_t = $wind.scrollTop();
                            that.ele.get(0).addEventListener('touchmove', tMove ,false);
                            that.ele.get(0).addEventListener('touchend', tEnd, false);
                            
                        },false);

                    }


                        function mouseMove(e){

                            e = getEvent(e);

                            //正常滚动
                           	// console.log(e.targetTouches[0].pageX+' '+sty);                 

                            gd_len = e.clientX - sty;
                            scro_tem = scro_y+gd_len;
                            y_scrol = e.clientY - sty2;

                            //到边界减速
                                //左端往右
                                if(scro_tem > 0){
                                    scro_tem = scro_y+gd_len*0.6;
                                    scro_res = 't';
                                }
                                else if(scro_tem < -bj_bot){
                                    scro_tem = scro_y+gd_len*0.6;

                                    //右端往左
                                    scro_res = 'b';
                                }
                                else{
                                    scro_res = false;
                                }
                            
                            //console.log(y_scrol+' '+scop_t);

                            //console.log(scro_tem)
                            
                            
                            that.move_ele.css({"transform":"translate("+scro_tem+"px,0)",'transition-duration':'0ms'});   
                            
                            
                        }

                        function mouseUp(e){  

                            e = getEvent(e);

                            
                            if(scro_res){
                                goback();
                            }
                            else{
                                scro_y = scro_tem;
                            }
                            
                            document.removeEventListener('mousemove', mouseMove, false);
                            document.removeEventListener('mouseup', mouseUp, false);
                        }


                        function tMove(e){

                            e = getEvent(e);

                            //正常滚动
                           	// console.log(e.targetTouches[0].pageX+' '+sty);

                           	y_scrol_tem = y_scrol;
                           	gd_len_tem = gd_len;

                            gd_len = e.targetTouches[0].pageX - sty;
                            scro_tem = scro_y+gd_len;
                            y_scrol = e.targetTouches[0].pageY - sty2;
                            //到边界减速
                                //左端往右
                                if(scro_tem > 0){
                                    scro_tem = scro_y+gd_len*0.6;
                                    scro_res = 't';
                                }
                                else if(scro_tem < -bj_bot){
                                    scro_tem = scro_y+gd_len*0.6;

                                    //右端往左
                                    scro_res = 'b';
                                }
                                else{
                                    scro_res = false;
                                }
                           
                            
                            
                            that.move_ele.css({"transform":"translate("+scro_tem+"px,0)",'transition-duration':'0ms'});   
                            
                            
                        }

                        function tEnd(){  

                            //console.log(y_scrol);

                            //竖直滑动时
                            if(abs(y_scrol) > abs(gd_len)){


                            	var scrol_total = 0,
                            		derection; //1表示正数，0表示负数


                            	derection = y_scrol - y_scrol_tem;


                            	speedY = abs(derection) * 4;

                            	if(derection < 0){
                            		speedY = -speedY;
                            	}


                            	timer_y = setInterval(function(){

                            		if( abs(speedY) < 0.5){
                            			clearInterval(timer_y);
                            		}


                            		speedY *= 0.8; 

                            		scrol_total += speedY;

                            		$wind.scrollTop(scop_t-scrol_total);

                            		console.log(scop_t-scrol_total);

                            	},30);




                            	//$wind.scrollTop(scop_t-y_scrol);


                            }
                            
                            if(scro_res){
                                goback();
                            }
                            else{


                            	//缓动效果

                            	var huad_total = 0,
                            		huadon_tem = scro_tem,
                            		derection_shuip; //1表示正数，0表示负数


                            	derection_shuip = gd_len - gd_len_tem;


                            	speedX = abs(derection_shuip) * 2;

                            	if(derection_shuip < 0){
                            		speedX = -speedX;
                            	}


                            	timer_x = setInterval(function(){

                            		if( abs(speedX) < 0.5){
                            			clearInterval(timer_x);
                            			scro_y = huadon_tem;
                            		}


                            		speedX *= 0.8; 

                            		huad_total += speedX;

                            		huadon_tem = huad_total + scro_tem;

                            		if(huadon_tem > 0){
	                                    huadon_tem = 0;
	                                    clearInterval(timer_x);
	                                    scro_y = huadon_tem;
	                                }
	                                else if(huadon_tem < -bj_bot){
	                                    huadon_tem = -bj_bot;
	                                    clearInterval(timer_x);
	                                    scro_y = huadon_tem;
	                                }

                            		that.move_ele.css({"transform":"translate("+huadon_tem+"px,0)",'transition-duration':'0ms'});


                            	},30);


                                
                            }
                            
                            that.ele.get(0).removeEventListener('touchmove', tMove, false);
                            that.ele.get(0).removeEventListener('touchend', tEnd, false);
                        }

                        function goback(){
                            if(scro_res === 't'){
                                scro_y = 0;
                            }
                            else{
                                scro_y = -bj_bot;
                            }

                            that.move_ele.css({'transform':'translateX('+scro_y+'px)','transition-duration':'600ms'});
                            
                        }

                    }

                    init();
            }

      
            new scroll_box('.f2box .toucbox:eq(0) .toucdiv');
            new scroll_box('.f2box .toucbox:eq(1) .toucdiv');
            new scroll_box('.f2box .toucbox:eq(2) .toucdiv');
            new scroll_box('.f2box .toucbox:eq(3) .toucdiv');
            new scroll_box('.f2box .toucbox:eq(4) .toucdiv');
            new scroll_box('.f2box .toucbox:eq(5) .toucdiv');
            new scroll_box('.f2box .toucbox:eq(6) .toucdiv');
            new scroll_box('.f2box .toucbox:eq(7) .toucdiv');


            
    });
})