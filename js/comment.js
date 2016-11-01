/**
 * Created by Administrator on 2016/8/16.
 */
window.onload=function(){
   //var lunBoImg=new lunBo('runList',5,-600,4000);
    init();

    //调用日期插件,生成倒计时

    //调用动画函数,绘制动画
   canvasDraw();

};
$(function(){
    //var date = new Date();
    //var minute= date.getMinutes();
    //var second= date.getSeconds();
    $(".digits").countdown({
        image: "counter/digits.png",
        format: 'mm:ss',
        startTime: '33:44'
    });
});
