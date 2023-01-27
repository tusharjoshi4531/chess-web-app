import { model, Schema } from "mongoose";
import { User } from "../global/types";

const UserSchema = new Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;
