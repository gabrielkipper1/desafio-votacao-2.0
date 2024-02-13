import { Routes } from '@angular/router';
import { TopicListScreenComponent } from './topic-list-screen/topic-list-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { TopicDetailScreenComponent } from './topic-detail-screen/topic-detail-screen.component';
import { CreateTopicFormComponent } from './create-topic-form/create-topic-form.component';
import { VoteScreenComponent } from './vote-screen/vote-screen.component';
import { SignupScreenComponent } from './signup-screen/signup-screen.component';
import { AppStartComponent } from './app-start/app-start.component';
import { authGuard } from './guards/auth-guard/auth.guard';
import { refreshTokenGuard } from './guards/refresh-token-guard/refresh-token.guard';

export const routes: Routes = [
    { path: '', component: AppStartComponent },
    { path: 'home', component: TopicListScreenComponent, canActivate: [refreshTokenGuard] },
    { path: 'login', component: LoginScreenComponent },
    { path: 'signup', component: SignupScreenComponent },
    { path: 'topic/:topicId', component: TopicDetailScreenComponent },
    { path: 'new-topic', component: CreateTopicFormComponent },
    { path: 'vote/:topicId', canActivate: [authGuard], component: VoteScreenComponent }
];
