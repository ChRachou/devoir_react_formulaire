import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css'; 

class  App extends Component {

  constructor(props){
    super(props)
    this.state ={
      civilite: "Monsieur", 
      etape: 1,  
    }

  }


  //Fonction qui initialise les valeurs du formulaire
  Init = () => {
    this.setState({
      civilite: "Monsieur", 
      etape: 1,
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      framework: "",
      autre: ""
    })
  }

  //Fonction qui permet de changer de page de formulaire (suivant)
  NextPage = ( ) => { 
    if (this.state.etape === 1 ) {
      this.setState({
        etape: 2
      })
    }
    if (this.state.etape === 2 ) {
      this.setState({
        etape: 3
      })
    }
     
    
  }

  //Fonction qui permet d'annuler les information saisie du formulaire
  Cancel = () => {
    this.setState({
      etape: 1
    })
    this.Init();
  }

  //Fonction qui envoie les données saisies à mon serveur
  Save = () => {

       let utilisateur =   
      {
        "civilite": this.state.civilite, 
        "nom": this.state.nom,
        "prenom": this.state.prenom,
        "email": this.state.email,
        "telephone": this.state.telephone,
        "framework": this.state.framework,
        "autre": this.state.autre
      }    

      let url =  "http://localhost:3001/user";

      let header = {
           'Accept': 'application/json',
          'Content-Type': 'application/json' 
      }

      console.log(utilisateur)

        fetch(url, {
          header : header,  
          json: true,
          body: JSON.stringify(utilisateur)

      }).then(function(response) {
        return response.json()
      }) ;
  }


  //Fonction qui permet de changer de page de formulaire (précédent)
  PreviousPage = () => {
    if (this.state.etape === 3 ) {
      this.setState({
        etape: 2
      })
    }
    if (this.state.etape === 2 ) {
      this.setState({
        etape: 1
      })
    }
     
  } 

  //Fonction qui permet de changer les valeur de mon state avec les données saisis
  sauvegarde = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })

    //console.log(this.state);

  }

//Affichage da la page
  render() {
    return (
      <div className="App">
        <div id="formulaire"> 
        
           <form onSubmit={this.Save }>
           

            {/* Première etape du formulaire */}
           {
              this.state.etape === 1 ? 
              <div>
                <label>Civilité: </label>
            <select name="civilite" onChange={this.sauvegarde} >
             <option value="Madame" >Madame</option>
             <option value="Monsieur" selected > Monsieur</option>
             <option value="Mademoiselle">Mademoiselle</option>
           </select>
           <label>Nom:</label>
           <input type="text" name="nom" onChange={this.sauvegarde}  value={this.state.nom} />
           <label>Prenom</label>
           <input type="text" name="prenom" onChange={this.sauvegarde}  value={this.state.prenom}/>
           <label>Email</label>
           <input type="email" name="email" onChange={this.sauvegarde}  value={this.state.email}/>
           <label>Téléphone</label>
           <input type="telephone" name="telephone" onChange={this.sauvegarde}  value={this.state.telephone}/>
           
           <button onClick={ this.NextPage }>Suivant</button>
              </div>
                
               : ""
          }
           {
              this.state.etape === 2 ? 
              <div>
                 <label>Framework préféré</label>
                 <div className="radio">
                    <label>Angular</label>
                    <input type="radio" name="framework" onChange={this.sauvegarde}  value="Angular"/>
                    <label>VueJs</label>
                    <input type="radio" name="framework" onChange={this.sauvegarde}  value="VueJs"/>
                    <label>Symfony</label>
                    <input type="radio" name="framework" onChange={this.sauvegarde}  value="Symfony"/>
                  </div>
                  <div className="autre">
                  <label>Autre</label>
                  <textarea name="autre" onChange={this.sauvegarde} rows="5" cols="33"> </textarea>
                  </div>
                 
                 <div className="boutons">
                  <button onClick={ this.PreviousPage }>Précédent</button>
                  <button onClick={ this.NextPage }>Suivant</button>
                </div>
            
              </div>
              : ""
          }
          {this.state.etape === 3 ? 
            <div>
              <p>{this.state.civilite} {this.state.nom} {this.state.prenom}</p>
              <p>Ayant pour email {this.state.email} et numéro de téléphone {this.state.telephone}</p>
              <p>Les informations suivantes ont été saisie:</p>
              <p>Framework préféré: {this.state.framework} </p> 
              <p>Autre: {this.state.autre} </p> 
              <div className="boutons">
              <button onClick={ this.PreviousPage }>Précédent</button>
              <button >Enregistrer </button> 
              <button onClick={ this.Cancel }>Annuler</button>
              </div>
               
            </div>
    
          : ""

          
          }
             
             
            
           
          
           
           </form>

         
            
           
        
        
        </div>
        
      </div>
    )
  }
}

export default App;
