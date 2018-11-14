import defaultAvatarImg from 'assets/default-avatar.jpg';
import passwordStrength from './passwordStrength';

const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");
const mediumPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

export const hasFullname = (user) => {
  return user.firstName && user.lastName;
};

export const getUserDisplay = (user) => {
  if (!user) {
    return 'No name to display';
  }

  if (hasFullname(user)) {
    return `${user.firstName} ${user.lastName}`;
  }

  return user.username;
}

export const getAvatarImage = (user) => {
  if (!user) {
    return defaultAvatarImg;
  }

  return user.avatarUrl || defaultAvatarImg;
};

export const getPasswordStrength = (password) => {
  if (!password) {
    return passwordStrength.clean;
  }

  if (strongPassword.test(password)) {
    return passwordStrength.strong;
  } else if (mediumPassword.test(password)) {
    return passwordStrength.medium;
  } else {
    return passwordStrength.weak;
  }
}