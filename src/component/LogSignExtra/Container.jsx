import React from "react";

function ContainerBox({children}){
    return(
        <div className='w-full max-w-7xl mx-auto px-4'>
            {children}
        </div>
    )
}

export default ContainerBox;