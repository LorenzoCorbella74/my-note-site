# Angular router

The Angular Router provides two different methods to get route parameters:

- Using the route snapshot,
- Using Router Observables

```html
<ul>
  <li *ngFor="let product of products">
    <a [routerLink]="['/product',product.id]"></a>
  </li>
</ul>

<!-- oppure -->
<a routerLink="/product/"></a>
```

```typescript
import { ActivatedRoute } from '@angular/router';

// dentro un componente
constructor(private route: ActivatedRoute) {}

// con paramMap
ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.products.forEach((p: Product) => {
        if (p.id == params.id) {
          this.product = p;
        }
      });
    });
  }

// oppure con snapshot senza sottoscriversi...
ngOnInit() {
  this.products.forEach((p: Product) => {
    // nel caso di query string
    // this.quoteId = this.activatedRoute.snapshot.queryParamMap.get('qId');
    if (p.id == this.route.snapshot.params.id) {
      this.product = p;
    }
  });
}
```

## Links:
