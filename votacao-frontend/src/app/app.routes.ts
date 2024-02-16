import { Routes } from '@angular/router';
import { TopicListScreenComponent } from './screens/home-screen/topic-list-screen.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { TopicDetailScreenComponent } from './screens/topic-detail-screen/topic-detail-screen.component';
import { CreateTopicFormComponent } from './screens/create-topic-form/create-topic-form.component';
import { VoteScreenComponent } from './screens/vote-screen/vote-screen.component';
import { AppStartComponent } from './app-start/app-start.component';
import { authGuard } from './guards/auth-guard/auth.guard';
import { refreshTokenGuard } from './guards/refresh-token-guard/refresh-token.guard';
import { SignupScreenComponent } from './screens/signup-screen/signup-screen.component';
import { adminGuard } from './guards/admin-guard/admin.guard';
import { UsersScreenComponent } from './screens/users-screen/users-screen.component';

export const routes: Routes = [
    { path: '', component: AppStartComponent },
    { path: 'home', component: TopicListScreenComponent, canActivate: [refreshTokenGuard], runGuardsAndResolvers: 'always' },
    { path: 'login', component: LoginScreenComponent },
    { path: 'signup', component: SignupScreenComponent },
    { path: 'topic/:topicId', component: TopicDetailScreenComponent },
    { path: 'new-topic', component: CreateTopicFormComponent, canActivate: [adminGuard] },
    { path: 'vote/:topicId', canActivate: [authGuard], component: VoteScreenComponent },
    { path: 'users', component: UsersScreenComponent, canActivate: [adminGuard] }
];
