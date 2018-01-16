# Leaflet
一款移动端H5内容展示页插件,用于企业宣传页




使用:先用npm 安装gulp,然后运行 gulp ,在html中引入/build/leaflet.min.js


      <script type="text/javascript" src="build/leaflet.min.js"></script>
      

然后配置`Leaflet`对象
    
    
    
    
            Leaflet.init({doc:".container",//内容容器
            //四个回调函数的参数
            //{prev:[prevEle,prev],上一页的元素,以及下标
            //current:[current,currentIndex],//当前页的元素以及下标
            //next:[nextEle,next]}//下一页的元素以及下标
            //可以用下标判断当前是哪一页来执行换页显示时的动画
            onSwipeUpStart:function(ele){//上一页动画执行之前
            },
            onSwipeDownStart:function(ele){//下一页动画执行之前
            },
            onSwipeUpEnd:function(ele){//上一页动画执行之后 
            },
            onSwipeDownEnd:function(ele){//上一页动画执行之后
            },
            //支持animate.css  等css3第三方的动画库
            //必需同时设置,默认fadeInUp,fadeInDown效果
            InUp:"up",//下一页css3动画样式
            InDown:"down",//上一页css3动画样式
            music:{//背景音乐,默认不设置
            src:"public/bgm.mp3",
            icon:"public/bgmBtn-icon.svg",
            autoPlay:false,
            },
            progress:true//进度条
            });
