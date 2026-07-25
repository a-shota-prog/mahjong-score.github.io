let total=0;
let correct=0;

let answer=0;

function random(min,max){

    return Math.floor(Math.random()*(max-min+1))+min;

}

function nextQuestion(){

    document.getElementById("nextBtn").style.display="none";

    const fuList=Object.keys(scoreTable);

    const fu=fuList[random(0,fuList.length-1)];

    const hanList=Object.keys(scoreTable[fu]);

    const han=hanList[random(0,hanList.length-1)];

    const player=Math.random()<0.5?"子":"親";

    const type=Math.random()<0.5?"ロン":"ツモ";

    document.getElementById("player").innerHTML=player;

    document.getElementById("winType").innerHTML=type;

    document.getElementById("question").innerHTML=`${fu}符 ${han}翻`;

    if(type=="ロン"){

        answer=scoreTable[fu][han].ron;

    }else{

        answer=scoreTable[fu][han].tsumo[1];
    }

    let choices=[answer];

    while(choices.length<4){

        let values=[1000,1300,1600,2000,2600,3200,3900,4500,5200,6400,7700,8000];

        let c=values[random(0,values.length-1)];

        if(!choices.includes(c)){

            choices.push(c);

        }

    }

    choices.sort(()=>Math.random()-0.5);

    const area=document.getElementById("choices");

    area.innerHTML="";

    choices.forEach(c=>{

        const btn=document.createElement("button");

        btn.className="choice";

        btn.innerHTML=c+"点";

        btn.onclick=()=>judge(btn,c);

        area.appendChild(btn);

    });

}

function judge(btn,value){

    total++;

    if(value==answer){

        btn.classList.add("correct");

        correct++;

    }else{

        btn.classList.add("wrong");

    }

    document.querySelectorAll(".choice").forEach(b=>{

        b.disabled=true;

        if(parseInt(b.innerHTML)==answer){

            b.classList.add("correct");

        }

    });

    document.getElementById("accuracy").innerHTML=
        Math.round(correct/total*100)+"%";

    document.getElementById("nextBtn").style.display="block";

}

nextQuestion();
