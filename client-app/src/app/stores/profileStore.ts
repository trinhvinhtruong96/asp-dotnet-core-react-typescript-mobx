import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "./../models/profile";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            console.log(
                "🚀 ~ file: profileStore.ts ~ line 19 ~ ProfileStore ~ loadProfile= ~ profile",
                profile
            );
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            });
        } catch (error) {
            console.log(
                "🚀 ~ file: profileStore.ts ~ line 16 ~ ProfileStore ~ loadProfile= ~ error",
                error
            );
            runInAction(() => (this.loadingProfile = false));
        }
    };
}
