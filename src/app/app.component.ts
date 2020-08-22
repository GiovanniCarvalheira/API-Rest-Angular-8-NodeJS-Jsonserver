import { Component, OnInit, Type } from '@angular/core';
import { FuncionarioService } from './services/funcionario.service';
import { Funcionario, Funcionario2, Pesquisa } from './models/funcionario';
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
  funcionario2 = {} as Funcionario2;
  funcionarios2: Funcionario2[];
  pesquisa = {} as Pesquisa;
  pesquisas: Pesquisa[];

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit() {
    this.getFuncionarios();
  }

  //Verifica se um funcionário já existe ou não, e se existir ele atualiza, caso não exista, ele cria um novo.
  saveUpdateFuncionario(form?: NgForm) {
    if (this.funcionario.id !== undefined) {
      (async () => {
        this.Alerts(3);
        await this.delay(1000);
        this.funcionarioService.updateFuncionario(this.funcionario).subscribe(() => {

        });
    })();

    } else {

      (async () => {
        this.funcionario = this.funcionario2;
        this.ScrollTop();
        this.Alerts(1);
        await this.delay(1500);

        this.funcionarioService.saveFuncionario(this.funcionario).subscribe(() => {
        });
    })();
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
    (async () => {
      this.Alerts(2);
      await this.delay(1000);
      this.funcionarioService.deleteFuncionario(funcionario).subscribe(() => {
        this.getFuncionarios();
      });
  })();
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

  //Função responsável por permitir adicionar delay no código.
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  //Altera o nome do botão que realiza collapse.
  htmlStr: string = 'Exibir Funcionários';
  ChangeName(){
    if(this.htmlStr == 'Esconder Funcionários'){
      this.htmlStr = 'Exibir Funcionários';
    }
    else{
      this.htmlStr = 'Esconder Funcionários';
    }
  }

  //Responsável pelo controle de visualização de funcionários.
  ShowList(){
    if(this.htmlStr == 'Exibir Funcionários'){
      document.getElementById('demo').style.display = 'block';
    }
    else{
      document.getElementById('demo').style.display = 'none';
    }
  }

  //Responsável por exibir os alertas.
  isVisibleSucess = false;
  isVisibleDelete = false;
  isVisibleEdit = false;
  Alerts(EscolhaNum: number){
    switch(EscolhaNum){
      case 1:
        this.isVisibleSucess = true;
        break;
      case 2:
        this.isVisibleDelete = true;
        break;
      case 3:
        this.isVisibleEdit = true;
        break;
    }
  }

  //Move a página para o topo
  ScrollTop(){
    window.scrollTo({
      top: 0,
    });
}
//Checa se o input salario é um caractere ou um número.
CheckType(salario: any){
        var re = /^\d/;
        var re2 = /[a-zA-Z]/;
        var result = true;
        if(re.test(salario)){
          result = false;
        }
        if(re2.test(salario)){
          result = true;
        }
        return result;
}
}
