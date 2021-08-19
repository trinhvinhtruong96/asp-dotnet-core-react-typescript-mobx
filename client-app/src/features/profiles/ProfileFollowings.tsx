import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileCard from "./ProfileCard";

export interface Props {}

const ProfileFollowings: React.FC<Props> = () => {
    const { profileStore } = useStore();
    const { profile, followings, loadingFolowings, activeTab } = profileStore;

    return (
        <Tab.Pane loading={loadingFolowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated="left"
                        icon="user"
                        content={
                            activeTab === 3
                                ? `People following ${profile?.displayName}`
                                : `People ${profile?.displayName} is following `
                        }
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={4}>
                        {followings.map((profile) => (
                            <ProfileCard
                                key={profile.username}
                                profile={profile}
                            />
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfileFollowings);
