export const ApiConstants = {
  accounts: 'accounts',
  accountsSearch: 'accounts/search',
  projectApplications: 'accounts/project-applications',
  accountsQueue: 'accounts/users-queue',
  jobs: 'jobs',
  projects: 'projects',
  logo: 'projects/logo',
  jobsSearch: 'jobs/search',
  jobsApply: 'jobs/apply-dev',
  verifyEmail: 'email/verify-email',
  upload: 'accounts/upload',
  uploadProjectImage: 'accounts/upload-project-image',
  uploadCertificate: 'accounts/upload-certificate',
  deleteCertificate: 'accounts/delete-certificate',
  paymentMethod: 'accounts/payment-method',
  paymentMethods: 'accounts/payment-methods',
  getDeveloperById: 'accounts/get-developer',
  chargesList: 'accounts/charges-list',
  verifyBank: 'accounts/verify-bank',
  verifyStripe: 'accounts/verify-stripe',
  payout: 'accounts/payout',
  paymentIntent: 'accounts/payment-intent',
  activeProjects: 'accounts/active-projects',
  email: {
    verify: 'email/verify?',
    isAvailable: 'email/is-available'
  },
  auth: {
    login: 'auth/login',
    resetPassword: 'auth/reset-password',
    register: 'auth/register',
    changePassword: 'auth/change-password',
    forgotPassword: 'auth/forgot-password',
    verifyToken: 'auth/verify-token'
  },
  payments: {
    payments: 'payments',
    intent: 'payments/intent',
    payout: 'payments/payout',
    bankAccount: 'payments/bank-account',
    accountLink: 'payments/account-link',
    charges: 'payments/charges'
  },
  data: {
    developerCategories: 'data/categories',
    developerSkills: 'data/skills',
    developerLanguages: 'data/languages',
    developerSoftSkills: 'data/soft-skills'
  },
  // chat: {
  //   conversations: 'chat/conversations',
  //   conversationsMembers: 'chat/conversations/members',
  //   conversationsSearch: 'chat/conversations/search',
  //   messages: 'chat/messages',
  //   updateChatMember: 'chat/members'
  // },
  // jobs: {
  //   main: 'jobs',
  //   search: 'jobs/search',
  //   delete: 'jobs'
  // },
  developers: {
    main: 'developers',
    search: 'developers/search'
  },
  // },
  chat: {
    createConversation: 'chat/conversations', // POST
    getConversationsByMemberId: 'chat/conversations/members', // GET
    getMessagesByConversationId: 'chat/messages', // GET
    updateChatMember: 'chat/members' // PATCH
  }
}
