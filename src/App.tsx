import React, { Component } from 'react';
import './App.css';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';

//const url = "https://dummyjson.com/carts";
//const baseUrl = "https://localhost:44302/api/empresas/";

const data = [
  {id:1, personaje: "Naruto", anime: "Naruto"},
  {id:2, personaje: "Goku", anime: "Dragon Ball"},
  {id:3, personaje: "Genshin Himura", anime: "Ruroni kenshin"},
  {id:4, personaje: "Monkey D. Luffy", anime: "One Piece"},
  {id:5, personaje: "Edward Elric", anime: "Fullmetal Alchemist: Brotherhood"},
  {id:6, personaje: "Seto kaiba", anime: "Yu-Gi-Oh"},
];

class App extends React.Component {

  // Estados
  state = {

    data:data,

    form:{
      id:0,
      personaje:'',
      anime:''
    },
    modalInsertar: false,
    modalEditar: false,
  };


  // Metodo Obtener Datos formulario
  handleChange=(e:any)=> {
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    })
  }


  // Insertar
  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }
  cerrarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }


  // Editar
  mostrarModalEditar=(registro: any)=>{
    this.setState({modalEditar: true, form: registro});
  }
  cerrarModalEditar=()=>{
    this.setState({modalEditar: false});
  }


  // Metodo Insertar
  insertar=()=>{
    var valorNuevo = {...this.state.form};
    valorNuevo.id = this.state.data.length+1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false})
  }


  // Metodo Editar
  editar=(dato: any)=>{
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if (dato.id == registro.id) {
        lista[contador].personaje = dato.personaje;
        lista[contador].anime = dato.anime;
      }
      contador++;
    });
    this.setState({data: lista, modalEditar: false});
  }

  // Metodo Eliminar
  eliminar=(dato: any)=>{
    var opcion = window.confirm("Realmente desea eliminar el registro " + dato.id)
    if (opcion) {
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro)=>{
        if (dato.id == registro.id) {
          lista.splice(contador, 1);
        }
        contador ++;
      });
      this.setState({data: lista, mostrarModalEditar: false});
    }
  }


 render(){
  return(
    <>
    <Container>
    <br></br>
    <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo personaje</Button>
    <br></br>
    <br></br>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>PERSONAJE</th>
          <th>ANIME</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((elemento) => (
          <tr>
            <td>{elemento.id}</td>
            <td>{elemento.personaje}</td>
            <td>{elemento.anime}</td>
            <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
            <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>

    {/* Modal Insertar */}
    <Modal isOpen={this.state.modalInsertar}>
      <ModalHeader>
        <div>
          <h3>Insertar Registro</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>ID:</label>
          <input type="text" name='id' className='form-control' readOnly value={this.state.data.length+1} />
        </FormGroup>

        <FormGroup>
          <label>Personaje:</label>
          <input type="text" name='personaje' className='form-control' onChange={this.handleChange}/>
        </FormGroup>

        <FormGroup>
          <label>Anime:</label>
          <input type="text" name='anime' className='form-control' onChange={this.handleChange}/>
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color='success' onClick={()=>this.insertar()}>Insertar</Button>
        <Button color='danger' onClick={()=>this.cerrarModalInsertar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>


    {/* Modal Editar */}
    <Modal isOpen={this.state.modalEditar}>
      <ModalHeader>
        <div>
          <h3>Editar Registro</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>ID:</label>
          <input type="text" name='id' className='form-control' readOnly value={this.state.form.id}/>
        </FormGroup>

        <FormGroup>
          <label>Personaje:</label>
          <input type="text" name='personaje' className='form-control' onChange={this.handleChange} value={this.state.form.personaje} />
        </FormGroup>

        <FormGroup>
          <label>Anime:</label>
          <input type="text" name='anime' className='form-control' onChange={this.handleChange} value={this.state.form.anime} />
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color='success' onClick={()=>(this.editar(this.state.form))}>Editar</Button>
        <Button color='danger' onClick={()=>this.cerrarModalEditar()}>Cancelar</Button>
      </ModalFooter>
    </Modal>

    </>);
  }
 }

export default App;
