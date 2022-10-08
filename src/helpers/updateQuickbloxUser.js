import QB from 'quickblox-react-native-sdk';

export const updateQbUser = (firstName, lastName, qbLogin) => {
  console.log('update qb function', firstName, lastName);

  QB.users
    .update({
      fullName: `${firstName} ${lastName}`,
      login: qbLogin,
    })
    .then(function (updatedUser) {
      console.log(
        'quickblox user updated successfully',
        JSON.stringify(updatedUser, null, 2),
      );
      // update local user with updated one
    })
    .catch(function (e) {
      console.log('couldnot update quickblox user', e);

      // handle error
    });
};
