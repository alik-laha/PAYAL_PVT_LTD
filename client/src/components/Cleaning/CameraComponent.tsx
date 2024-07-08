import { useRef, useState } from 'react';

const CameraComponent = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: 'environment' } })   //for back camera     { video: { facingMode: { exact: "environment" } } }
            .then(stream => {
                const video: any = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error('Error accessing the camera: ', err);
            });
    };

    const takePhoto = () => {
        const width = 300;
        const height = 300;

        const video = videoRef.current;
        const photo: any = photoRef.current;

        photo.width = width;
        photo.height = height;

        const ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    };

    const savePhoto = () => {
        const photo: any = photoRef.current;
        photo.toBlob((blob: Blob) => {
            const formData = new FormData();
            formData.append('photo', blob, 'photo.png');


        });
    };

    const closePhoto = () => {
        const photo: any = photoRef.current;
        const ctx = photo.getContext('2d');
        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    };

    return (
        <div className="camera">
            <video ref={videoRef} style={{ width: "300px", height: "300px" }}></video>
            <button onClick={getVideo}>Open Camera</button>
            <button onClick={takePhoto}>Take Photo</button>
            {hasPhoto && (
                <>
                    <button onClick={savePhoto}>Save Photo</button>
                    <button onClick={closePhoto}>Close Photo</button>
                </>
            )}
            <canvas ref={photoRef}></canvas>
        </div>
    );
};

export default CameraComponent;
