import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";

export interface Props {
    profile: Profile;
}

const ProfilePhotos: React.FC<Props> = ({ profile }) => {
    return (
        <Tab.Pane>
            <Header icon="image" content="Photo" />
            <Card.Group itemsPerRow={5}>
                {profile.photos?.map((photo) => (
                    <Card key={photo.id}>
                        <Image src={photo.url || "/assets/user.png"} />
                    </Card>
                ))}
            </Card.Group>
        </Tab.Pane>
    );
};

export default observer(ProfilePhotos);
