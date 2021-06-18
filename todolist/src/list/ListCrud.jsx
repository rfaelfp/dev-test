import React, { Component } from 'react'

import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox';

const baseUrl = 'http://localhost:3001/list'
const initialState = {
    list: [ 
        {
        tarefa: "teste"
    }
    ]
}
export default class ListCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    save() {
        const list = this.state.list
        const method = list.id ? 'put' : 'post'
        const url = list.id ? `${baseUrl}/${list.id}` : baseUrl
        axios[method](url, list)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ list: initialState.list, list })
            })
    }

    getUpdatedList(list, add = true) {
        const lists = this.state.list.filter(u => u.id !== list.id)
        if(add) list.unshift(list)
        return lists
    }

    updateField (event) {
        const task = { ...this.state.list }
        task[event.target.tarefa] = event.target.value
        this.setState({ task })
    }


    renderInput() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-md-9">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control"
                            value={this.state.list.tarefa} name="tarefa"
                            onChange={e => this.updateField(e)}/>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-left pt-4">
                        <div className="form-group">
                            <button className="btn btn-outline-dark btn-lg mr-2" onClick={e => this.save(e)}>
                                <b>Cadastrar</b>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <div >
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tarefas</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRow()}
                    </tbody>
                </table>
            </div>
        )
    }

    renderRow() {
        return this.state.list.map(list => {
            return (
                <tr>
                    <td>
                        <Checkbox
                            color="default"
                            inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                        /></td>
                    <td className="align-middle">{list.tarefa}</td>
                    <td>
                        <button className="btn btn-outline-dark mr-1">
                            <i className="fa fa-pencil pr-1"></i>
                            Editar
                        </button>
                        <button className="btn btn-outline-dark mr-1" >
                            <i className="fa fa-trash pr-1"></i>
                            Excluir
                        </button>
                        <button className="btn btn-outline-dark mr-1" >
                            <i className="fa fa-check pr-1"></i>
                            Finalizar
                        </button>
                    </td>
                </tr>
            )
        })

    }

    renderBottonButton() {
        return (

                <div className="col-md-12 d-flex justify-content-left pt-4">
                    <button className="btn btn-outline-dark" >
                        <i className="fa fa-check pr-1"></i>
                        Selecionar Todos
                    </button>
                    <button className="btn btn-outline-dark ml-2" >
                        <i className="fa fa-check pr-1"></i>
                        Finalizar Selecionados
                    </button>
                </div>
        )
    }



    render() {
        return (
            <div>
                {this.renderInput()}
                {this.renderTable()}
                {this.renderBottonButton()}

            </div>
        )
    }
}

