# Installation

* Clone my repository
* git branch -a
* git pull origin/branch-name
* npm i
* npm i (inside server folder)
* ng serve (frontend)
* npm start (backend - from server folder)

# Principal commands I've done on terminal and some tips on my file structure:

* ng new angular-app
* git checkout -b core/header-component
* ng g m core --spec false
* ng g c core/header-component --spec false
* CoreModule: exports HeaderComponent
* AppModule: imports CoreModule
* npm i bootstrap@4.1.1 --save
* angular.json: "./node_modules/bootstrap/dist/css/bootstrap.min.css"
* restart ng serve
* copy navbar from bootstrap
* angular.json: stylePreprocessorOptions sotto architect->build
* git checkout -b features/rental
* ng g m features/rental --spec false
* change to SCSS from CSS: ng config defaults.styleExt=scss or try with ng config * schematics.@schematics/angular:component.styleext scss
* ng config schematics.@schematics/angular:component.spec false
* ng g c features/rental
* ng config schematics.@schematics/angular:module.spec false
* ng g m app-routing --flat
* cd /src/app
* touch app.routes.ts
* ng g m features/rental/rental-rounting --flat
* cd /src/app/features/rental
* touch rental.routes.ts
* When you create routing pay attention to whole application modules: from  app.module.ts a rental.module.ts to the routing modules rental-routing.module.ts and app-routing.module.ts
* cd /src/app/features/rental
* ng g c rental-list --module rental
* ng g c rental-list-item --module rental
* ng g s features/rental/shared/rental --spec false
* ng g i features/rental/shared/rental --spec false
* rename the file created above: rental.ts to rental.model.ts
* mkdir assets/db
* git checout -b server/init
* npm install --save express moment
* git checout -b features/rental-detail
* cd src/app/feature/rental
* ng g c rental-detail --module=rental
* git checkout -b feature/rental-detail-improvements
* npm install --save font-awesome
* ng g m shared
* git checkout -b feature/rental-map
* npm install @agm/core@1.0.0-beta.3 --save
* ng g c shared/map
* git checkout -b feature/rental-map-part2
* git checkout -b server/auth-server
* npm install bcrypt body-parser moment jsonwebtoken --save
* git checkout -b feature/client-auth
* ng g m features/auth
* ng g c features/auth/auth --flat
* ng g c features/auth/login
* ng g c features/auth/register
* ng g class features/auth/auth.routes (rename className AuthRoutes)
* ng g m features/auth/auth-routing --flat
* Now update your app.routes.ts and create your routes inside auth.routes
* Check if app.module import auth.module, if so, delete it
* Insert code in your auth-routing.module, delete CommonModule and import RouterModule from '@angular/router' and exports RouterModule, import AuthRoutes and use RouterModule.forChild(AuthRoutes)
* In AuthModule import AuthRoutingModule
* npm i --save jquery
* ng g s features/auth/shared/auth --flat --spec false
* ng g s shared/form/form --spec false
* npm install @auth0/angular-jwt --save
* npm i --save moment
* ng g m core/auth

# Branch history:

* core/header-component
* features/rental
* features/rental-detail
* server/init
* feature/rental-detail-improvements
* feature/rental-map
* feature/rental-map-part2
* server/auth-server
* feature/client-auth