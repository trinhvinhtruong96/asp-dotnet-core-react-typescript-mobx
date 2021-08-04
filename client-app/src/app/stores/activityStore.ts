import { Activity } from './../models/activity';
import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';

class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                });

                this.setLoadingInitial(false);
            })

        } catch (error) {
            console.log("🚀 ~ file: activityStore.ts ~ line 20 ~ ActivityStore ~ loadActivities= ~ error", error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })
        }
    }

    loadActivity = async (id: string): Promise<Activity | undefined> => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    this.setActivity(activity!);
                    this.selectedActivity = activity;
                    this.setLoadingInitial(false);
                })
                return activity;
            } catch (error) {
                runInAction(() => {
                    console.log("🚀 ~ file: activityStore.ts ~ line 52 ~ ActivityStore ~ loadActivity= ~ error", error)
                    this.setLoadingInitial(false);
                })
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
                // this.loadActivities();
            })
        } catch (error) {
            console.log("🚀 ~ file: activityStore.ts ~ line 64 ~ ActivityStore ~ createActivity= ~ error", error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
                // this.loadActivities();
            })
        } catch (error) {
            console.log("🚀 ~ file: activityStore.ts ~ line 64 ~ ActivityStore ~ createActivity= ~ error", error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log("🚀 ~ file: activityStore.ts ~ line 102 ~ ActivityStore ~ deleteActivity ~ error", error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}

export default ActivityStore;