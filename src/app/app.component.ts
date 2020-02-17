import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './services/funcionario.service';
import { Funcionario } from './models/funcionario';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  funcionario = {} as Funcionario;
  funcionarios: Funcionario[];
  constructor(private funcionarioService: FuncionarioService) {}
  
  ngOnInit() {
    this.getFuncionarios();
  }
  //Verifica se um funcionário já existe ou não, e se existir ele atualiza, caso não exista, ele cria um novo.
  saveFuncionario(form: NgForm) {
    if (this.funcionario.id !== undefined) {
      this.funcionarioService.updateFuncionario(this.funcionario).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.funcionarioService.saveFuncionario(this.funcionario).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }
  // Chama o serviço para obter todos os funcionários.
  getFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });
  }
  // Deleta um funcionario
  deleteFuncionario(funcionario: Funcionario) {
    this.funcionarioService.deleteFuncionario(funcionario).subscribe(() => {
      this.getFuncionarios();
    });
  }
  // Copia um funcionario para ser editado.
  editFuncionario(funcionario: Funcionario) {
    this.funcionario = { ...funcionario };
  }
  // Limpa o formulario.
  cleanForm(form: NgForm) {
    this.getFuncionarios();
    form.resetForm();
    this.funcionario = {} as Funcionario;
  }
}