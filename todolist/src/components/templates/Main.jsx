import './Main.css'
import React from 'react'
import ListCrud from '../../list/ListCrud'

export default props =>

    <React.Fragment>
        <main className="content container-fluid">
            <div className="p-3 m-3">
                <ListCrud></ListCrud>
            </div>
        </main>
    </React.Fragment>