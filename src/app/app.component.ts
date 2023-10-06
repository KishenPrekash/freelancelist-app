import { Component, OnInit } from '@angular/core';
import { PersonService } from './services/person.service';
import { Person } from './models/person';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  PersonArray : Person[] =[];

  PersonFormGp : FormGroup;

  constructor(private perServe : PersonService , private fb : FormBuilder)
  {
    
    this.PersonFormGp=this.fb.group({
      id : [""],
      username : [""],
      email : [""],
      phoneNumber : [""],
      skillSet : [""],
      hobby : [""]
  })
}
  ngOnInit(): void {
    this.getPersons();
   
  }

  getPersons(){
    this.perServe.GetPerson().subscribe(response => 
      {
        console.log(response);
        this.PersonArray= response;
      
      });
  }

  Onsubmit(){
    console.log(this.PersonFormGp.value);
    if(this.PersonFormGp.value.id!=null && this.PersonFormGp.value.id!="")
    {
      this.perServe.UpdatePerson(this.PersonFormGp.value).subscribe(response =>{
        console.log(response);
        this.getPersons();
        this.PersonFormGp.setValue({
          id:"",username:"",email:"",phoneNumber:"",skillSet:"",hobby:"",
        })
      });
    }
    else{
      this.perServe.CreatePerson(this.PersonFormGp.value).subscribe(response =>{
        console.log(response);
        this.getPersons();
        this.PersonFormGp.setValue({
          id:"",username:"",email:"",phoneNumber:"",skillSet:"",hobby:"",
        })
      });
    } 
  }

  Fillform(per:Person){
    this.PersonFormGp.setValue({
      id:per.id,username:per.username,email:per.email,phoneNumber:per.phoneNumber,skillSet:per.skillSet,hobby:per.hobby,
    })
  }

  DeletePer(id:string){
    this.perServe.DeletePerson(id).subscribe(response =>
      {
        console.log(response);
        this.getPersons();
      })
  }

  
  title = 'angularCrud';
}
