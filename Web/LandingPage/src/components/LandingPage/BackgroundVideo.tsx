import React, { useEffect, useState } from 'react';
import { GateKeeperUtils } from '../../utils/GateKeeperUtils';
import { ApiUtils } from '../../utils/ApiUtils';
import { GateKeeper } from '../../apis/Cnt.GateKeeper.SDK';

function BackgroundVideo() {

    const [totalUsers, setTotalUsers] = useState<number>(0);

    useEffect(()=>{
        ApiUtils.GetGateKeeperApi().User.ReadCount((userCount: number)=>{
            setTotalUsers(userCount);
        }, 
        (exception : GateKeeper.Exception)=>{
            console.error(exception.Message);
        });
    }, [totalUsers]);

    const videoStyle: React.CSSProperties = {
        position: 'fixed',
        right: 0,
        bottom: 0,
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        zIndex: -1,
        overflow: 'hidden',
    };

    const contentStyle: React.CSSProperties = {
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        color: 'white', // Assuming a darker video, white text will stand out more
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    };


    const DownloadClient = () => {
        const link = document.createElement('a');
        link.href = 'https://namesorter-develop.s3.us-east-2.amazonaws.com/Builds/name-sorter.zip';
        link.setAttribute('download', 'name-sorter.zip'); // Optional, specifies the filename that user will download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="m-4">
            <div className="bg-dark" style={videoStyle}>
                <video playsInline autoPlay muted loop style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <source src="/assets/videos/background-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.65)' }}></div>
            </div>
            <div style={contentStyle} className="mt-4">


                <div className="m-4" />
                <div className="m-4" />
                <img className="mb-2" src="./assets/images/Cobalt metaverse dark.png" height="70" width="205" />
                <p className="text-outline m-0 p-0">Bringing you the most well known Name Sorter library known to cyber space.</p>
                <p className="text-outline">Uniting all names in an order that just simply makes sense.</p>
                <p className="text-outline">Try the <span className="text-warning">BETA</span> command line tool now for free on <span className="text-warning">windows</span>.</p>
                <div className="row">
                    <div className="btn-group col-auto mt-2" role="group" aria-label="Download Buttons">
                        <button onClick={DownloadClient} className="btn btn-primary">
                            <img width="16" className="m-1 p-0" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Windows_icon_logo.png" />Download our CLI for Free
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BackgroundVideo;
