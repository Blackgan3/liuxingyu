/**
 * Created by Administrator on 2016/8/16.
 */
var number = 150;
var timer  = null;
function init(){
    can = document.getElementById("canvasBox");
    con= can.getContext('2d');
    var starImg = new Image();
    starImg.src ='images/star.png';
    var starArray = [];
    //创建number个星星
    starImg.onload=function(){
        for(var i =0;i<number;i++){
            var star = new Star(Math.floor(Math.random()*1300+50),Math.floor(Math.random()*150),starImg);
            starArray.push(star);
        }


    };
    var me =  meteors();

    var text1 = new drawText();
    var newMoon = new drawMoon();
    //定时器来共同的画背景和星星
    setInterval(function(){
        drawBackground();

        me();
        for(var j =0;j<starArray.length;j++){
            starArray[j].drawStar();
        }
        text1.draw();
        newMoon.drawOneMoon();
    },100);

}

//这是时用来画背景的函数
function drawBackground() {
    var image = new Image();
    image.src = 'images/back_img4.jpg';
    con.backgroundColor='rgb(0,0,0,0.3)';
    con.clearRect(0,0,1360,150);
    con.drawImage(image,0,0,1360,150);


}

/**
 * 这个函数用来画星星
 * @param x 星星在天空中的位置
 * @param y 星星在天空中的位置
 * @param image
 * @constructor
 */
function Star(x,y,image){
    this.x = x;
    this.y = y;
    this.image = image;
    var that   = this;
    var n=1;
    this.drawStar = function(){
        n++;
        if(n>=7){
            n=1;
        }
        that.x+=5;
        if(that.x>=1360){
            that.x=10;
        }
        con.drawImage(that.image,n*7,0,7,7,that.x,that.y,8,8);
    };
}

function drawText(){
    this.textNum   = 0;
    var that = this;
    this.drawSpeed = setInterval(function (){
        that.textNum++;
    },400);
    this.draw = function (){
        con.save();
        con.beginPath();
        //设置一个字体渐变色
        var g1 = con.createLinearGradient(100,60,120,160);
        g1.addColorStop(0.1,'red');
        g1.addColorStop(0.5,'yellow');
        g1.addColorStop( 1, 'green');
        con.strokeStyle=g1;
        con.font = "italic 40px sans-serif";
        if(this.textNum>=7){
            clearInterval(this.drawSpeed);
        }
//绘制欢迎来到我的博客欢迎语
        var txt = ['Try your best'];
        con.strokeText(txt,120,60);
        con.beginPath();
        var txt2= '-Black Gan';
        con.font='20px';
        con.strokeText(txt2,400,120);
        con.restore();
        con.save();
        //绘制名言文字
        con.beginPath();
        var txtSaying1 = '一起来看流星雨';
        var txtSaying2 = '';
        con.strokeStyle='white';
        con.font='italic 20px 微软雅黑';
        con.strokeText(txtSaying1,1000,50);
        con.strokeText(txtSaying2,1000,90);
        con.restore();


    }
}
//创建月亮类
function drawMoon()
{
    this.x = 700;
    this.y = 20;
    this.run = function (){

    };
    this.number = 40;
    this.drawOneMoon = function (){
        this.number+=4;
        if(this.number==140){
            this.number=140;
        }
        con.save();
        con.beginPath();
        con.rotate(Math.PI/this.number);
        // con.translate(100,0);
        con.strokeStyle='black';
        con.fillStyle='yellow';
        con.bezierCurveTo(this.x,this.y,820,60,670,130);
        con.bezierCurveTo(670,130,780,60,this.x,this.y);
        con.fill();
        con.restore();

    }
}
//创建流星雨
function meteors() {
    var boomLength, ctx, descending, ele, height, love_bomb_tomb, setStar, star_num, stars, width;

    stars = [];

    star_num = 20;

    love_bomb_tomb = [];

    width = 1360;

    height = 650;

    ele = document.getElementById("canvasBox");

    ctx = ele.getContext('2d');

    ele.setAttribute("height", height);

    ele.setAttribute("width", width);

    setStar = function(index) {
        return stars[index] = [Math.random() * width, Math.random() / 10 * height, (Math.random() * 20 + 80) / 100, (Math.random() + 1) / 2 * 6, Math.sin(Math.random() * Math.PI / 8)];
    };

    descending = function(former, latter) {
        return latter[0] - former[0];
    };

    boomLength = 0;

    var drawMeteors=function() {
        var bomb, degree, factor, i, j, k, l, m, new_x, new_y, p, pi_in_degree, random_heart_style, random_y_diff, ratio, ref, ref1, ref2, rest_amount, speed, theta;
        var image = new Image();
        image.src = 'images/background1.jpg';
        ctx.backgroundColor='rgb(0,0,0,0.3)';
        ctx.clearRect(0,0,1360,650);
        ctx.drawImage(image,0,0,1360,650);
        for (i = j = 0, ref = star_num; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
            if (stars[i] == null) {
                setStar(i);
            }
            if (!(stars[i][0] < width && stars[i][1] < height)) {
                setStar(i);
            }
            ratio = stars[i][4];
            speed = stars[i][3];
            new_x = stars[i][0] += speed * ratio;
            new_y = stars[i][1] += speed;
            random_y_diff = stars[i][2];
            for (p = k = 0; k <= 100; p = ++k) {
                ctx.beginPath();
                ctx.strokeStyle = "rgba(255, 255, 255," + (1 - p / 100) + ")";
                ctx.moveTo(new_x - random_y_diff * p * ratio, new_y - random_y_diff * p);
                ctx.lineTo(new_x - random_y_diff * (p - 1) * ratio, new_y - random_y_diff * (p - 1));
                ctx.stroke();
            }
        }
        stars.sort(descending);
        for (i = l = 0, ref1 = star_num - 1; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
            if (Math.abs(stars[i][0] - stars[i + 1][0]) < 3) {
                if (Math.abs(stars[i][1] - stars[i + 1][1]) < 3) {
                    love_bomb_tomb[boomLength++] = [50, stars[i][0], stars[i][1]];
                    setStar(i);
                    setStar(i + 1);
                }
            }
        }
        love_bomb_tomb.sort(descending);
        bomb = love_bomb_tomb[0];
        if (bomb && bomb[0] > 0) {
            rest_amount = bomb[0];
            pi_in_degree = 180;
            for (degree = m = 0, ref2 = 2 * pi_in_degree; 0 <= ref2 ? m < ref2 : m > ref2; degree = 0 <= ref2 ? ++m : --m) {
                random_heart_style = 255 * Math.random() << 0;
                ctx.beginPath();
                ctx.strokeStyle = "rgba(255, " + random_heart_style + ", " + random_heart_style + ", " + (rest_amount / 50) + ")";
                theta = degree / pi_in_degree * Math.PI;
                factor = 1 - Math.abs(degree - pi_in_degree) / pi_in_degree;
                ctx.moveTo(bomb[1], bomb[2] + 30 * (1 - rest_amount / 50));
                ctx.lineTo(bomb[1] - (2 * Math.sin(theta) - Math.sin(2 * theta)) * factor * (50 - rest_amount), bomb[2] - (2 * Math.cos(theta) - Math.cos(2 * theta)) * factor * (50 - rest_amount));
                ctx.stroke();
            }
            return bomb[0] --;
        }
    };
    return drawMeteors;

}
