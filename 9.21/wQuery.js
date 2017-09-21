(function(){
    function $(selector){
        return new $.fn.init(selector);
        // this.selecter = selecter;
    }
    $.fn = {
        init : function(selector) {
            var elems = document.querySelectorAll(selector);
            this.length = elems.length;    
            // console.log(elems);        
            for(var i = 0; i < this.length; i++) {
                this[i] = elems[i];
            }
        },
        html : function(html) {
            for (var i = 0; i < this.length; i++) {
                this[i].innerHTML = html;
            }
            return this;
        },
        css : function (k, v){
            if(typeof(k) == 'string' && arguments.length == 1) {
                return window.getComputedStyle(this[0])[k];
            }else if(typeof(k) == 'object' && arguments.length == 1){
                // console.log('obj')
                for(var prop in k) {
                    // console.log(prop);
                    for(var i = 0; i < this.length; i++) {
                        this[i].style[prop] = k[prop];
                        // console.log(this[i]);
                    }
                }
                return this;
            }else if(typeof(k) == 'string' && typeof(v) == 'string'){
                for(var j = 0; j < this.length; j++) {
                    this[j].style[k] = v;
                }
                return this;
            }
        },
        click : function(fn){
            for(var i = 0; i < this.length; i++) {
                this[i].addEventListener('click',function(){
                    fn.call(this);
                })
            }
            return this;
        },
        dblclick : function(fn){
            for(var i = 0; i < this.length; i++) {
                this[i].addEventListener('dblclick',function(){
                    fn.call(this);
                })
            }
            return this;
        },//添加兄弟节点pre 前 aft 后
        // addsibling: function(dom, position) {
        //     if(position == 'pre') {
        //         this.parentNode.prependChild('dom');
        //     }
        // },
        draggable : function(){//拖拽事件
            var self = this;
            for(var i = 0; i < this.length; i++) {
                (function(i){
                    var ofX = 0;
                    var ofY = 0;
                    var me = self[i];
                    me.addEventListener('mousedown', function(){
                        event = event || window.event;
                        if(event.offsetX) {
                            ofX = event.offsetX;
                            ofY = event.offsetY;
                        }else{
                            ofX = event.clientX - this.offsetLeft;
                            ofY = event.clientY - this.offsetTop; 
                        }
                        document.addEventListener('mousemove',move);
                        function move (event) {
                            me.style.left = event.clientX - ofX + 'px';
                            me.style.top = event.clientY - ofY + 'px';
                        }
                        document.addEventListener('mouseup',function(){
                            document.removeEventListener('mousemove',move);
                        })
                    })
                }(i));
            }
            return this;
        },
    }




    $.fn.init.prototype = $.fn;
    $.prototype.constructor = $;
    window.$ = $;
}())