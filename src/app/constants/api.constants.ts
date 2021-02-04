export const ApiConstants = {
  accounts: {
    register: 'auth/register',
    authenticate: 'auth/login',
    verifyEmail: 'email/verify-email',
    verifyToken: 'auth/verify-token',
    isEmailAvailable: 'email/is-available',
    updateProfile: 'accounts',
    changePassword: 'auth/change-password',
    upload: 'accounts/upload',
    uploadProjectImage: 'accounts/upload-project-image',
    uploadCertificate: 'accounts/upload-certificate',
    deleteCertificate: 'accounts/delete-certificate',
    paymentMethod: 'accounts/payment-method',
    paymentMethods: 'accounts/payment-methods',
    searchDevelopers: 'accounts/search',
    getDeveloperById: 'accounts/get-developer',
    chargesList: 'accounts/charges-list',
    verifyBank: 'accounts/verify-bank',
    verifyStripe: 'accounts/verify-stripe',
    payout: 'accounts/payout',
    paymentIntent: 'accounts/payment-intent',
    activeProjects: 'accounts/active-projects'
  },
  jobs: {
    main: 'jobs',
    search: 'jobs/search',
    delete: 'jobs'
  },
  developers: {
    main: 'developers',
    search: 'developers/search'
  },
  chat: {
    createConversation: 'chat/conversations', // POST
    getConversationsByMemberId: 'chat/conversations/members', // GET
    getMessagesByConversationId: 'chat/messages', // GET
    updateChatMember: 'chat/members' // PATCH
  }
};
