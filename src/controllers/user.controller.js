import User from "../models/user.model.js";
import * as bcrypt from "bcrypt-nodejs";
import { serializeErrors } from "../services/error.service.js";
import { createToken } from "../services/jws.service.js";

class UserController {
    saveUsuario = (req, res) => {
        const { FullName, Age, Email, Password } = req.body;
        const user = new User();
        user.FullName = FullName;
        user.Age = Age;
        user.Email = Email;
        bcrypt.hash(Password, null, null, async (err, hash) => {
            user.Password = hash;
            await user.save();
            return res.status(201).send({ message: 'Se resgistro el usuario' });
        });
    }

    login = async (req, res) => {
        const { Email, Password } = req.body;
        const user = await User.findOne({ Email });
        if (user == null) serializeErrors(res, 404, `El usuario no existe`);
        bcrypt.compare(Password, user.Password, async (err, check) => {
            if (check) {
                user.Password = undefined;
                const dataUser = { ...user.toJSON(), token: createToken(user.toJSON()) };
                return res.status(200).send({ user: dataUser });
            } else {
                serializeErrors(res, 404, `El usuario no existe`);
            }
        });
    }

    updateUsuario = async (req, res) => {
        const { FullName, Age } = req.body;
        const { id } = req.params;
        await User.findByIdAndUpdate(id, { FullName, Age });
        return res.status(200).send({ message: 'Se actualizo los datos' });
    }
}

export default UserController;