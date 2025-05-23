import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Livro } from '../model/livro';
import { Autor } from '../model/autor';
import { Genero } from '../model/genero';

@Injectable({
  providedIn: 'root',
})
export class LivrariaService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  cadastrarLivro(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.baseUrl}/livros/cadastrar`, livro);
  }

  listarLivros(): Observable<Array<Livro>> {
    return this.http.get<Array<Livro>>(`${this.baseUrl}/livros`);
  }

  consultarLivro(id: Number): Observable<Livro> {
    return this.http.get<Livro>(`${this.baseUrl}/livros/${id}`);
  }

  atualizarLivro(id: Number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.baseUrl}/livros/atualizar/${id}`, livro);
  }

  removerLivro(id: Number): Observable<Livro> {
    return this.http.delete<Livro>(`${this.baseUrl}/livros/${id}`);
  }

  cadastrarAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(`${this.baseUrl}/autores/cadastrar`, autor);
  }

  listarAutor(): Observable<Array<Autor>> {
    return this.http.get<Array<Autor>>(`${this.baseUrl}/autores`);
  }

  consultarAutor(id: Number): Observable<Autor> {
    return this.http.get<Autor>(`${this.baseUrl}/autores/${id}`);
  }

  atualizarAutor(id: Number, autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.baseUrl}/autores/atualizar/${id}`, autor);
  }

  removerAutor(id: Number): Observable<Autor> {
    return this.http.delete<Autor>(`${this.baseUrl}/autores/${id}`);
  }

  cadastrarGenero(genero: Genero): Observable<Genero> {
    return this.http.post<Genero>(`${this.baseUrl}/generos/cadastrar`, genero);
  }

  listarGenero(): Observable<Array<Genero>> {
    return this.http.get<Array<Genero>>(`${this.baseUrl}/generos`);
  }

  consultarGenero(id: Number): Observable<Genero> {
    return this.http.get<Genero>(`${this.baseUrl}/generos/${id}`);
  }

  atualizarGenero(id: Number, autor: Genero): Observable<Autor> {
    return this.http.put<Genero>(`${this.baseUrl}/generos/atualizar/${id}`, autor);
  }

  removerGenero(id: Number): Observable<Genero> {
    return this.http.delete<Genero>(`${this.baseUrl}/generos/${id}`);
  }
}
