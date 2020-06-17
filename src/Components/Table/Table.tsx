import React, { Fragment} from 'react';


interface tableRowProps {
    RowProps: string;
    RowClass: string;
}

interface ColProps {
    index: number;
    name: string;
    date: string;
    cnt: number;
    year: number;
    month: Array<any>;
}

interface tableColProps {
    ColProps: ColProps;
    ColClass: number;
}

interface CalendarProps {
    CalClass:string;
    CalYear: number;
    CalMonth: number;
}

const Row = ({ RowClass, RowProps }: tableRowProps) => {
    return (
        <th className={RowClass} onClick={function () {
            console.log("기모링~!");
        }}>{RowProps}</th>
    );
}

const Col = ({ ColClass, ColProps }: tableColProps) => {
    const { index, name, date, cnt } = ColProps;
    return (
        <tr className="airs-table-col">
            <td key={(index).toString()} className={"airs-name-" + index.toString()}>{name}</td>
            <td key={(index + 1).toString()} className={"airs-date-" + index.toString()}>{date}</td>
            <td key={(index + 2).toString()} className={"airs-idx-" + index.toString()}>{cnt}</td>
        </tr>
    );
}


function getTotalDate(year:number, month:number)
{
	if(month===4 || month===6 || month===9 || month===11)
		return 30;
	else if(month===2) //2월일때
	{
		if(year%4 === 0) // 2월이면서 윤년일 때
			return 29;
		else			// 2월이면서 윤년이 아닐 때
			return 28
	}
	else
		return 31;
}

interface TableProps {
    res: { data: string };
    curMonth: number;
    curYear: number;
    monthPlus: () => void;
    monthMinus: () => void;
}

function convertDate(yymmdd:string|any) {
    var d = yymmdd; // YYMMDD
    var yy = d.substr(0, 2);
    var mm = d.substr(2, 2);
    var dd = d.substr(4, 2); 
    var yyyy = (+yy < 90) ? '20' + yy : '19' + yy;
    return yyyy + '-' + mm + '-' + dd;
}


const Table = ({ res, curMonth, curYear ,monthMinus ,monthPlus}: TableProps) => {
    const string = "190000\t190919\t\t   200118_changyoung\n190405\t190920\t\t   200121_jingu_2\n190408\t190924\t\t   200121_jingu,min\n190409\t190925\t\t   200203_jongil,jingyu\n190416\t190927\t\t   200204_jonghyun.jingyu\n190422\t191002\t\t   200205_min,jingyu\n190423\t191004\t\t   200206_jongil,jingyu\n190624\t191011_진규,영욱   200207_min,changyoung\n190629\t191012_진구\t   200208_jonghyun\n190703\t191014_두희\t   200210_min\n190705\t191016_재연,진구   200211_jongil\n190708\t191017_영욱\t   200212_jonghyun\n190710\t191018_진규\t   200213_min\n190711\t191019_재연\t   200214_jongil\n190715\t191111_Jingu\t   200217_jonghyun\n190716\t191112_Jingu\t   200218_jongil\n190717\t191113_Jingyu\t   200219_jonghyun\n190718\t191115_Jingyu\t   200220_min\n190719\t191210_Jingyu\t   200221_jongil\n190722\t191211_Jingyu\t   200224_min,seungmin\n190723\t191212_Jingyu\t   200225_jongil\n190724\t191213_Jingyu\t   200511_min,jaeho,changyoung,jingu\n190725\t191214_Jingyu\t   200512_jongil\n190726\t191219_Jingu\t   200513_jongil,jungmin\n190729\t191220_jingu\t   200514_min\n190730\t191221_Jingyu\t   200515_min,seungwoo,sangoh\n190731\t191223_jingu\t   200516_jungmin\n190801\t191224_jingyu\t   200518_jungmin\n190802\t191226_jingyu\t   200519_jongil\n190808\t191227_jingyu\t   200520_sangoh,min\n190809\t191228_jingyu\t   200521_sangoh,min\n190814\t191230_jingu\t   200522_seungwoo,sangoh\n190819\t200104_jingu\t   200523_jungmin\n190821\t200107_jingyu\t   200525_jungmin\n190822\t200108_jingyu\t   200526_jongil\n190823\t200109_jingyu\t   200527_sangoh\n190826\t200110_jingyu\t   200528_sangoh\n190827\t200111_jingyu\t   200529_seungwoo,changyoung,jingu\n190903\t200113_changyoung  200530_jungmin\n190905\t200114-changyoung  200601_jungmin\n190910\t200115-changyoung  200602_jongil\n190917\t200116-changyoung";
    let regexr1 = /\d+_[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+(,[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣_]+){1,5}|\d+_[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+.[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+|\d+_[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+|\d+[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+|\d+-[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+/gi;
    let splitRegExp1 = /-|_/ig;
    let searchRegExp1 = /,/ig;
    let searchRegExp2 = /\./ig;
    let arr;
    const StartDate = new Date(curYear,curMonth-1,1);
    var startDay = StartDate.getDay(); 
    console.log(startDay);
	var totalDate = getTotalDate(curYear,curMonth); 
    var previousDate = getTotalDate(curYear,curMonth-1);
    // let remain_day = 1;
    let cnt = 0;
    let array2 = [];
    const calendarArr = [];
    if(typeof startDay === "number"){
        var start_previousDate = previousDate - startDay+1;
        console.log(start_previousDate);
        console.log(startDay);
        for(let i=0 ; i<startDay ; i++)
        {
            calendarArr.push(""); 
            start_previousDate++;
        }
        for(let j=1 ; j<=totalDate ; j++) 
        {            
                calendarArr.push(j);
                startDay++;
                if(startDay > 6) 
                {
                    startDay = 0;
                }   
        }
        console.log(startDay);
        for(let z=startDay ; z<=6 ; z++)
        {
            console.log(z);
            
            calendarArr.push("");
            // remain_day++;
        }
        
    }
    for(let k = 0; k < (calendarArr.length/7); k++){
        let array = [];
        for(let n = 0; n<7 ;n++){
            array.push(calendarArr[cnt]); 
            cnt++;
            }
            array2.push(array);
    }
    	

    console.log(calendarArr);
    console.log(array2);


    if(res.data){
        arr = res.data.match(regexr1);
    }
    else {
        arr = string.match(regexr1);
    }
    
    const arr2 = [];
    const arr3 = [];
    const arr4 =[];
    let person = [];
    let count = 0;
    let calendarPerson = [];
    let calendarPeople = [];
    let calendarPeopleArr = [];
    let newArr:Array<any> = [];
    let idx = 0;
    if (1) {
        console.log(res);
        console.log(arr);
        
        if(arr !== null){
            for (let i = 0; i < arr.length; i++) {
                arr2.push(arr[i].split(splitRegExp1));
            }

        console.log(arr2);
        
        for(let i = 0; i<arr2.length;i++){
            if(typeof arr2[i][1] == "string"){
                if(arr2[i][1].search(searchRegExp1) !== -1){
                    
                    arr3.push([arr2[i][0],arr2[i][1].split(",")]);
                }
                else if(arr2[i][1].search(searchRegExp2) !== -1){
        
                    arr3.push([arr2[i][0],arr2[i][1].split(".")]);
                }
                else{
                    arr3.push([arr2[i][0],arr2[i][1]]);
                }
            }
        }
        console.log(arr3);
        
        for(let i = 0;i<arr3.length;i++){
            if(typeof arr3[i][1] == "string"){
                arr4.push([arr3[i][0],arr3[i][1]]);
            }
            else if(Array.isArray(arr3[i][1])){
                for(let j = 0; j<arr3[i][1].length;j++){
                    const arrCopy = arr3[i][1];
                    arr4.push([arr3[i][0],arrCopy[j]]);
                }
            }
        }
        console.log(arr4);

        for(let i = 0; i < arr2.length;i++){
            const date = new Date(convertDate(arr2[i][0]));
            for(let j = 0; j < calendarArr.length; j++){
                if((date.getFullYear() === curYear) && (curMonth === (date.getMonth()+1) && calendarArr[j] === date.getDate())){
                    calendarPerson.push({date: calendarArr[j], name: arr2[i][1]});
                }
            }
        }
        console.log(calendarPerson);

        for(let i = 0;i < calendarArr.length;i++){
            let cnt = 0;
            for(let j = 0;j<calendarPerson.length;j++){
                if(calendarArr[i] === calendarPerson[j].date){
                    calendarPeople.push({date: calendarPerson[j].date, name: calendarPerson[j].name});
                    cnt++;
                }
            }
            if(typeof calendarArr[i] === "number" && cnt === 0){
                calendarPeople.push({date: calendarArr[i], name: ""});
            }
            else if(calendarArr[i] === ""){
                calendarPeople.push({date: "", name: ""});
            }
        }
        console.log(calendarPeople);
        for(let k = 0; k < (calendarPeople.length/7); k++){
            let array = [];
            for(let n = 0; n<7 ;n++){
                array.push({name:calendarPeople[count].name, date: calendarPeople[count].date}); 
                count++;
                }
                calendarPeopleArr.push(array);
        }
        console.log(calendarPeopleArr);
       
        for (let i = 0; i < arr4.length; i++) {
            const date = new Date(convertDate(arr4[i][0]));
            if( (((curMonth-1) === (date.getMonth()+1) &&  20 < date.getDate() ) ||  ( curMonth === (date.getMonth()+1) && 20 >= date.getDate())) && date.getFullYear() === curYear){
                
                person.push({
                    name:  arr4[i][1],
                    date: (date.getMonth()+1)+"/"+date.getDate(),
                    year: date.getFullYear(),
                    month: [date.getMonth() + 1]
                });

            }
        }
        console.log(person);
        for (let x = 0; x < person.length; x++) {

            if (newArr.length > 0) {
                let isInList = false;
                let arrNum: number = 0;
                for (let y = 0; y < newArr.length; y++) {
                    if (newArr[y].name === person[x].name) {
                        isInList = true;
                        arrNum = y;
                    }
                }
                if (isInList) {
                    newArr[arrNum].date += ", " + person[x].date;
                    newArr[arrNum].cnt += 1;
                    newArr[arrNum].month.push(person[x].month[0]);
                
                    
                }
                else {
                    newArr.push({
                        index: idx,
                        name: person[x].name,
                        date: person[x].date,
                        cnt: 1,
                        month: person[x].month
                    });
                    idx++;
                }
            }
            else {
                newArr.push({
                    index: idx,
                    name: person[x].name,
                    date: person[x].date,
                    cnt: 1,
                    month: person[x].month
                });
                idx++;
            }
        }

    }
    
    newArr.sort(function(a,b){
        return b.cnt - a.cnt
    });

    console.log(newArr);

        // const data = res.data.replace('   ' , '').replace('\t', '');
        // console.log(data);
        // console.log(res);
        // console.log("------------------------------");
        // const list = data.split('\t');
        // console.log(list);

    }
    if(newArr.length > 0){
        return (
            <Fragment>
                <table className="airs-table">
                    <thead className="airs-table-thead">
                        <tr className="airs-table-row">
                            <Row RowClass="airs-row1" RowProps="이름" />
                            <th className="airs-row2">
                                날짜
                                <button className="airs-calendar-btn"> 
                                달력으로 보기
                                </button>
                            </th>
                            <Row RowClass="airs-row3" RowProps="횟수" />
                        </tr>
                    </thead>
                    <tbody className="airs-table-tbody">
                        {
                            newArr.map(row => (<Col ColClass={row.index} ColProps={row} />))
                        }
                    </tbody>
                </table>
                <div id="airs-popup-back">
                    <div className="airs-popup-box">
                        <table cellSpacing="2" cellPadding="0">
                            <thead>
                                <tr className="airs-cal-table-tr1">
                                    <th colSpan={7}><div className="airs-cal-back" onClick={monthMinus}>◀</div><b className="airs-cal-year">{curYear}</b> <b className="airs-cal-month">{curMonth}</b><div className="airs-cal-forward" onClick={monthPlus}>▶</div><div className="airs-cal-exit-btn"></div></th> 
                                </tr>
                                <tr className="airs-cal-table-tr2">
                                    <th className="sun">SUN</th>
                                    <th className="mon">MON</th>
                                    <th className="tue">TUE</th>
                                    <th className="wed">WED</th>
                                    <th className="thu">THU</th>
                                    <th className="fri">FRI</th>
                                    <th className="sat">SAT</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {
                                        calendarPeopleArr.map(col=>(<tr className="airs-cal-table-tr3">
                                            <td className="sun"><h2>{col[0].date}</h2><span>{col[0].name}</span></td>
                                            <td className="mon"><h2>{col[1].date}</h2><span>{col[1].name}</span></td>
                                            <td className="tue"><h2>{col[2].date}</h2><span>{col[2].name}</span></td>
                                            <td className="wed"><h2>{col[3].date}</h2><span>{col[3].name}</span></td>
                                            <td className="thu"><h2>{col[4].date}</h2><span>{col[4].name}</span></td>
                                            <td className="fri"><h2>{col[5].date}</h2><span>{col[5].name}</span></td>
                                            <td className="sat"><h2>{col[6].date}</h2><span>{col[6].name}</span></td>
                                        </tr>))
                                    }
                                
                            </tbody>
                        </table>
                        <div className="airs-cal-logo-box">
                            <div className="airs-cal-logo"></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
    else{
        return (
            <Fragment>
            <table className="airs-table">
                <thead className="airs-table-thead">
                    <tr className="airs-table-row">
                        <Row RowClass="airs-row1" RowProps="이름" />
                        <th className="airs-row2">
                                날짜
                                <button className="airs-calendar-btn"> 
                                달력으로 보기
                                </button>
                            </th>
                        <Row RowClass="airs-row3" RowProps="횟수" />
                    </tr>
                </thead>
                <tbody className="airs-table-tbody">
                </tbody>
            </table>
           
          <div id="airs-popup-back">
                    <div className="airs-popup-box">
                        <table cellSpacing="2" cellPadding="0">
                            <thead>
                                <tr className="airs-cal-table-tr1">
                                    <th colSpan={7}><div className="airs-cal-back" onClick={monthMinus}>◀</div><b className="airs-cal-year">{curYear}</b> <b className="airs-cal-month">{curMonth}</b><div className="airs-cal-forward" onClick={monthPlus}>▶</div><div className="airs-cal-exit-btn"></div></th> 
                                </tr>
                                <tr className="airs-cal-table-tr2">
                                <th className="sun">SUN</th>
                                    <th className="mon">MON</th>
                                    <th className="tue">TUE</th>
                                    <th className="wed">WED</th>
                                    <th className="thu">THU</th>
                                    <th className="fri">FRI</th>
                                    <th className="sat">SAT</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {
                                        calendarPeopleArr.map(col=>(<tr className="airs-cal-table-tr3">
                                            <td className="sun"><h2>{col[0].date}</h2><span>{col[0].name}</span></td>
                                            <td className="mon"><h2>{col[1].date}</h2><span>{col[1].name}</span></td>
                                            <td className="tue"><h2>{col[2].date}</h2><span>{col[2].name}</span></td>
                                            <td className="wed"><h2>{col[3].date}</h2><span>{col[3].name}</span></td>
                                            <td className="thu"><h2>{col[4].date}</h2><span>{col[4].name}</span></td>
                                            <td className="fri"><h2>{col[5].date}</h2><span>{col[5].name}</span></td>
                                            <td className="sat"><h2>{col[6].date}</h2><span>{col[6].name}</span></td>
                                        </tr>))
                                    }
                                
                            </tbody>
                        </table>
                        <div className="airs-cal-logo-box">
                            <div className="airs-cal-logo"></div>
                        </div>
                    </div>
                </div> <div className="airs-non-data-table-box">
            <div className="airs-non-data-table-aria">
              <img src="https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/data-512.png" width="300"alt="bee"/>
              <h1>이번 달은 백업데이터가 없습니다 :(</h1>  
            </div>  
          </div>
          </Fragment>
        );  
    }
}
export default Table;