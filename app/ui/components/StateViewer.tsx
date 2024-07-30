import { RootState } from '@/lib/store';
import React from 'react';
import { useSelector } from 'react-redux';

const StateViewer = () => {
    const formState = useSelector((state: RootState) => state.form);

    return (
        <pre>{JSON.stringify(formState, null, 2)}</pre>
    );
};

export default StateViewer;
