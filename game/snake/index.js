window.onload = function(){

    let begin = document.getElementById("begin");
    let scorebox = document.getElementById("scorebox");

    let upbtn = document.getElementById("upbtn");
    let downbtn =document.getElementById("downbtn");
    let leftbtn = document.getElementById("leftbtn");
    let rightbtn = document.getElementById("rightbtn");

    let Game = {
        //初始化；
        data: [], //记录地图方格状态，二维数组；
        snake:[],
        food:{},
        direction: "up",
        timer: undefined,
        score:0,

        createDOM:function(){//生成地图
            let str="";
            for(let i=0; i<21; i++){
                str = str + "<div class=\"row\">";
                for(let j=0; j<21;j++){
                    str = str + "<div></div>";
                }
                str = str +"</div>";
            }
            
            $("#container").empty().append(str);
            
        },

        init:function(){

            this.createDOM();
            this.data=[];
            for(let i=0;i<21;i++){
                let temp=[];
                for(let j=0; j<21; j++){
                    temp.push(0);
                }
                this.data.push(temp);
            }

            this.snake=[//初始化snake的位置；
                {x:9, y:10},
                {x:10, y:10},
                {x:11, y:10}
            ]

            for(let i=0;i<this.snake.length;i++){
                this.data[this.snake[i].x][this.snake[i].y]=2;
            }

            this.create_food();
            this.direction="up";
            if(this.timer){
                clearInterval(this.timer);
            }
            this.score=0;
            this.key_action();
            this.btn_action();
            this.display();

            //this.start();
        },


        create_food:function(){
            let x = parseInt(Math.random()*21),
                y = parseInt(Math.random()*21);

            while(this.data[x][y]!=0){
                x = parseInt(Math.random()*21),
                y = parseInt(Math.random()*21);
            }

            this.data[x][y]=1;
            this.food.x = x;
            this.food.y = y;

        },

        key_action:function(){
            let _this = this;
            window.onkeydown = function(event){
                switch(event.code){
                    case "ArrowUp":
                        if(_this.direction!="down"){
                            _this.direction = "up";
                        }
                    break;

                    case "ArrowLeft":
                        if(_this.direction!="right"){
                            _this.direction = "left";
                        }
                    break;

                    case "ArrowDown":
                        if(_this.direction!="up"){
                            _this.direction = "down";
                        }
                    break;

                    case "ArrowRight":
                        if(_this.direction!="left"){
                            _this.direction = "right";
                        }
                    break;


                }
            }
        },

        btn_action:function(){
            let _this = this;
            upbtn.onclick = function(){
                if(_this.direction!="down"){
                    _this.direction = "up";
                }
            }

            leftbtn.onclick = function(){
                if(_this.direction!="right"){
                    _this.direction = "left";
                }

            }

            rightbtn.onclick = function(){
                if(_this.direction!="left"){
                    _this.direction = "right";
                }
            }

            downbtn.onclick = function(){
                if(_this.direction!="up"){
                    _this.direction = "down";
                }
            }
        },

        display:function(){
            
            for(let i=0; i<this.data.length; i++){
                for(let j=0; j<this.data.length; j++){
                   
                    if(this.data[i][j]==0){
                        ;
                        $("#container .row").eq(i).find("div")[j].className = "blank";
                    }else if(this.data[i][j]==1){
                        
                        $("#container .row").eq(i).find("div")[j].className = "food";
                    }else if(this.data[i][j]==2){
                       
                        $("#container .row").eq(i).find("div")[j].className = "snake";
                    }
                   
                }
            }
        },

        snake_move:function(){
            let last = this.snake[this.snake.length-1];
            let obj = {};
            switch(this.direction){
                case "up":
                    if(((this.snake[0].x-1)>=0)&& (this.data[this.snake[0].x-1][this.snake[0].y]!=2)){
                        obj = {x:this.snake[0].x-1, y:this.snake[0].y};
                    }else{
                        alert("GameOver!");
                        scorebox.innerHTML = 'score:0';
                        this.init();
                    }
                    
                break;

                case "down":
                    if(((this.snake[0].x+1)<21) && (this.data[this.snake[0].x+1][this.snake[0].y]!=2)){
                        obj = {x:this.snake[0].x+1, y:this.snake[0].y};
                    }else{
                        alert("GameOver!");
                        scorebox.innerHTML = 'score:0';
                        this.init();
                    }
                break;

                case "left":
                    if(((this.snake[0].y-1)>=0) && (this.data[this.snake[0].x][this.snake[0].y-1]!=2)){
                        obj = {x:this.snake[0].x, y:this.snake[0].y-1};
                    }else{
                        alert("GameOver!");
                        scorebox.innerHTML = 'score:0';
                        this.init();
                    }
                   
                break;

                case "right":
                    if(((this.snake[0].y+1)<21)&& (this.data[this.snake[0].x][this.snake[0].y+1]!=2)){
                        obj = {x:this.snake[0].x, y:this.snake[0].y+1};
                    }else{
                        alert("GameOver!");
                        scorebox.innerHTML = 'score:0';
                        this.init();
                    }
                break;
            }

            this.add_snake(obj);
            this.data[last.x][last.y]=0;
            for(let i=0;i<this.snake.length;i++){
                this.data[this.snake[i].x][this.snake[i].y]=2;
            }
        },

        add_snake:function(obj){
            if((obj.x>=0&&obj.x<21)&&(obj.y>=0&&obj.y<21)){
                if(this.data[obj.x][obj.y]==0){
                    this.snake.unshift(obj);
                    this.snake.pop();
                }else if(this.data[obj.x][obj.y]==1){
                    this.snake.unshift(obj);
                    this.score = this.score +1;
                    this.create_food();
                    scorebox.innerHTML = 'score:'+ this.score;
                    
                }
            }
        },

        start:function(){
            let _this = this;
            _this.timer = setInterval(function(){
                _this.snake_move();
                _this.display();
            },200);
        }


    }

    Game.init();
    begin.onclick = function(){
        if(Game.timer){
            clearInterval(Game.timer);
        }

        Game.start();
    }

    
}