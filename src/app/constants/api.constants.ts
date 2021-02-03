export const ApiConstants = {
  accounts: {
    register: 'auth/register',
    authenticate: 'auth/login',
    verifyEmail: 'email/verify',
    verifyToken: 'auth/verify-token',
    isEmailAvailable: 'email/is-available',
    updateProfile: 'accounts',
    changePassword: 'accounts/change-password',
    upload: 'accounts/upload',
    uploadProjectImage: 'accounts/upload-project-image',
    uploadCertificate: 'accounts/upload-certificate',
    deleteCertificate: 'accounts/delete-certificate',
    paymentMethod: 'accounts/payment-method',
    paymentMethods: 'accounts/payment-methods',
    searchDevelopers: 'accounts/search',
    getDeveloperById: 'accounts/get-developer',
    chargesList: 'accounts/charges-list',
    activeProjects: 'accounts/active-projects',
    verifyBank: 'accounts/verify-bank',
    verifyStripe: 'accounts/verify-stripe',
    payout: 'accounts/payout',
    paymentIntent: 'accounts/payment-intent'
  },
  data: {
    developerCategories: 'data/categories',
    developerSkills: 'data/skills',
    developerLanguages: 'data/languages',
    developerSoftSkills: 'data/soft-skills'
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
