    //Responsavél pela criação de metódos do HttpClient, recomendação da própria Angular, que recomenda que metódos de HttpClient sejam criados dentro de serviços.
    
    import { Injectable } from '@angular/core';
    import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
    import { Observable, throwError } from 'rxjs';
    import { retry, catchError } from 'rxjs/operators';
    import { Funcionario } from '../models/funcionario';
    @Injectable({
      providedIn: 'root'
    })
    export class FuncionarioService {
      //Api Rest Fake
      url = 'http://localhost:3000/funcionarios';

      // Injeta o HttpClient no serviço.
      constructor(private httpClient: HttpClient) { }

      // Headers da requisição.
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
      // Obtém todos funcionários.
      getFuncionarios(): Observable<Funcionario[]> {
        return this.httpClient.get<Funcionario[]>(this.url)
          .pipe(
            retry(2),
            catchError(this.handleError))
      }
      // Salva um funcionário novo.
      saveFuncionario(funcionario: Funcionario): Observable<Funcionario> {
        return this.httpClient.post<Funcionario>(this.url, JSON.stringify(funcionario), this.httpOptions)
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
      }
      // Atualiza um funcionário já existente.
      updateFuncionario(funcionario: Funcionario): Observable<Funcionario> {
        return this.httpClient.put<Funcionario>(this.url + '/' + funcionario.id, JSON.stringify(funcionario), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }
      // Deleta um funcionário.
      deleteFuncionario(funcionario: Funcionario) {
        return this.httpClient.delete<Funcionario>(this.url + '/' + funcionario.id, this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.handleError)
          )
      }
      // Manipulação de erros
      handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Mensagem de erro do lado cliente.
          errorMessage = error.error.message;
        } else {
          // Mensagem de erro do lado servidor.
          errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      };
    }