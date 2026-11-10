export const credentials = {
  standardUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOutUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  invalidUsername: 'invalid_user',
  invalidPassword: 'invalid_password',
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
};

export const customer = {
  firstName: 'Alex',
  lastName: 'Tester',
  postalCode: '10001',
};

export const errorMessages = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  requiredUsername: 'Epic sadface: Username is required',
  requiredPassword: 'Epic sadface: Password is required',
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  requiredFirstName: 'Error: First Name is required',
  requiredLastName: 'Error: Last Name is required',
  requiredPostalCode: 'Error: Postal Code is required',
};
