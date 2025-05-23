import { livrosComponent } from './livros/livros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarLivroComponent } from './cadastrar-livro/cadastrar-livro.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterComponent } from './register/register.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth.guard';
import { CadastrarAutorComponent } from './cadastrar-autor/cadastrar-autor.component';
import { CadastrarGeneroComponent } from './cadastrar-genero/cadastrar-genero.component';
import { AutorComponent } from './autor/autor.component';
import { GeneroComponent } from './genero/genero.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/cadastrar', pathMatch: 'full' },
      { path: 'cadastrar', component: CadastrarLivroComponent },
      { path: 'atualizar/:id', component: CadastrarLivroComponent },
      { path: 'cadastrarAutor', component: CadastrarAutorComponent },
      { path: 'atualizarAutor/:id', component: CadastrarAutorComponent },
      { path: 'cadastrarGenero', component: CadastrarGeneroComponent },
      { path: 'atualizarGenero/:id', component: CadastrarGeneroComponent },
      { path: 'livros', component: livrosComponent },
      { path: 'autores', component: AutorComponent },
      { path: 'generos', component: GeneroComponent },
      { path: 'users', component: UsersComponent },
      { path: 'registerUser', component: RegisterUserComponent },
      { path: 'updateUser/:id', component: RegisterUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
