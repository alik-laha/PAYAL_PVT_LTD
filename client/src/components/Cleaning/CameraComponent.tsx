import { useState, useEffect, useRef } from 'react';

const CameraComponent = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const getCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setHasCameraPermission(true);
        } catch (error) {
            console.error("Error accessing camera: ", error);
            setHasCameraPermission(false);
        }
    };

    useEffect(() => {
        getCameraPermission();
    }, []);

    return (
        <div>
            {hasCameraPermission ? (
                <video ref={videoRef} autoPlay />
            ) : (
                <p>Camera access denied or not available</p>
            )}
        </div>
    );
};

export default CameraComponent;