import React, { Component } from 'react'
import './ListCrud.css'

import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox';

const baseUrl = 'http://localhost:3001/tasks'
const initialState = {
    task: { name: '', finished: false, checked: false },
    list: []
}

export default class ListCrud extends Component {
    
    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
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
        list.sort(function compare(a, b) {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;            
        })
        return list
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

    finishTask(task) {
        const data = { name: task.name, finished: true, checked: task.checked }
        axios.put(`${baseUrl}/${task.id}`, data).then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ task: initialState.task, list })
        })
    }

    markAllCheckBox() {
        this.state.list.map(list => {           
            const data = { name: list.name, finished: list.finished, checked: true }
            if (!list.checked) {         
                axios.put(`${baseUrl}/${list.id}`, data).then(resp => {
                    const list = this.getUpdatedList(resp.data)
                    this.setState({ list })
                })
            }
        })
        }

    finishSelected() {
        this.state.list.map(list => {
            if (list.checked == true) this.finishTask(list)
        })
    }

    

    updateField(event) {
        const task = { ...this.state.task }
        task[event.target.name] = event.target.value
        this.setState({ task })
    }

    checkBoxChange(task) {
        const data = { name: task.name, finished: task.finished, checked: !task.checked }
        axios.put(`${baseUrl}/${task.id}`, data).then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ task: initialState.task, list })       
        }) 
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

    renderTable() {
        return (
            <div>
                <table className="table mt-12" >
                    <thead>
                        <tr>
                            <th className="col-sm-1"></th>
                            <th className="col-sm-7">Tarefas</th>
                            <th className="col-sm-4">Ações</th>
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
                    <td className="col-sm-1">
                        <Checkbox
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            checked={list.checked}
                            onClick={() => this.checkBoxChange(list)}
                        />
                    </td>
                    {!list.finished
                        ? <td className="align-middle col-sm-7" >{list.name}</td>
                        : <td className="align-middle col-sm-7" id="finish" ><s>{list.name}</s></td>
                    }
                    <td className="col-sm-4">
                        <button className="btn btn-outline-dark mr-1" onClick={() => this.load(list)}>
                            <i className="fa fa-pencil pr-1"></i>
                            Editar
                        </button>
                        <button className="btn btn-outline-dark mr-1" onClick={() => this.remove(list)}>
                            <i className="fa fa-trash pr-1"></i>
                            Excluir
                        </button>
                        {!list.finished
                            ? <button className="btn btn-outline-dark mr-1" onClick={() => this.finishTask(list)} >
                                <i className="fa fa-check pr-1"></i>
                                Finalizar
                            </button>
                            : <button className="btn btn-secondary" id="finishButton">
                                <i className="fa fa-check-circle" aria-hidden="true"></i>
                            </button>
                        }
                    </td>
                </tr>
            )
        })

    }

    renderBottonButton() {
        return (
            <div className="col-md-12 d-flex justify-content-left pt-4" >
                <button className="btn btn-outline-dark" onClick={() => this.markAllCheckBox()}>
                    <i className="fa fa-list pr-1"></i>
                    Selecionar Todos
                </button>
                <button className="btn btn-outline-dark ml-2" onClick={() => this.finishSelected()}>
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

