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
    chargesList: 'accounts/charges-list'
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
