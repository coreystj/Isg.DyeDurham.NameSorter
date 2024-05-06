import React from 'react';

interface LoadingProps {
    hasLoading: boolean; // Expect a number between 0 and 1
}

const Loading: React.FC<LoadingProps> = ({ hasLoading }) => {
    return (
        <>
            {hasLoading && (
                <>
                    <div className="row m-4">
                    </div>
                    <div className="row m-4">
                        <div className="col">
                        </div>
                        <div className="col-auto">
                            <li className="spinner-border text-warning" role="status">
                                <span className="sr-only"></span>
                            </li>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                    <div className="row m-4">
                        <div className="col">
                        </div>
                        <div className="col-auto text-warning">
                            Loading...
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </>
            )}
        </>)
};
export default Loading;