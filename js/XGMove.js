/**
 * 用来封装一个运动的库,适应各种不同的情况
 * @param obj 是让什么物体运动
 * @param attribute  运动物体的属性名
 * @param target   运动物体要运动到的目标值
 * @param chainFn  链式运动
 * @constructor
 */
function XGMove(obj,attribute,target,chainFn){//obj是让什么物体运动,属性名,目标值,链式运动
    clearInterval(obj.XGTimer);
    obj.XGTimer = setInterval(function(){
        //opacity:0.5
        //filter:alpha(opacity = 0-100)
        //width height left right bottom right top line-height
        //style只能获得内联上的内容
        //var currentValue = obj.style[attribute];这个方式无法获取不在内联标签中的属性.最好传入数字
        //用来获取想要得到的对象的属性值
        var currentValue = getStyle(obj,attribute) || 0;
        //来获取物体运动的速度,逐渐变慢
        var speed        = (target-currentValue)/8;
        speed = speed>0? Math.ceil(speed):Math.floor(speed);
        //判断要求的是否是透明度,因为透明度是0-1,所以比较特殊
        if(attribute=='opacity'||attribute=='filter'){
            if(target<=1&& target>0){
                target*=100;
            }
            speed        = (target-currentValue)/8;
            obj.style[attribute] = (currentValue+speed)/100;
            obj.style[attribute] = "alpha(opacity = "+(currentValue+speed)+")"
            if(currentValue == target){
                clearInterval(obj.XGTimer);
            }
        }else {
            //当速度为负时,表明属性值是减小的.
            if (speed < 0) {
                if (currentValue <= target) {
                    clearInterval(obj.XGTimer);
                } else {
                    obj.style[attribute] = currentValue + speed + 'px';
                }
            //当速度为正时,属性值是增加的,当属性值大于等于目标值时,停止运动
            } else if (speed > 0) {
                if (currentValue >= target) {
                    clearInterval(obj.XGTimer);
                } else {
                    obj.style[attribute] = currentValue + speed + 'px';

                }

            }
        }
    },30)
}
/**
 * 这个方法用来获取什么对象的什么属性
 * @param obj  传入的对象
 * @param attr 要获取的属性
 * @returns {Number}
 */
function getStyle(obj,attr){
    //window.getComputedStyle(obj,attr,null)//这个属性兼容性不好,获取哪个对象,获取哪个方法,
    //obj.currentStyle(attr)//这个是IE的方法
    var a = "";
    //如果要获取的参数时透明度

    if(obj.currentStyle){
        a=obj.currentStyle(attr);
    }else{
        a=window.getComputedStyle(obj,null)[attr];
    }
    if(attr == 'opacity' || attr == 'filter'){
        a = a*100;
    }
    return parseInt(a);
}
