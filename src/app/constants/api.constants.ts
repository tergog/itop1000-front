export const ApiConstants = {
  accounts: {
    register: 'accounts/register',
    authenticate: 'accounts/authenticate',
    verifyEmail: 'accounts/verify-email',
    verifyToken: 'accounts/verify-token',
    isEmailAvailable: 'accounts/is-email-available',
    updateProfile: 'accounts/update-profile',
    changePassword: 'accounts/change-password',
    upload: 'accounts/upload',
    uploadProjectImage: 'accounts/upload-project-image',
    paymentMethod: 'accounts/payment-method',
    paymentMethods: 'accounts/payment-methods',
    searchDevelopers: 'accounts/search',
    getDeveloperById: 'accounts/get-developer',
    chargesList: 'accounts/charges-list',
    activeProjects: 'accounts/active-projects',
    developerCategories: 'accounts/data/categories',
    developerSkills: 'accounts/data/skills',
    developerLanguages: 'accounts/data/languages',
    developerSoftSkills: 'accounts/data/soft-skills',
    verifyBank: 'accounts/verify-bank',
    verifyStripe: 'accounts/verify-stripe',
    payout: 'accounts/payout',
    paymentIntent: 'accounts/payment-intent',
    // activeProjects: 'accounts/active-projects'
  },
  jobs: {
    main: 'jobs',
    search: 'jobs/search',
    delete: 'jobs'
  },
  developers: {
    main: 'developers',
    search: 'developers/search'
  }
};
