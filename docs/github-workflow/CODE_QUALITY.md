# Padroes de Qualidade - Angular

## Stack

| Tecnologia | Uso |
|------------|-----|
| Angular | Framework |
| TypeScript | Linguagem |
| TailwindCSS | Estilos |
| RxJS | Reactive |

## TypeScript

### Tipos Explicitos
```typescript
// RUIM
const users = []
function getData(id) { }

// BOM
interface User {
  id: number
  name: string
}
const users: User[] = []
function getUser(id: number): Observable<User> { }
```

## Angular Patterns

### Componentes
```typescript
// BOM
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  @Input() users: User[] = []
  @Output() userSelected = new EventEmitter<User>()
}
```

### Services
```typescript
// BOM
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient)
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users')
  }
}
```

### Signals (Angular 16+)
```typescript
// BOM
export class UserComponent {
  private userService = inject(UserService)
  
  users = this.userService.getUsers()
  selectedUser = signal<User | null>(null)
  
  selectUser(user: User) {
    this.selectedUser.set(user)
  }
}
```

## Comandos

```bash
ng serve       # Dev server
ng build       # Build
ng test        # Testes
ng lint        # Lint
```

## Checklist

- [ ] TypeScript strict mode
- [ ] Componentes standalone
- [ ] Signals quando apropriado
- [ ] OnPush change detection
- [ ] Services injetaveis
