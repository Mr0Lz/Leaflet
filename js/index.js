var Leaflet;
!(function(){
    function leaflet(){
        addEvent(this,document,"touchmove",function(currentSelect,that,e){
            e.preventDefault();
            return;
        });
    }
    


    leaflet.prototype.init=_init;


    Leaflet=new leaflet();
//初始化函数
    function _init(opt){
        this.doc=getDoc(opt.doc);
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
        }else if(ele.nodeType===1){
            return ele;
        }
        throw "没获取到元素";
    }
//添加事件
    function addEvent(that,ele,type,fn){
            ele.addEventListener(type,function(e){
                var e=e||window.event;
                var currentSelect=e.srcElement||e.target;
                fn(currentSelect,that,e);
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
        var start=end=null;
        addEvent(that,that.doc,"touchstart",function(currentSelect,that,e){
            if(e.touches.length===1){
                start=e.touches[0].clientY;
            }
        });
        addEvent(that,that.doc,"touchmove",function(currentSelect,that,e){
            if(e.touches.length===1){
                end=e.touches[0].clientY;
            }
        });
        addEvent(that,that.doc,"touchsend",function(currentSelect,that,e){
            // 判断手势
            start=end=null;
        });
    }
})(window,document)