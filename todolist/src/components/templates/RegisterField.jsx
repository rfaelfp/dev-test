import './RegisterField.css'
import React from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


  export default props => 
    
      
    <Container className="container-form" maxWidth="xl">
        <form className="register-field" noValidate autoComplete="off">
            <strong>Descrição:<b></b></strong>
            <TextField id="outlined-basic" className="text-field" />
            <Button variant="contained" className="button" ><strong>Cadastrar</strong></Button>
        </form>
    </Container>
