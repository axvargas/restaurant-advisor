import * as firebase from 'firebase';

export const reauthenticate = async (password) => {
    try {
        const user = firebase.auth().currentUser;
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);
        return await user.reauthenticateWithCredential(credentials);
    } catch (error) {
        switch (error.code) {
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
            case 'auth/invalid-credential':
                return {
                    error: true,
                    message: "The password is not correct"
                };
            case 'auth/wrong-password':
                return {
                    error: true,
                    message: "Too many attempts, try it again later"
                };
            default:
                return {
                    error: true,
                    message: error.message
                };
        }

    }
}