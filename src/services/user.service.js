import User from "../models/user.model.js";

class UserService {
    getUser = async (option) => {
        const user = await User.findOne({ Email: option });
        return user;
    }
}

export default UserService;