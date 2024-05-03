import BackgroundVideo from "./BackgroundVideo";
import Footer from "./Footer";
import LatestNewsAndUpdates from "./LatestNewsAndUpdates";
import NavigationBar from "./NavigationBar";

import React from 'react';

export default function Main() {
    const DownloadSDK = () => {
        const link = document.createElement('a');
        link.href = 'https://cobalt-api-develop.s3.us-east-2.amazonaws.com/sdks/CobaltSDK_v1.0.unitypackage';
        link.setAttribute('download', 'CobaltSDK_v1.0.unitypackage');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    
      const ViewKickstarter = () => {
        const url = "https://www.kickstarter.com/projects/coreystj/cobalt-metaverse";
        window.open(url, "_blank");
      }
    
      const ViewGitHub = () => {
        const url = "https://github.com/coreystj/cobaltsamples";
        window.open(url, "_blank");
      }
    
    return (
        <div className="w-100 text-dark overflow-auto">
        <NavigationBar />
        <div className="w-100">
          <BackgroundVideo />
          <LatestNewsAndUpdates />

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'bottom', background: "linear-gradient(to left, black, transparent), url('./assets/screenshots/Metaverse-community.jpeg')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col-auto">
                <h1 className="text-xl font-medium text-light text-outline text-align-right">We are on Kickstarter!</h1>
                <p className="text-light text-outline text-align-right  m-0 p-0">Every startup needs to start somewhere.</p>
                <p className="text-light text-outline text-align-right">Be part of this amazing opportunity and support us for some great prizes!</p>
                <button onClick={ViewKickstarter} className="btn btn-success float-right" style={{ float: 'right' }}><img className="m-1 p-0" width="16" src="https://cdn.icon-icons.com/icons2/2429/PNG/512/kickstarter_logo_icon_147271.png" />Come support us!</button>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', background: "linear-gradient(to right, black, transparent), url('./assets/screenshots/cobrascript.png')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col">
                <h1 className="text-xl font-medium text-light text-outline">CobraScript</h1>
                <p className="text-light text-outline m-0 p-0">Using our proprietary scripting tools, </p>
                <p className="text-light text-outline">the sky is the limit for Cobalt development!</p>
                <button onClick={ViewGitHub} className="btn btn-warning m-2"><img className="m-1 p-0" width="16" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />View GitHub</button>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'bottom', background: "linear-gradient(to left, black, transparent), url('./assets/screenshots/cuistomizable-content.webp')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col-auto">
                <h1 className="text-xl font-medium text-light text-outline text-align-right">Customizable Content</h1>
                <p className="text-light text-outline text-align-right">Build your very own Worlds, Avatars & Items!</p>
                <button onClick={DownloadSDK} className="btn btn-warning float-right" style={{ float: 'right' }}><img className="m-1 p-0" width="16" src="https://cdn.worldvectorlogo.com/logos/unity-69.svg" />Download Unity SDK</button>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'center', background: "linear-gradient(to right, black, transparent), url('./assets/screenshots/cross-platform.webp')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col">
                <h1 className="text-xl font-medium text-light text-outline">Cross-Platform</h1>
                <p className="text-light m-0 p-0 text-outline">Cobalt is a cross platform metaverse!</p>
                <p className="text-light text-outline">Not just limited to VR, but for mobile, web, and desktop.</p>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', backgroundPosition: 'center', background: "linear-gradient(to left, black, transparent), url('./assets/screenshots/eco-friendly.webp')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col-auto">
                <h1 className="text-xl font-medium text-light text-outline text-align-right">Environmentally Friendly</h1>
                <p className="text-light m-0 p-0 text-outline text-align-right">Our servers run on the latest serverless technology.</p>
                <p className="text-light text-outline text-align-right">Thus making it the most eco friendly metaverse known to date!</p>
              </div>
            </div>
          </div>

          <div className="bg-white w-100 pb-4 pt-2" style={{ backgroundSize: 'cover', background: "linear-gradient(to right, black, transparent), url('./assets/screenshots/cobalt-mining.jpg')" }}>
            <div className="row justify-content-end pt-4 m-4">
              <div className="col">
                <h1 className="text-xl font-medium text-light text-outline">Why Cobalt?</h1>
                <p className="text-light m-0 p-0 text-outline">We strive to make the world a better place.</p>
                <p className="text-light text-outline">Bringing you awareness to the Cobalt mining labor crisis.</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
  