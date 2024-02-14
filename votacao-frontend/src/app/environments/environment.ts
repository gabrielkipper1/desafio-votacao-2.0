export const environment = {
    production: false,
    host: 'http://localhost:3000',

    //auth
    signIn: '/signin',
    signUp: '/signup',
    validate: '/validate',

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