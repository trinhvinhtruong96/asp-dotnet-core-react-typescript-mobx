import { history } from "./../../index";
import { store } from "./store";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValue } from "./../models/user";
export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggin() {
        return !!this.user;
    }

    login = async (creds: UserFormValue) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            });
            history.push("/activities");
            store.modalStore.closeModel();
        } catch (error) {
            throw error;
        }
    };

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem("jwt");
        this.user = null;
        history.push("/");
    };

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => (this.user = user));
        } catch (error) {
            console.log(
                "🚀 ~ file: userStore.ts ~ line 41 ~ UserStore ~ getUser= ~ error",
                error
            );
        }
    };

    register = async (creds: UserFormValue) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            });
            history.push("/activities");
            store.modalStore.closeModel();
        } catch (error) {
            throw error;
        }
    };

    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    };
}
