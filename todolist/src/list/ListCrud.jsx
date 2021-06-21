import React, { Component } from 'react'

import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox';

const baseUrl = 'http://localhost:3001/tasks'
const initialState = {
    task: { name: '', finished: false },
    list: []
}

export default class ListCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ task: initialState.task })
    }

    save() {
        const task = this.state.task
        const method = task.id ? 'put' : 'post'
        const url = task.id ? `${baseUrl}/${task.id}` : baseUrl
        axios[method](url, task)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ task: initialState.task, list })
            })
    }

    getUpdatedList(task, add = true) {
        const list = this.state.list.filter(u => u.id !== task.id)
        if (add) list.unshift(task)
        return list
    }


    updateField(event) {
        const task = { ...this.state.task }
        task[event.target.name] = event.target.value
        this.setState({ task })
    }

    renderInput() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-md-9">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control" name="name" value={this.state.task.name}
                                onChange={e => this.updateField(e)} />
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

    load(task) {
        this.setState({ task })
    }

    remove(task) {
        axios.delete(`${baseUrl}/${task.id}`).then(resp => {
            const list = this.getUpdatedList(task, false)
            this.setState({ list })
        })
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
                        {!list.finished
                            ? <td className="align-middle">{list.name}</td>
                            : <td className="align-middle"><s>{list.name}</s></td>
                        }
                    <td>
                        <button className="btn btn-outline-dark mr-1" onClick={() => this.load(list)}>
                            <i className="fa fa-pencil pr-1"></i>
                            Editar
                        </button>
                        <button className="btn btn-outline-dark mr-1" onClick={() => this.remove(list)}>
                            <i className="fa fa-trash pr-1"></i>
                            Excluir
                        </button>
                        {!list.finished
                            ? <button className="btn btn-outline-dark mr-1" name="finish" value="true"  onChange={e => this.updateField(e)} >
                                <i className="fa fa-check pr-1"></i>
                                Finalizar
                            </button>
                            : <button className="btn btn-secondary">
                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                            </button>
                        }
                    </td>
                </tr>
            )
        })

    }

    renderBottonButton() {
        return (

            <div className="col-md-12 d-flex justify-content-left pt-4">
                <button className="btn btn-outline-dark">
                    <i className="fa fa-list pr-1"></i>
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

