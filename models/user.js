const bcrypt = require('bcrypt');
const admin = require('firebase-admin');

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static async findByUsername(username) {
        const snapshot = await admin.firestore().collection('users').where('username', '==', username).get();
        if (snapshot.empty) {
            return null;
        } else {
            const doc = snapshot.docs[0];
            return new User(doc.data().username, doc.data().password);
        }
    }

    async save() {
        const hash = await bcrypt.hash(this.password, 10);
        await admin.firestore().collection('users').add({
            username: this.username,
            password: hash,
        });
    }
}

module.exports = User;
