import React, { useState, useEffect, useRef } from 'react';

const CameraComponent = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [error, setError] = useState(null);
    const videoRef = useRef(null);

    const getCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            setHasCameraPermission(true);
        } catch (err) {
            console.error("Error accessing camera: ", err);
            setError(err.message);
            console.log(err)
            setHasCameraPermission(false);
        }
    };

    useEffect(() => {
        getCameraPermission();
    }, []);

    return (
        <div>
            {hasCameraPermission ? (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: 'auto' }}
                />
            ) : (
                <p>{error ? `Error: ${error}` : "Camera access denied or not available"}</p>
            )}
        </div>
    );
};

export default CameraComponent;
