import React, { useRef, useState, useImperativeHandle } from 'react';

const CameraComponent = React.forwardRef(({ onSave }: { onSave: any }, ref: React.Ref<any>) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                const video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.play();
                }
            })
            .catch(err => {
                console.error('Error accessing the camera: ', err);
            });
    };

    useImperativeHandle(ref, () => ({
        getVideo: () => getVideo()
    }));

    const takePhoto = () => {
        if (!videoRef.current || !photoRef.current) return;

        const width = 300;
        const height = 300;

        const video = videoRef.current;
        const photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        const ctx = photo.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, width, height);
        }
        setHasPhoto(true);
    };

    const savePhoto = () => {
        if (!photoRef.current) return;
        onSave(photoRef.current);
    };

    const closePhoto = () => {
        if (!photoRef.current) return;
        const ctx = photoRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, photoRef.current.width, photoRef.current.height);
            setHasPhoto(false);
        }
    };

    return (
        <div className="flex">
            <video ref={videoRef} style={{ width: "300px", height: "300px" }}></video>
            <button onClick={takePhoto}>Take Photo</button>
            {hasPhoto && (
                <>
                    <button onClick={savePhoto}>Save Photo</button>
                    <button onClick={closePhoto}>Close Photo</button>
                </>
            )}
            <canvas ref={photoRef} style={{ display: "none" }}></canvas>
        </div>
    );
});

export default CameraComponent;
