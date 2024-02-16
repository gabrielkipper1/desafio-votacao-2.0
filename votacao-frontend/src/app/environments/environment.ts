export const environment = {
    production: false,
    host: 'http://localhost:3000/api/v1',

    //auth
    signIn: '/signin',
    signUp: '/signup',
    validate: '/validate',
    admin: '/admin',

    //user
    user: '/user',
    user_role: '/admin',

    //session
    session: (topicId: number) => `/topic/${topicId}/session`,

    //topic
    topic: '/topic',
    topicById: (id: number) => `/topic/${id}`,
    topicByIdWithSession: (id: number) => `/topic/${id}/session`,

    //vote
    vote: '/vote',
    votesByTopic: (id: number) => `/vote/topic/${id}`
}