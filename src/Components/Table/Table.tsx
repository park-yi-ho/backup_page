import React, { useState, Fragment } from 'react';
import _ from 'lodash';

interface tableRowProps {
    RowProps: string;
    RowClass: string;
}

interface ColProps {
    index: number;
    name: string;
    date: string;
    cnt: number;
    month: Array<any>;
}

interface NewArr {
    index: number;
    name: string;
    date: string;
    cnt: number;
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
            <td className={"airs-name-" + index.toString()}>{name}</td>
            <td className={"airs-date-" + index.toString()}>{date}</td>
            <td className={"airs-idx-" + index.toString()}>{cnt}</td>
        </tr>
    );
}


interface TableProps {
    res: { data: string };
    curMonth: number;
}

function convertDate(yymmdd:string) {
    var d = yymmdd; // YYMMDD
    var yy = d.substr(0, 2);
    var mm = d.substr(2, 2);
    var dd = d.substr(4, 2);
    var yyyy = (+yy < 90) ? '20' + yy : '19' + yy;
    return yyyy + '-' + mm + '-' + dd;
}

const Table = ({ res, curMonth }: TableProps) => {
    const string = "191205 jongil 200105 yiho 200223 yiho   200512 jingu 200513 min 200517 doohee 200520 yiho 200530 min";
    // let regexr1 = /\d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+| \d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣_]+| \d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+| \d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+| \d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+/ig;
    let regexr1 = /\d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+(,[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣_]+){1,5}|\d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+.[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+|\d+_[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+|\d+[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+,[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+|\d+-[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+/gi;
    let splitRegExr1 = /-||_""/; 
    let arr;
    try{
        arr = res.data.match(regexr1);
    }
    catch{
        arr = string.match(regexr1);
    }
    
    const arr2 = [];
    const arr3 = [];
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    let person = [];
    let newArr:Array<any> = [];
    let idx = 0;
    if (1) {
        console.log(res);
        console.log(arr);
        
        if(arr !== null){
            for (let i = 0; i < arr.length; i++) {
                arr2.push(arr[i].split("_"));
            }
        console.log(curMonth);
        console.log(arr2);
        console.log("-----------------------------------------------");
        for(let i = 0; i<arr2.length;i++){
                if(arr2[i][1]){

                }
        }
        console.log("-----------------------------------------------");
            for (let i = 0; i < arr2.length; i++) {
                const date = new Date(convertDate(arr2[i][0]));
                console.log(date.getMonth()+1);
                if((date.getMonth() + 1) === curMonth){
                    person.push({
                        name: arr2[i][1],
                        date: dayOfWeek[date.getDay()],
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
                        <Row RowClass="airs-row3" RowProps="요일" />
                        <Row RowClass="airs-row4" RowProps="횟수" />
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
                        <Row RowClass="airs-row3" RowProps="요일" />
                        <Row RowClass="airs-row4" RowProps="횟수" />
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