import {SweetAlertProps, SweetAlertRenderProps} from "react-bootstrap-sweetalert/dist/types";
import React, {ReactElement} from "react";

export interface AlertSpec extends SweetAlertProps {
    id?: string;
    content?: ReactElement | ((renderProps: SweetAlertRenderProps) => ReactElement);
}

export interface AlertRenderProps<T> {
    /**
     * Invoke this function to trigger the 'confirm' action.
     */
    confirm: (result: T) => any;
    /**
     * Invoke this function to trigger the 'cancel' action.
     */
    cancel: () => any;
    /**
     * Attach this to a keydown enter on an input element to trigger the 'confirm' action when the enter key ispressed.
     *
     * onKeyDown={this.onKeyDown}
     *
     * @param event
     */
    onEnterKeyDownConfirm: (event: React.KeyboardEvent) => any;
    /**
     * Use this to assign a ref to the input element you would like to focus when the alert is initially rendered.
     *
     * ref={setAutoFocusInputRef}
     *
     * @param element
     */
    setAutoFocusInputRef: (element: HTMLInputElement | HTMLTextAreaElement) => void;
}
