window.onload = function(){
    const nav = document.getElementsByClassName("nav");
    const box = document.getElementsByClassName("box");

    function changePage(e, i){//导航切页
        e.onclick = function(){
            
            for(let j=0;j<nav.length;j++){
                box[j].style.display = 'none';
            }
            mypage.style.display = 'none';
            box[i].style.display = 'block';

        }
    }

    for(let i=0;i<nav.length;i++){//执行导航切页
        changePage(nav[i],i);
    }


    const avatarbox = document.getElementById("avatarbox");
    const mypage = document.getElementById("mypage");
    avatarbox.onclick = function(){//点击头像显示主页
        for(let j=0;j<nav.length;j++){
            box[j].style.display = 'none';
        }
        mypage.style.display = 'block';
    }








}