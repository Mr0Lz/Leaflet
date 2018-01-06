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
        addEvent(this,this.doc,"touchmove",function(currentSelect,that,e){
        });
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
    function swipe(){
        
    }
})(window,document)