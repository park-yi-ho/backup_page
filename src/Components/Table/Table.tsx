import React, { Fragment } from 'react';

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


interface TableProps {
    res: { data: string };
    curMonth: number;
    curYear: number;
}

function convertDate(yymmdd:string|any) {
    var d = yymmdd; // YYMMDD
    var yy = d.substr(0, 2);
    var mm = d.substr(2, 2);
    var dd = d.substr(4, 2);
    var yyyy = (+yy < 90) ? '20' + yy : '19' + yy;
    return yyyy + '-' + mm + '-' + dd;
}

const Table = ({ res, curMonth, curYear }: TableProps) => {
    const string = "190000\t190919\t\t   200118_changyoung\n190405\t190920\t\t   200121_jingu_2\n190408\t190924\t\t   200121_jingu,min\n190409\t190925\t\t   200203_jongil,jingyu\n190416\t190927\t\t   200204_jonghyun.jingyu\n190422\t191002\t\t   200205_min,jingyu\n190423\t191004\t\t   200206jongil,jingyu\n190624\t191011_진규,영욱   200207_min,changyoung\n190629\t191012_진구\t   200208_jonghyun\n190703\t191014_두희\t   200210_min\n190705\t191016_재연,진구   200211_jongil\n190708\t191017_영욱\t   200212_jonghyun\n190710\t191018_진규\t   200213_min\n190711\t191019_재연\t   200214_jongil\n190715\t191111_Jingu\t   200217_jonghyun\n190716\t191112_Jingu\t   200218_jongil\n190717\t191113_Jingyu\t   200219_jonghyun\n190718\t191115_Jingyu\t   200220_min\n190719\t191210_Jingyu\t   200221_jongil\n190722\t191211_Jingyu\t   200224_min,seungmin\n190723\t191212_Jingyu\t   200225_jongil\n190724\t191213_Jingyu\t   200511_min,jaeho,changyoung,jingu\n190725\t191214_Jingyu\t   200512_jongil\n190726\t191219_Jingu\t   200513_jongil,jungmin\n190729\t191220_jingu\t   200514_min\n190730\t191221_Jingyu\t   200515_min,seungwoo,sangoh\n190731\t191223_jingu\t   200516_jungmin\n190801\t191224_jingyu\t   200518_jungmin\n190802\t191226_jingyu\t   200519_jongil\n190808\t191227_jingyu\t   200520_sangoh,min\n190809\t191228_jingyu\t   200521_sangoh,min\n190814\t191230_jingu\t   200522_seungwoo,sangoh\n190819\t200104_jingu\t   200523_jungmin\n190821\t200107_jingyu\t   200525_jungmin\n190822\t200108_jingyu\t   200526_jongil\n190823\t200109_jingyu\t   200527_sangoh\n190826\t200110_jingyu\t   200528_sangoh\n190827\t200111_jingyu\t   200529_seungwoo,changyoung,jingu\n190903\t200113_changyoung  200530_jungmin\n190905\t200114-changyoung  200601_jungmin\n190910\t200115-changyoung  200602_jongil\n190917\t200116-changyoung";
    let regexr1 = /\d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+(,[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣_]+){1,5}|\d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+.[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+|\d+_[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+|\d+[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+|\d+-[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣_]+/gi;
    let splitRegExp1 = /-|_/ig;
    let searchRegExp1 = /,/ig;
    let searchRegExp2 = /\./ig;
    let arr;
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
    let newArr:Array<any> = [];
    let idx = 0;
    if (1) {
        console.log(res);
        console.log(arr);
        
        if(arr !== null){
            for (let i = 0; i < arr.length; i++) {
                arr2.push(arr[i].split(splitRegExp1));
            }
        console.log(curMonth);
        console.log(arr2);
        console.log("-----------------------------------------------");
        for(let i = 0; i<arr2.length;i++){
            if(typeof arr2[i][1] == "string"){
                if(arr2[i][1].search(searchRegExp1) !== -1){
                    console.log("1: "+arr2[i][1].search(searchRegExp1));
                    arr3.push([arr2[i][0],arr2[i][1].split(",")]);
                }
                else if(arr2[i][1].search(searchRegExp2) !== -1){
                    console.log("2: "+arr2[i][1].search(searchRegExp2));
                    arr3.push([arr2[i][0],arr2[i][1].split(".")]);
                }
                else{
                    arr3.push([arr2[i][0],arr2[i][1]]);
                }
            }
        }
        console.log(arr3);
        console.log("-----------------------------------------------");
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
        console.log("-----------------------------------------------");
            for (let i = 0; i < arr4.length; i++) {
                const date = new Date(convertDate(arr4[i][0]));
                console.log(date.getFullYear(),curYear);
                if((((curMonth-1) === (date.getMonth()+1) &&  20 < date.getDate() ) ||  ( curMonth === (date.getMonth()+1) && 20 >= date.getDate())) && date.getFullYear() === curYear){
                    person.push({
                        name: arr4[i][1],
                        date: (date.getMonth()+1)+"."+date.getDate(),
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
        console.log("--------------------------------------------");
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
            <table className="airs-table">
                <thead className="airs-table-thead">
                    <tr className="airs-table-row">
                        <Row RowClass="airs-row1" RowProps="이름" />
                        <Row RowClass="airs-row2" RowProps="날짜" />
                        <Row RowClass="airs-row3" RowProps="횟수" />
                    </tr>
                </thead>
                <tbody className="airs-table-tbody">
                    {
                        newArr.map(row => (<Col ColClass={row.index} ColProps={row} />))
                    }
                </tbody>
            </table>
        );
    }
    else{
        return (
            <Fragment>
            <table className="airs-table">
                <thead className="airs-table-thead">
                    <tr className="airs-table-row">
                        <Row RowClass="airs-row1" RowProps="이름" />
                        <Row RowClass="airs-row2" RowProps="날짜" />
                        <Row RowClass="airs-row3" RowProps="횟수" />
                    </tr>
                </thead>
                <tbody className="airs-table-tbody">
                </tbody>
            </table>
            <div className="airs-non-data-table-box">
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