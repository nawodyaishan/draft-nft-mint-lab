import React from 'react';
import './App.css';
import {Lab} from "./Lab/Lab";
import {useService} from "react-service-locator";
import {UiService} from "./services/ui-service";
import SweetAlert from "react-bootstrap-sweetalert";

function App() {

    const uiService = useService(UiService, provider => [provider.state.alerts]);

    function buildAlerts() {
        const currentAlert = uiService.getVisibleAlert();
        if (!currentAlert) return null;
        return <SweetAlert {...currentAlert}>{currentAlert.content}</SweetAlert>;
    }


    return (
        <div className="App">
            {buildAlerts()}
            <Lab/>
        </div>
    );
}

export default App;

