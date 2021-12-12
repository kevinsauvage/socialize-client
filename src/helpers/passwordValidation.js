export const passwordValidation = (password) => {
  if (!password.match(/[a-z]/)) {
    alert(
      'Password must contain at least one lower case letter, one upper case letter, 8 characters and one number.',
    )
    return false
  }

  //Validating length
  if (password.length < 8) {
    alert(
      'Password must contain at least one lower case letter, one upper case letter, 8 characters and one number.',
    )
    return false
  }

  //check for upper ase
  if (!password.match(/[A-Z]/)) {
    alert(
      'Password must contain at least one lower case letter, one upper case letter, 8 characters and one number.',
    )
    return false
  }

  //check for number
  if (!password.match(/\d+/g)) {
    alert(
      'Password must contain at least one lower case letter, one upper case letter, 8 characters and one number.',
    )
    return false
  }

  return true
}
