import React, { useRef, useState, useImperativeHandle } from 'react';
import { MdCamera } from "react-icons/md";

const CameraComponentClean = React.forwardRef(({ onSave }: { onSave: any }, ref: React.Ref<any>) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [videoView, setVideoView] = useState("");
    const [photoView, setPhotoView] = useState("hidden");
    const successdialog = document.getElementById('Photodailog') as HTMLInputElement;

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                const video = videoRef.current;
                console.log(video)
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
        getVIdeo: () => getVideo()
    }));

    const takePhoto = () => {
        if (!videoRef.current || !photoRef.current) {
            console.log(videoRef.current, photoRef.current)
            return
        }

        const width = 300;
        const height = 300;

        const video = videoRef.current;
        const photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        const ctx = photo.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, width, height);

            setHasPhoto(true);
            setVideoView("hidden")
            setPhotoView("block")
            stopVideo();
        }

    };


    const closePhoto = (): void => {
        getVideo();
        setVideoView("")
        setPhotoView("hidden")
        if (!photoRef.current) return;
        const ctx = photoRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, photoRef.current.width, photoRef.current.height);
            setHasPhoto(false);

        }
    };
    const closeAftersave = (): void => {
        setVideoView("")
        setPhotoView("hidden")
        if (!photoRef.current) return;
        const ctx = photoRef.current.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, photoRef.current.width, photoRef.current.height);
            setHasPhoto(false);

        }
    };
    const savePhoto = () => {
        if (!photoRef.current) return;
        onSave(photoRef.current);
        (successdialog as any).close();
        closeAftersave()
    };

    const stopVideo = () => {
        const video = videoRef.current;
        if (video) {
            const stream = video.srcObject as MediaStream;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                video.srcObject = null;
            }
        }
    };

    return (
        <div>
            <div className={videoView}>
                <video ref={videoRef} style={{ width: "70vw", height: "70vh" }}></video>
                <div className='text-center mt-3'><button onClick={takePhoto} ><MdCamera className='w-10 h-10' /></button></div>
            </div>
            <div className={photoView}>
                {
                    hasPhoto && (

                        <div className='text-center mt-3'>
                            <button onClick={savePhoto} className='bg-green-500 text-white px-3 py-1 rounded-md'>Save Photo</button>
                            <button onClick={closePhoto} className='bg-red-500 text-white px-3 py-1 rounded-md'>Close Photo</button>
                        </div>
                    )
                }
                <canvas ref={photoRef} style={{ width: "70vw", height: "70vh" }}></canvas>
            </div>

        </div>
    );
});

export default CameraComponentClean;
