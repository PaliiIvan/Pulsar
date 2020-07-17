import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ChannelPageComponent } from './pages/channel-page/channel-page.component';

const routes: Routes = [
    { path: 'home/:msg', component: HomePageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: 'channel/:name', component: ChannelPageComponent },
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
