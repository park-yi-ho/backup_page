import React, { useState } from 'react';

interface Props {
    titleProps: string;
}
var cnt  = 0;
const Header = ({titleProps}: Props) => {
    const [title] = useState(titleProps);
    

    return (
        <header id="airs-header">
            <h1 onClick={() => {
                console.log(cnt);
                if( cnt ===  0){
                    cnt = 1;
                }
                else{
                    cnt = 0;
                }
            }} className="airs-logo">{title}</h1>
        </header>
    );
}
export default Header;