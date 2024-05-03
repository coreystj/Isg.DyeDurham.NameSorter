import React from 'react';

// Define a generic props interface that includes the enum data
interface DropDownProps<T> {
    color: string;
    buttonOverride: string;
    selectedType: T;
    enumData: { [key: string]: T };
    onSelectionChanged: (value: T) => void;
    formatLabel?: (label: string) => string; // Optional prop to format labels
    children?: React.ReactNode;  // Add children prop
}

const DropDown = <T extends string | number>({ color, buttonOverride, selectedType, enumData, onSelectionChanged, formatLabel, children }: DropDownProps<T>) => {
    // Function to handle item click
    const handleItemClick = (value: T) => {
        onSelectionChanged(value);
    };

    // Function to format labels (if provided)
    const formatEnumLabel = (label: string): string => {
        return formatLabel ? formatLabel(label) : label.replace(/([A-Z])/g, ' $1').trim();
    };

    return (
        <div className="dropdown">
            <button className={`btn btn-${color} dropdown-toggle`} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                
                {children}
                <>
                    {buttonOverride == "" ? (
                        <>{formatEnumLabel(Object.keys(enumData).find(key => enumData[key] === selectedType) ?? "")}</>
                    ) : (
                        <>{buttonOverride}</>
                    )}
                </>


            </button>
            <ul className="bg-dark dropdown-menu m-0 p-0 rounded" aria-labelledby="dropdownMenuButton">
                <div className="d-grid rounded">
                    {Object.keys(enumData)
                        .filter(key => isNaN(Number(key))) // Ensure that only string keys are used
                        .map(key => (
                            <button key={key}
                                className="dropdown-item  bg-dark text-light"
                                onClick={() => handleItemClick(enumData[key])}>
                                {formatEnumLabel(key)}
                            </button>
                        ))}
                </div>
            </ul>
        </div>
    );
};

export default DropDown;
