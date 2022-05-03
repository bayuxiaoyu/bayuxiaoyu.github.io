window.onload  = function(){

    const start = document.getElementById("start");
    const desbox = document.getElementById("desbox");
    const box = document.getElementsByClassName("box");
    const n = 10
    let Game = {
        
        data: [],
        box: [],
        score:0,
        init:function(){
            desbox.style.display = "none";

            this.score = 0;
            this.createDOM();
            this.data = [];
            this.box = [];
            for(let i=0;i<n;i++){
                let temp=[];
                for(let j=0; j<n; j++){
                    temp.push(0);
                }
                this.data.push(temp);
            }

            this.create_box();
            this.display();
            this.disappear();
            //console.log(this.box);
        },


        createDOM:function(){//生成地图
            let str="";
            for(let i=0; i<n; i++){
                str = str + "<div class=\"row\">";
                for(let j=0; j<n;j++){
                    str = str + "<div></div>";
                }
                str = str +"</div>";
            }
            
            $("#container").empty().append(str);
            
        },

        create_box:function(){//生成10个盒子
            

            for(let i =0; i<10;i++){
                let x = parseInt(Math.random()*n),
                    y = parseInt(Math.random()*n);

                while(this.data[x][y]!=0){
                x = parseInt(Math.random()*n),
                y = parseInt(Math.random()*n);
                }

                this.data[x][y]=1;
                this.box.push({x,y});

                for(let k=0; k<this.box.length; k++){
                    for(let j=0; j<this.box.length; j++){
                        $("#container .row").eq(x).find("div")[y].innerText = `${i+1}`;
                    }
                }

            }
            
        },

        display:function(){
            for(let i=0; i<this.data.length; i++){
                for(let j=0; j<this.data.length; j++){
                   
                    if(this.data[i][j]==0){
                        
                        $("#container .row").eq(i).find("div")[j].className = "blank";
                    }else if(this.data[i][j]==1){
                        
                        $("#container .row").eq(i).find("div")[j].className = "box";
                        
                    }
                   
                }
            }
        },

        disappear:function(){//点击1盒子消失
            let _this = this;
            for(let j=0;j<10;j++){
                box[j].onclick = function(){
                    if(box[j].innerText=="1"){
                        for(let i=0;i<10;i++){   
                            box[i].style.backgroundColor ="rgb(0,0,0,0)";
                            box[i].style.boxShadow = "none";
                            box[i].innerText = "";

                            if(i==9){
                                _this.judge();
                            }
                        }
                    }
                   
                }
            }
  
        },

        judge:function(){
            let _this = this;
            let counter = 1;
            for(let i=0; i<this.data.length; i++){
                for(let j=0; j<this.data.length; j++){//i j 遍历所有格子
                    
                    $("#container .row").eq(i).find("div")[j].onclick = function(){
                        
                        if($("#container .row").eq(i).find("div")[j].className == "blank" || i!=_this.box[counter].x || j!=_this.box[counter].y){
                            _this.score=counter-1;
                            _this.GameOver();
                            
                        }
                        counter++;
                        if(counter==10){
                            alert("You Win!!!");
                            _this.init();
                        }
                        
                    }
                    
                   
                }
            }
        },

        GameOver:function(){
            alert(`GameOver!!!  score:`+`${this.score}`);
            this.init();
        },


    }

    start.onclick = function(){
        Game.init();
    }




}