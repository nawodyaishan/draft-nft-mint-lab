import {Service, StatefulService} from 'react-service-locator';
import _ from "lodash";
import {AlertRenderProps, AlertSpec} from "../definitions/alert-spec";
import {ReactElement} from "react";

export interface IUiServiceState {
    alerts: AlertSpec[];
}

@Service()
export class UiService extends StatefulService<IUiServiceState> {
    static readonly initialState: IUiServiceState = {
        alerts: [],
    };

    constructor() {
        super(UiService.initialState);
    }

    public addRawAlert(alert: AlertSpec) {
        if (!alert.id) alert.id = `ALERT_${Date.now()}`;
        this.setState({
            alerts: [
                ...this.state.alerts as AlertSpec[],
                alert,
            ],
        });
    }

    public async addMessageAlert(options: {
        title: string,
        subtitle?: string,
    }) {
        await new Promise<void>(resolve => {
            this.addRawAlert({
                title: options.title,
                content: (<>{options.subtitle}</>),
                onConfirm: () => {
                    resolve();
                    this.removeTopAlert();
                },
                onCancel: () => {
                    resolve();
                    this.removeTopAlert();
                },
            });
        })
    }

    public async addConfirmationAlert(options: {
        message: string,
        title?: string,
        cancelBtnText?: string,
        confirmBtnText?: string,
    }): Promise<boolean> {
        return new Promise<boolean>(((resolve) => {
            this.addRawAlert({
                title: options.title ?? 'Confirmation',
                content: (<>{options.message}</>),
                showConfirm: true,
                showCancel: true,
                cancelBtnText: options.cancelBtnText ?? 'No',
                confirmBtnText: options.confirmBtnText ?? 'Yes',
                onConfirm: () => {
                    resolve(true);
                    this.removeTopAlert();
                },
                onCancel: () => {
                    resolve(false);
                    this.removeTopAlert();
                },
            });
        }))
    }

    public async addSingleInputAlert(options: {
        message?: string,
        title: string,
        cancelBtnText?: string,
        confirmBtnText?: string,
        inputType?: string,
        required?: boolean,
        validationRegex?: RegExp,
        defaultValue?: string,
    }): Promise<string | null> {
        return new Promise<string | null>(((resolve) => {
            this.addRawAlert({
                title: options.title,
                content: (<>{options.message}</>),
                input: true,
                required: options.required,
                inputType: options.inputType,
                validationRegex: options.validationRegex,
                defaultValue: options.defaultValue,
                showConfirm: true,
                showCancel: true,
                cancelBtnText: options.cancelBtnText ?? 'No',
                confirmBtnText: options.confirmBtnText ?? 'Yes',
                onConfirm: (data) => {
                    resolve(data);
                    this.removeTopAlert();
                },
                onCancel: () => {
                    resolve(null);
                    this.removeTopAlert();
                },
            });
        }))
    }

    public async addCustomAlert<T>(options: {
        title: string,
        closeOnClickOutside?: boolean,
        builder: (props: AlertRenderProps<T>) => ReactElement
    }): Promise<T | null> {
        return new Promise<T | null>(((resolve) => {
            this.addRawAlert({
                title: options.title,
                type: "controlled",
                custom: true,
                showCancel: false,
                showConfirm: false,
                closeOnClickOutside: options.closeOnClickOutside,
                content: (props) => options.builder({
                    cancel: () => {
                        props.cancel();
                    },
                    confirm: (result: T) => {
                        props.confirm();
                        resolve(result);
                    },
                    onEnterKeyDownConfirm: props.onEnterKeyDownConfirm,
                    setAutoFocusInputRef: props.setAutoFocusInputRef,
                }),
                onConfirm: () => {
                    this.removeTopAlert();
                },
                onCancel: () => {
                    this.removeTopAlert();
                    resolve(null);
                },
            });
        }))
    }

    public removeAlertById(alertId: any) {
        if (!alertId) return;
        this.setState({
            alerts: _.filter(this.state.alerts as AlertSpec[], (alert: any) => alert.id !== alertId)
        });
    }

    public removeTopAlert() {
        this.removeAlertById(this.getVisibleAlert()?.id)
    }

    public getVisibleAlert(): AlertSpec | null {
        return _.first(this.state.alerts as AlertSpec[]) ?? null;
    }
}