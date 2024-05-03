import React from 'react';

function LatestNewsAndUpdates() {
  return (
    <div className="w-100 m-0 p-0 pt-4">
      <div className="row w-100 m-0 p-0 pb-4">
        <div className="col-12 w-100 m-0 p-0">
          <div className="row w-100 m-0 p-0">
            <h3 className="text-xl font-medium text-light col-12">Latest news & updates</h3>
          </div>
          <div className="row w-100 m-0 p-0">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <iframe className="w-100" src="https://www.youtube.com/embed/NCPDYPiwIcs?si=EWXMIIWuVpUCMmoY" title="Photo Realism" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <iframe className="w-100" src="https://www.youtube.com/embed/18A2AQ_UPgY?si=3P2STKUPDboAH9UK" title="Texting & Communication" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <iframe className="w-100" src="https://www.youtube.com/embed/ojSopGAc6Oo?si=ww2n7aF7ERvW1zQH" title="Upload SDK Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <iframe className="w-100" src="https://www.youtube.com/embed/oz508NKBMSw?si=_KYPUWQEf0fC37hu" title="Purchasing Elements" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LatestNewsAndUpdates;
