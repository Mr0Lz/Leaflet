var Leaflet;
!(function(){
    function leaflet(){
        addEvent(this,document,"touchstart",function(current,that,e){
            preventDefault(e)
        });
        addEvent(this,document,"touchmove",function(current,that,e){
            preventDefault(e)
        });
        this.styleSheet=createStyle();
        this.rlueL=0;
        inserCss(this,"html,body","width: 100%;height: 100%;",0);
        inserCss(this,".page","opacity: 0;-webkit-transition:all 0.3s;transition:all 0.5s;",1);
        inserCss(this,".active","top:0;opacity:1;z-index:9999;",2);
        inserCss(this,".prev","top:-100%;opacity:1;z-index:999;",3);
        inserCss(this,".next","top:100%;opacity:1;z-index:999;",4);
    }
    function l(){
        var array=Array.prototype.slice.call(arguments);
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            console.log(element,index+"次");
        }
    }
    leaflet.prototype.init=_init;

    Leaflet=new leaflet();
//初始化函数
    function _init(opt){
        if(opt.InUp===undefined&&opt.InDown===undefined){
            defualtAnmation(this);   
        }
        this.InUp=opt.InUp||"InUp";
        this.InDown=opt.InDown||"InDown";
        this.doc=getDoc(opt.doc);
        addStyle([this.doc],"position:relative;width:100%;height:100%;overflow:hidden;");
        this.pages=getPage(this.doc.childNodes);
        this.pageL=this.pages.length-1;
        addStyle(this.pages,"position:absolute;width:100%;height:100%;");
        addClass(this.pages[0],"active");
        addArrClass(this.pages,"page");
        this.onSwipeUp=opt.onSwipeUp||function(){};
        this.onSwipeDown=opt.onSwipeDown||function(){};
        swipe(this);
        return this;
    }
//获取doc
    function getDoc(ele){
		if(typeof ele==="string"){
            var e=document.querySelector(ele);
            if(e.nodeType===1){
                return e;           
            }
            throw "没获取到元素";
        }else if(ele.nodeType===1){return ele;}
        throw "没获取到元素";
    }
//获取页面
    function getPage(array){
        var arr=[];
        for (var i = 0; i < array.length; i++) {
            if(array[i].nodeType===1){arr.push(array[i]);}
        }
        return arr;
    }
//添加事件
    function addEvent(that,ele,type,fn){
            ele.addEventListener(type,function(e){
                var e=e||window.event;
                var current=e.srcElement||e.target;
                fn(current,that,e);
            },false);
    }
//删除事件
	function removeEvent(eleArr,start,type,fn){
		for (var i=start; i<eleArr.length;i++) {
				eleArr[i].removeEventListener(type,fn);
		}
    }
//滑动手势
    function swipe(that){
        ranking(that);
        var start=end=null;
        addEvent(that,that.doc,"touchstart",function(current,that,e){
            if(e.touches.length===1){start=e.touches[0].clientY;}else{start=null;}
        });
        addEvent(that,that.doc,"touchmove",function(current,that,e){
            if(e.touches.length===1){end=e.touches[0].clientY;}else{end=null;}
        });
        addEvent(that,that.doc,"touchend",function(current,that,e){
            // 判断手势
            if(end===null||start===null){return ;}
            if(Math.abs(end-start)>30&&end-start>0){
                //上一页
                var docs=ranking(that);
                removeClass(docs.current[0],"active");
                removeArrClass(that.pages,that.InUp);
                removeArrClass(that.pages,that.InDown);  
                addClass(docs.prev[0],"active");
                addClass(docs.prev[0],that.InDown);
                that.onSwipeUp(ranking(that));
            }else if(Math.abs(end-start)>30&&end-start<0){
                //下一页
                var docs=ranking(that);
                removeClass(docs.current[0],"active");
                removeArrClass(that.pages,that.InUp);
                removeArrClass(that.pages,that.InDown);                 
                addClass(docs.next[0],"active");
                addClass(docs.next[0],that.InUp);
                that.onSwipeDown(ranking(that));
            }
            start=end=null;
        });
    }
    //添加样式
    function addStyle(eleArr,str){
        for (var i=0; i<eleArr.length;i++) {eleArr[i].style.cssText+=str;}
    }
    //添加规则
    function inserCss(that,sele,rule,i){
        that.styleSheet.insertRule(sele+"{"+rule+"}",i);
        this.rlueL=i;
    }
    function createStyle(){
        var style=document.createElement("style");
        document.getElementsByTagName('head')[0].appendChild(style);
        return style.sheet;
    }
    //阻止默认事件
    function  preventDefault(e){
        e.preventDefault();
        return;
    }
    //addClass removeClass hasClass
    function addClass(o,c) {
        var o_class=o.className,blank=(o_class != "")? " ":"";
        added=o_class+blank+c;
        o.className=added;
    }
    function addArrClass(arr,c){
        for (var i=0; i<arr.length;i++) {addClass(arr[i],c);}
    }
    function removeClass(o,c) {
        var o_class=" "+o.className+" ";
        o_class=o_class.replace(/(\s+)/gi," ");
        removed = o_class.replace(' '+c+' ', ' ');
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');
        o.className=removed;
    }
    function removeArrClass(arr,c){
        for (var i=0; i<arr.length;i++) {removeClass(arr[i],c);}
    }
    //排位
    function ranking(that){
        removeArrClass(that.pages,"next");
        removeArrClass(that.pages,"prev");
        var current=getDoc(".active"),
        currentIndex=that.pages.indexOf(current),
        next=prev=nextEle=prevEle=null;
        if(currentIndex+1>that.pageL){
            next=0;
        }else{
            next=currentIndex+1;
        }
        if(currentIndex-1<0){
            prev=that.pageL;
        }else{
            prev=currentIndex-1
        }
        nextEle=that.pages[next];
        prevEle=that.pages[prev];
        addClass(nextEle,"next");
        addClass(prevEle,"prev");
        return {prev:[prevEle,prev],current:[current,currentIndex],next:[nextEle,next]};
    }
    // 默认动画效果
    function defualtAnmation(that){
        inserCss(that,".InUp","-webkit-animation: fadeInUp 0.8s;animation: fadeInUp 0.8s;",that.rlueL+1);
        inserCss(that,".InDown","-webkit-animation: fadeInDown 0.8s;animation: fadeInDown 0.8s;",that.rlueL+1);
        inserCss(that,"@-webkit-keyframes fadeInUp","from {opacity: 0;-webkit-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0);}to {opacity: 1;-webkit-transform: none;transform: none;}",that.rlueL+1);
        inserCss(that,"@-webkit-keyframes fadeInDown","from {opacity: 0;-webkit-transform: translate3d(0, -100%, 0);transform: translate3d(0, -100%, 0);}to {opacity: 1;-webkit-transform: none;transform: none;}",that.rlueL+1);
    }        
})(window,document)