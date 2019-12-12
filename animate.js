//温馨提示滚动
var p = document.getElementById("p");
window.onload = function pmoving(){
    console.log(1);
    setInterval(function(){
        var now = parseInt(getStyle(p, 'right'));
        console.log(now);
        if(now>=350){
            now = -800;
        }
        p.style.right= now + 1 +"px";
    },10);
}
var box = document.getElementById("box");
var oNavlist = document.getElementById("nav").children;
var slider = document.getElementById("slider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var i = 1;
var isMoving = false;//图片未动
//轮播下一张
function next(){
	if(isMoving==false){
		isMoving = true;
        i++;
        navChanged();
        animate(slider,{left:-1200*i},function(){
	        if(i > 5){
		        slider.style.left = "-1200px";
		        i = 1;
	        }
	        isMoving = false;
        });
	}
}
function prev(){
	if(isMoving){
		return;//图片在动，不执行函数
	}
	isMoving = true;
    i--;
    navChanged();
    animate(slider,{left:-1200*i},function(){
	    if(i === 0){
		    slider.style.left = -1200*5+"px";
		    i = 5;
	    }
	    isMoving = false;
    });
}
var timer = setInterval(next,3000);
//鼠标划入定时器
box.onmouseover = function(){
    animate(left,{opacity:50});
    animate(right,{opacity:50});
    clearInterval(timer);
}
//鼠标划出定时器
box.onmouseout = function(){
    animate(left,{opacity:0});
    animate(right,{opacity:0});
    timer = setInterval(next,3000);
}
//点击箭头
right.onclick = next;//后
left.onclick = prev;//前
//五个按钮点击事件
for(var j = 0;j<oNavlist.length;j++){
    oNavlist[j].idx = j;
    oNavlist[j].onclick = function(){
        i = this.idx+1;
        navChanged();
        animate(slider,{left:-1200*i})
    }
}
//五个按钮背景颜色事件
function navChanged(){
    for(var j = 0;j<oNavlist.length;j++){
        oNavlist[j].className = "";
    }
    if(i > 5){
        oNavlist[0].className = "active";
    }else if(i === 0){
    	oNavlist[4].className = "active";
    }
    else{
        oNavlist[i-1].className = "active";
    }

}
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}