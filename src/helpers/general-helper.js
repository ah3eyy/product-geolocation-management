import bcrypt from "bcrypt";

const generalHelper = {

    encryptValue: async (value) => {
        return bcrypt.hashSync(value, 10)
    },

    decryptValue: async (value, against_value) => {
        return bcrypt.compareSync(value, against_value);
    }

};


export default generalHelper;
