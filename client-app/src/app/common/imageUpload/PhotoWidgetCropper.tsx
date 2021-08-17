import React from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";

export interface Prop {
    setCropper: (cropper: Cropper) => void;
    imagePreview: string;
}

const PhotoWidgetCropper: React.FC<Prop> = ({ setCropper, imagePreview }) => {
    return (
        <Cropper
            src={imagePreview}
            preview=".img-preview"
            onInitialized={(cropper) => setCropper(cropper)}
            style={{ height: 200, width: "100%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
        />
    );
};

export default PhotoWidgetCropper;
